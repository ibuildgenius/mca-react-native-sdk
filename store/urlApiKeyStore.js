import {create} from 'zustand';

export const useApiKeyStore = create(set => ({
  apiKey: '',
  baseUrl: 'https://api.mycover.ai',
  onComplete: () => console.log('Done'),
  setApiKey: apiKey => set(state => ({apiKey})),
  setOnComplete: onComplete => set({ onComplete }),
}));
