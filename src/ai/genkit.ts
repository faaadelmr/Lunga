import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Export the plugin for use with different models
export const googleAiPlugin = googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash', // Default model
});

// Model type for type safety matching the user request
export type GeminiAiModel = 'gemini-2.0-flash-lite';

export const getGeminiModel = (modelName: GeminiAiModel): string => {
  return `googleai/${modelName}`;
};
