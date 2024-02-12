import {create} from 'zustand';

export const useApiKeyStore = create(set => ({
  apiKey: '',
  baseUrl: 'https://api.mycover.ai',
  setApiKey: apiKey => set(state => ({apiKey})),
}));
