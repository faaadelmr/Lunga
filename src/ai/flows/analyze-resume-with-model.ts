'use server';
/**
 * @fileOverview Function to analyze a resume image or PDF text with a specific model and extract structured data.
 */

import { ai, type AiModel } from '@/ai/genkit';
import { getGeminiModel } from '@/ai/genkit';
import { z } from 'zod';
import { parsePdfToText } from '@/lib/pdf-parser';

const PersonalInfoSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  role: z.string().describe('The job title or role of the person (e.g., Frontend Developer).'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  location: z.string().describe('The city and state or country.'),
  website: z.string().describe('The personal website or portfolio URL.').optional(),
  description: z.string().describe("A professional summary or objective statement from the resume.").optional(),
});

const ExperienceSchema = z.object({
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job title or role.'),
  date: z.string().describe('The start and end dates of the employment.'),
  description: z.string().describe('A description of the responsibilities and achievements.'),
});

const EducationSchema = z.object({
  institution: z.string().describe('The name of the educational institution.'),
  degree: z.string().describe('The degree or certification obtained.'),
  date: z.string().describe('The start and end dates of the education.'),
  description: z.string().describe('Any additional details about the education.').optional(),
});

const ProjectSchema = z.object({
  name: z.string().describe('The name of the project.'),
  description: z.string().describe('A brief description of the project.'),
  technologies: z.string().describe('A comma-separated list of technologies used in the project.'),
  link: z.string().describe('A URL link to the project (e.g., GitHub, live demo).').optional(),
});


const AnalyzeResumeOutputSchema = z.object({
  personal: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema).describe("A list of personal or professional projects.").optional(),
  skills: z.string().describe('A comma-separated list of skills.'),
});

type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

interface AnalyzeResumeInput {
  photoDataUri: string;
  model: AiModel;
}

export async function analyzeResumeWithModel(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  const { photoDataUri, model } = input;

  // Get the selected model
  const selectedModel = getGeminiModel(model);

  // Check if file is PDF
  const isPdf = photoDataUri.startsWith('data:application/pdf');
  let pdfText = '';

  if (isPdf) {
    try {
      pdfText = await parsePdfToText(photoDataUri);
      console.log('\n================================================================');
      console.log('⚡ [BUKTI KONVERSI PDF KE TEKS/MARKDOWN]');
      console.log('Tuan, PDF telah berhasil dikonversi secara lokal ke teks.');
      console.log(`Panjang teks yang diekstrak: ${pdfText.length} karakter.`);
      console.log('----------------------------------------------------------------');
      console.log('Pratinjau 300 karakter pertama teks hasil konversi:');
      console.log(pdfText.substring(0, 300) + '...');
      console.log('================================================================\n');
    } catch (err) {
      console.error('PDF text extraction failed, falling back to multimodal:', err);
    }
  }

  // Generate structured output using Genkit generate API
  const response = await ai.generate({
    model: selectedModel,
    output: { schema: AnalyzeResumeOutputSchema },
    prompt: pdfText
      ? `You are an expert resume parser. Analyze the provided resume text extracted from a PDF and extract the information into a structured JSON format.

Extract the following sections:
- Personal Details (name, role, email, phone, location, website, and a professional summary/objective as description)
- Work Experience (company, role, dates, description)
- Education (institution, degree, dates, description)
- Projects (name, description, technologies used, and a link)
- Skills (as a single comma-separated string)

Pay close attention to formatting the extracted text correctly, especially for descriptions which may contain bullet points. Maintain the original language of the resume. If a section like 'Projects' is not found, return an empty array for it.

Resume Text Content:
${pdfText}`
      : [
          {
            text: `You are an expert resume parser. Analyze the provided resume image and extract the information into a structured JSON format.

Extract the following sections:
- Personal Details (name, role, email, phone, location, website, and a professional summary/objective as description)
- Work Experience (company, role, dates, description)
- Education (institution, degree, dates, description)
- Projects (name, description, technologies used, and a link)
- Skills (as a single comma-separated string)

Pay close attention to formatting the extracted text correctly, especially for descriptions which may contain bullet points. Maintain the original language of the resume. If a section like 'Projects' is not found, return an empty array for it.`
          },
          {
            media: {
              url: photoDataUri
            }
          }
        ]
  });

  const output = response.output;

  if (!output) {
    throw new Error('Failed to get a structured response from the AI.');
  }
  return output;
}