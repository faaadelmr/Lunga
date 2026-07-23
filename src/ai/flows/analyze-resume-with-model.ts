'use server';
/**
 * @fileOverview Universal Resume Analyzer supports Groq Cloud, Cerebras Cloud, OpenRouter (Free Tier), and Gemini AI.
 */

import { groq, type AiModel } from '@/ai/groq';
import { ai, getGeminiModel } from '@/ai/genkit';
import { parsePdfToText } from '@/lib/pdf-parser';
import { parseImageToText } from '@/lib/ocr-parser';
import { z } from 'zod';

interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  description?: string;
}

interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  date: string;
  description?: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface AnalyzeResumeOutput {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects?: Project[];
  skills: string;
}

interface AnalyzeResumeInput {
  photoDataUri: string;
  model: AiModel;
}

const PersonalInfoSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  role: z.string().describe('The job title or role of the person.'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  location: z.string().describe('The city and state or country.'),
  website: z.string().describe('The personal website or portfolio URL.').optional(),
  description: z.string().describe("A professional summary or objective statement.").optional(),
});

const ExperienceSchema = z.object({
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job title or role.'),
  date: z.string().describe('Employment dates.'),
  description: z.string().describe('Responsibilities and achievements.'),
});

const EducationSchema = z.object({
  institution: z.string().describe('Educational institution name.'),
  degree: z.string().describe('Degree or certification obtained.'),
  date: z.string().describe('Education dates.'),
  description: z.string().describe('Additional details.').optional(),
});

const ProjectSchema = z.object({
  name: z.string().describe('Project name.'),
  description: z.string().describe('Brief description.'),
  technologies: z.string().describe('Comma-separated list of technologies.'),
  link: z.string().describe('URL link.').optional(),
});

const AnalyzeResumeOutputSchema = z.object({
  personal: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema).optional(),
  skills: z.string().describe('Comma-separated list of skills.'),
});

