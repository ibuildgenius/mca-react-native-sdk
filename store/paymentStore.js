import {create} from 'zustand';

export const usePaymentStore = create(set => ({
  hasPaid: false,
  setHasPaid: hasPaid => set(state => ({hasPaid})),
}));
