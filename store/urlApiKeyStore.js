import { create } from 'zustand';

export const useApiKeyStore = create((set) => ({
    apiKey: '',
    baseUrl: '',
    setApiKey: (apiKey) => set((state) => ({ apiKey })),
    setBaseUrl: () => set((state) => ({ baseUrl: state.apiKey?.includes('TEST') ? 'https://staging.api.mycover.ai' : 'https://api.mycover.ai' }))
}))
