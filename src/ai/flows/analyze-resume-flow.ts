
'use server';
/**
 * @fileOverview An AI flow to analyze a resume image or PDF text and extract structured data.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

const AnalyzeResumeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "An image of a resume or a PDF file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: { schema: AnalyzeResumeInputSchema },
  output: { schema: AnalyzeResumeOutputSchema },
  prompt: `Analyze and parse the resume content into structured JSON.

RULES:
1. READ WHOLE TEXT & SEMANTIC CLASSIFICATION: Read the ENTIRE document text first to understand context before categorizing. Analyze whether a sentence/paragraph is a candidate's personal summary (merge into "personal.description"), a job achievement, or an education detail.
2. NO SUMMARIZATION / NO TRUNCATION: DO NOT summarize, shorten, omit, or rewrite any user text. The goal is to transfer the FULL original content of the user's CV into the new template structure without losing any sentences, bullet points, or details.
3. OCR & DEGREE FIX: Fix OCR errors (e.g. "31"->"S1", "32"->"S2", "33"->"S3", "03"->"D3", "Sentor"->"Senior"). Do NOT alter candidate names.
4. STRICT SEPARATION (EXPERIENCE vs PROJECTS):
   - "experience" MUST contain ONLY formal career/employment roles, job titles, and company positions (e.g. "Editor-in-Chief at Publication", "Software Engineer at Tech Corp").
   - "projects" MUST contain ONLY specific standalone apps, websites, software tools, or built products (e.g. "E-Commerce App", "Portfolio Website"). NEVER mix company job roles into projects or vice versa.
5. SKILLS: Deduce skills from both "Skills" sections and experience/project text as a comma-separated string.
6. NULL POLICY: Use "" for missing strings and [] for missing arrays. If NO projects exist, return "projects": []. Never output placeholder objects or "null".

Resume Content:
{{media url=photoDataUri}}
`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error('Failed to get a structured response from the AI.');
    }
    return output;
  }
);
