
"use client";

import React, { createContext, useContext, useState } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font, Language, SupportedAiModel } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { analyzeResumeWithModel } from '@/ai/flows/analyze-resume-with-model';
import { templates } from '@/components/editor/style-panel';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0].id);
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#FFFFFF'); // White
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#1F2937'); // Black
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiProgressStep, setAiProgressStep] = useState('');
  const [selectedAiModel, setSelectedAiModel] = useState<SupportedAiModel>('cerebras/gemma-4-31b');

  const handleAnalyzeResume = async (photoDataUri: string) => {
    setIsAiLoading(true);
    setAiProgress(5);
    setAiProgressStep('Memproses & menyiapkan berkas...');

    // Progress step interval helper
    let progressTimer: NodeJS.Timeout;

    try {
      // Step 1: File reading
      setAiProgress(20);
      setAiProgressStep('Mengekstrak teks & OCR dokumen...');

      // Simulate incremental progress while calling server action
      progressTimer = setInterval(() => {
        setAiProgress((prev) => {
          if (prev < 85) return prev + Math.floor(Math.random() * 8) + 2;
          return prev;
        });
      }, 400);

      // Step 2: Call Gemini AI Genkit
      const analyzedData = await analyzeResumeWithModel({ photoDataUri, model: selectedAiModel });

      clearInterval(progressTimer);
      setAiProgress(90);
      setAiProgressStep('Menyusun data CV & formatting...');

      // Add unique IDs to experience, education and projects items
      const experienceWithIds = analyzedData.experience.map(exp => ({ ...exp, id: crypto.randomUUID() }));
      const educationWithIds = analyzedData.education.map(edu => ({ ...edu, id: crypto.randomUUID() }));
      const projectsWithIds = (analyzedData.projects || []).map(proj => ({ ...proj, id: crypto.randomUUID() }));

      const fullData = {
        ...initialData,
        ...analyzedData,
        personal: {
          ...initialData.personal,
          ...analyzedData.personal,
        },
        experience: experienceWithIds,
        education: educationWithIds,
        projects: projectsWithIds,
      };

      setAiProgress(100);
      setAiProgressStep('Selesai!');
      setResumeData(fullData);
    } catch (error: any) {
      console.error("Failed to analyze resume:", error);
      throw new Error(`AI Analysis failed: ${error?.message || 'Unknown error occurred'}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const value = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
    selectedBgColor,
    setSelectedBgColor,
    selectedTextColor,
    setSelectedTextColor,
    selectedFont,
    setSelectedFont,
    selectedLanguage,
    setSelectedLanguage,
    selectedAiModel,
    setSelectedAiModel,
    handleAnalyzeResume,
    isAiLoading,
    aiProgress,
    aiProgressStep,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextProps => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

