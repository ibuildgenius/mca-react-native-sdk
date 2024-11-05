import { create } from 'zustand';

export interface LoadStoreState {
  paymentVmLoading: boolean;
  formVmLoading: boolean;
  inspectVmLoading: boolean;
  formImageVmLoading: boolean;
  claimVmLoading: boolean;
  uploadProgress: number;
  newUploadProgress: number;
}

export interface LoadStoreActions {
  setPaymentVmLoading: (paymentVmLoading: boolean) => void;
  setFormVmLoading: (formVmLoading: boolean) => void;
  setClaimVmLoading: (claimVmLoading: boolean) => void;
  setInspectVmLoading: (formVmLoading: boolean) => void;
  setFormImageVmLoading: (formImageVmLoading: boolean) => void;
  setUploadProgress: (uploadProgress: number) => void;
  setNewUploadProgress: (uploadProgress: number) => void;
  // Reset functions
  resetPaymentVmLoading: () => void;
  resetFormVmLoading: () => void;
  resetClaimVmLoading: () => void;
  resetInspectVmLoading: () => void;
  resetFormImageVmLoading: () => void;
  resetUploadProgress: () => void;
}

export interface LoadStore extends LoadStoreState, LoadStoreActions {}

export const useLoadStore = create<LoadStore>((set) => ({
  uploadProgress: 0,
  newUploadProgress: 0,
  paymentVmLoading: false as boolean,
  formVmLoading: false as boolean,
  inspectVmLoading: false as boolean,
  formImageVmLoading: false as boolean,
  claimVmLoading: false as boolean,

  setUploadProgress: (uploadProgress: number) =>
    set({ uploadProgress: uploadProgress }),
  setNewUploadProgress: (newUploadProgress: number) =>
    set({ newUploadProgress: newUploadProgress }),

  setPaymentVmLoading: (paymentVmLoading: boolean) =>
    set(() => ({ paymentVmLoading })),

  setFormVmLoading: (formVmLoading: boolean) => set(() => ({ formVmLoading })),

  setClaimVmLoading: (claimVmLoading: boolean) =>
    set(() => ({ claimVmLoading })),

  setInspectVmLoading: (inspectVmLoading: boolean) =>
    set(() => ({ inspectVmLoading })),
  setFormImageVmLoading: (formImageVmLoading: boolean) =>
    set(() => ({ formImageVmLoading })),

  // Reset functions
  resetPaymentVmLoading: () => set(() => ({ paymentVmLoading: false })),
  resetFormVmLoading: () => set(() => ({ formVmLoading: false })),
  resetClaimVmLoading: () => set(() => ({ claimVmLoading: false })),
  resetInspectVmLoading: () => set(() => ({ inspectVmLoading: false })),
  resetFormImageVmLoading: () => set(() => ({ formImageVmLoading: false })),
  resetUploadProgress: () => set(() => ({ uploadProgress: 0 })),
}));
