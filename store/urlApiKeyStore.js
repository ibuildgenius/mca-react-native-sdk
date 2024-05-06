import {create} from 'zustand';

export const useApiKeyStore = create(set => ({
  apiKey: '',
  baseUrl: 'https://api.mycover.ai', // 'https://api.mycover.ai',
  paymentOption: 'gateway',
  debitWalletReference: '',
  form: {},
  successMessage: '',
  onComplete: () => console.log('Done'),
  onClose: () => console.log('Closed'),
  setApiKey: apiKey => set(state => ({apiKey})),
  setForm: form => set(state => ({form})),
  setPaymentOption: paymentOption => set(state => ({paymentOption})),
  setDebitWalletReference: debitWalletReference => set(state => ({debitWalletReference})),
  setOnComplete: onComplete => set({ onComplete }),
  setonClose: onClose => set({ onClose }),
  setSuccessMessage: successMessage => set(state => ({successMessage})),
  resetToDefault: () => set({
    apiKey: '',
    baseUrl: 'https://api.mycover.ai',
    paymentOption: 'gateway',
    debitWalletReference: '',
    form: {},
    onComplete: () => console.log('Done'),
    onClose: () => console.log('Closed'),
  }),
}));
