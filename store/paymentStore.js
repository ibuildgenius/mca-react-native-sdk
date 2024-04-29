import {create} from 'zustand';

export const usePaymentStore = create(set => ({
  hasPaid: false,
  formError: {},
  setHasPaid: hasPaid => set(state => ({hasPaid})),
  setFormError: formError => set(state => ({formError})),
}));