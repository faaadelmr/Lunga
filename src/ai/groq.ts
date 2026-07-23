import Groq from 'groq-sdk';

// Initialize Groq Cloud Client
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// Export all available models across Groq, Cerebras, OpenRouter, and Gemini
export type AiModel = 
  | 'cerebras/gemma-4-31b'              // Cerebras Cloud Gemma 4 31B (Default)
  | 'llama-3.3-70b-versatile'           // Groq Llama 3.3 70B Versatile
  | 'openrouter/auto'                   // OpenRouter Auto-Free Router
  | 'openrouter/free'                   // OpenRouter Fallback Free Pool
  | 'gemini-2.0-flash-lite';            // Gemini 2.0 Flash Lite (Hidden option)

export const getGroqModel = (modelName: AiModel): string => {
  return modelName;
};
