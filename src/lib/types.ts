export interface ResumeData {
  personal: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    description: string;
    photo?: string;
  };
  experience: {
    id: string;
    company: string;
    role: string;
    date: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    date: string;
    description?: string;
  }[];
  projects: {
    id: string;
    name: string;
    description?: string;
    technologies: string;
    link?: string;
  }[];
  skills: string;
}

export type Template = 'git-folio' | 'ats-friendly' | 'blox' | 'ledger' | 'construct' | 'starlight' | 'modern' | 'classic' | 'creative' | 'swiss' | 'elegant' | 'professional' | 'timeline' | 'smart-start' | 'vektoristik' | 'awesome' | 'cooper' | 'quete' | 'diamond' | 'hexagonvy' | 'glassmorphism' | 'developer-cli' | 'neo-brutalist';
export type Font = string;
export type Language = 'en' | 'id';

export type SupportedAiModel =
  | 'cerebras/gemma-4-31b'
  | 'llama-3.3-70b-versatile'
  | 'openrouter/auto'
  | 'openrouter/free'
  | 'gemini-2.0-flash-lite';

export interface ResumeContextProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedBgColor: string;
  setSelectedBgColor: React.Dispatch<React.SetStateAction<string>>;
  selectedTextColor: string;
  setSelectedTextColor: React.Dispatch<React.SetStateAction<string>>;
  selectedFont: Font;
  setSelectedFont: React.Dispatch<React.SetStateAction<Font>>;
  selectedLanguage: Language;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language>>;
  selectedAiModel: SupportedAiModel;
  setSelectedAiModel: React.Dispatch<React.SetStateAction<SupportedAiModel>>;
  handleAnalyzeResume: (photoDataUri: string) => Promise<void>;
  isAiLoading: boolean;
  aiProgress: number;
  aiProgressStep: string;
}