export async function analyzeResumeWithModel(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  const { photoDataUri, model } = input;
  const selectedModel = model || 'cerebras/gemma-4-31b';

  // Step 1: Text extraction via Sharp + Tesseract / pdf-to-img OCR
  const isPdf = photoDataUri.startsWith('data:application/pdf');
  let extractedText = '';

  if (isPdf) {
    extractedText = await parsePdfToText(photoDataUri);
    console.log('\n================================================================');
    console.log('⚡ [KONVERSI PDF KE TEKS SUKSES]');
    console.log(`PDF berhasil dikonversi ke teks! Panjang: ${extractedText.length} karakter.`);
    console.log('================================================================\n');
  } else if (photoDataUri.startsWith('data:image/')) {
    console.log('🔍 Running Sharp + Tesseract OCR on uploaded image...');
    extractedText = await parseImageToText(photoDataUri);
    console.log('\n================================================================');
    console.log('⚡ [KONVERSI GAMBAR VIA OCR KE TEKS SUKSES]');
    console.log(`Gambar CV berhasil di-OCR ke teks! Panjang: ${extractedText.length} karakter.`);
    console.log('================================================================\n');
  } else {
    throw new Error('Format berkas tidak dikenali. Wajib berupa PDF atau Gambar (PNG/JPG/WEBP/BMP/PNM).');
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error('Gagal mengonversi berkas ke teks. Berkas mungkin kosong atau gambar tidak terbaca.');
  }

  // ponytail: Ultra-concise high-impact prompt for AI resume parsing (saves tokens, avoids confusion)
  const jsonPrompt = `Analyze and parse the resume text into the JSON schema below.

RULES:
1. READ WHOLE TEXT & SEMANTIC CLASSIFICATION: Read the ENTIRE document text first to understand context before categorizing. Analyze whether a sentence/paragraph is a candidate's personal summary (merge into "personal.description"), a job achievement, or an education detail.
2. NO SUMMARIZATION / NO TRUNCATION: DO NOT summarize, shorten, omit, or rewrite any user text. The goal is to transfer the FULL original content of the user's CV into the new template structure without losing any sentences, bullet points, or details.
3. OCR & DEGREE FIX: Fix OCR errors (e.g. "31"->"S1", "32"->"S2", "33"->"S3", "03"->"D3", "Sentor"->"Senior"). Do NOT alter candidate names.
4. STRICT SEPARATION (EXPERIENCE vs PROJECTS):
   - "experience" MUST contain ONLY formal career/employment roles, job titles, and company positions (e.g. "Editor-in-Chief at Publication", "Software Engineer at Tech Corp").
   - "projects" MUST contain ONLY specific standalone apps, websites, software tools, or built products (e.g. "E-Commerce App", "Portfolio Website"). NEVER mix company job roles into projects or vice versa.
5. SKILLS: Deduce skills from both "Skills" sections and experience/project text as a comma-separated string.
6. NULL POLICY: Use "" for missing strings and [] for missing arrays. If NO projects exist, return "projects": []. Never output placeholder objects or "null".

JSON SCHEMA:
{
  "personal": { "name": "", "role": "", "email": "", "phone": "", "location": "", "website": "", "description": "" },
  "experience": [{ "company": "", "role": "", "date": "", "description": "" }],
  "education": [{ "institution": "", "degree": "", "date": "", "description": "" }],
  "projects": [],
  "skills": ""
}

Return ONLY raw valid JSON starting with "{" and ending with "}".

RESUME TEXT:
${extractedText}`;

  // ROUTE 1: Gemini 2.0 Flash Lite
  if (selectedModel === 'gemini-2.0-flash-lite') {
    console.log('🪶 Routing request to Gemini 2.0 Flash Lite via Genkit...');
    const response = await ai.generate({
      model: getGeminiModel('gemini-2.0-flash-lite' as any),
      output: { schema: AnalyzeResumeOutputSchema },
      prompt: jsonPrompt,
    });

    if (!response.output) throw new Error('Gagal mendapatkan respon dari Gemini AI.');
    return response.output;
  }

  // ROUTE 2: Cerebras Cloud API
  if (selectedModel.startsWith('cerebras/')) {
    const cerebrasModel = selectedModel.replace('cerebras/', '');
    console.log(`🚀 Routing request to Cerebras Cloud API (${cerebrasModel})...`);
    const apiKey = process.env.CEREBRAS_API_KEY || '';

    const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: cerebrasModel,
        messages: [
          { role: 'system', content: 'You are an Expert Resume Rewrite & JSON Parsing System. Transfer full original text into JSON without summarizing or dropping details.' },
          { role: 'user', content: jsonPrompt },
        ],
        temperature: 0.1,
      }),
    });

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error(`Cerebras API Error: ${JSON.stringify(data)}`);
    return parseCleanJson(content);
  }

  // ROUTE 3: OpenRouter API (Auto Free Router / Free Model Pool)
  if (selectedModel.startsWith('openrouter/')) {
    let openrouterModel = selectedModel.replace('openrouter/', '');
    if (openrouterModel === 'auto') {
      openrouterModel = 'openrouter/free'; // Uses OpenRouter's dynamic auto-free router with JSON support
    }
    console.log(`🌐 Routing request to OpenRouter API (${openrouterModel})...`);
    const apiKey = process.env.OPENROUTER_API_KEY || '';

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openrouterModel,
        messages: [
          { role: 'system', content: 'You are an Expert Resume Rewrite & JSON Parsing System. Transfer full original text into JSON without summarizing or dropping details.' },
          { role: 'user', content: jsonPrompt },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
    });

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error(`OpenRouter API Error: ${JSON.stringify(data)}`);
    return parseCleanJson(content);
  }

  // ROUTE 4: Default Groq Cloud API
  console.log(`⚡ Routing request to Groq Cloud API (${selectedModel})...`);

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an Expert Resume Rewrite & JSON Parsing System. Transfer full original text into JSON without summarizing or dropping details.' },
      { role: 'user', content: jsonPrompt },
    ],
    model: selectedModel,
    temperature: 0.1,
    response_format: { type: 'json_object' },
  });

  const responseText = completion.choices[0]?.message?.content || '';
  if (!responseText) throw new Error('Groq AI returned an empty response.');
  return parseCleanJson(responseText);
}

function parseCleanJson(rawText: string): AnalyzeResumeOutput {
  try {
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse AI JSON output:', rawText);
    throw new Error('Gagal menyusun data JSON dari hasil analisis AI.');
  }
}