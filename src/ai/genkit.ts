import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Export the plugin for use with different models
export const googleAiPlugin = googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash', // Default model
});

// Model type for type safety matching the user request
export type AiModel = 
  | 'gemini-3.5-flash'
  | 'gemini-flash-lite-latest';

// Export functions to get the specific models by string identifier
export const getGeminiModel = (modelName: AiModel): string => {
  return `googleai/${modelName}`;
};
