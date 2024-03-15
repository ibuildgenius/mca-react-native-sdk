import {create} from 'zustand';

export const useApiKeyStore = create(set => ({
  apiKey: '',
  baseUrl: 'https://api.mycover.ai', // 'https://api.mycover.ai',
  paymentOption: 'gateway',
  debitWalletReference: '',
  form: {},
  onComplete: () => console.log('Done'),
  setApiKey: apiKey => set(state => ({apiKey})),
  setForm: form => set(state => ({form})),
  setPaymentOption: paymentOption => set(state => ({paymentOption})),
  setDebitWalletReference: debitWalletReference => set(state => ({debitWalletReference})),
  setOnComplete: onComplete => set({ onComplete }),
}));
