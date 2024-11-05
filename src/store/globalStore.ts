import { create } from 'zustand';
import { ClaimModel } from '../models/ClaimModel';
import { BusinessDetailsModel } from '../models/BusinessDetailsModel';
import { UssdProviderModel } from '../models/UssdProviderModel';
import {
  GadgetType,
  PaymentOption,
  ProductCategory,
  TransactionType,
} from '../utils/enums';

export interface GlobalStoreState {
  instanceId: string;
  publicKey: string;
  reference: string;
  claimId: string;
  claim: ClaimModel | null;
  productCategory: ProductCategory | null;
  paymentOption: PaymentOption;
  productId: string[];
  brandColorPrimary: string | null;
  email: string | null;
  phone: string | null;
  form: Record<string, any>;
  businessDetails: BusinessDetailsModel | null;
  ussdProviders: UssdProviderModel[];
  isContactFieldsEditable: boolean;
  isTest: boolean;
  showLoadingText: boolean;
  useDefaultColor: boolean;
  policyId: string;
  policyNumber: string | null;
  inspectionEmail: string | null;
  mode: string;
  transactionType: TransactionType | null;
  gadgetType: GadgetType;
  inspectionAddress: string;
  inspectionLongitude: string;
  inspectionLatitude: string;
}

export interface GlobalStoreActions {
  setInstanceId: (instanceId: string) => void;
  setPublicKey: (publicKey: string) => void;
  setReference: (reference: string) => void;
  setClaimId: (claimId: string) => void;
  setClaim: (claim: ClaimModel | null) => void;
  setProductCategory: (productCategory: ProductCategory | null) => void;
  setPaymentOption: (paymentOption: PaymentOption) => void;
  setProductId: (productId: string[]) => void;
  setBrandColorPrimary: (brandColorPrimary: string | null) => void;
  setEmail: (email: string | null) => void;
  setPhone: (phone: string | null) => void;
  setForm: (form: Record<string, any>) => void;
  setBusinessDetails: (businessDetails: BusinessDetailsModel | null) => void;
  setUssdProviders: (ussdProviders: UssdProviderModel[]) => void;
  setIsContactFieldsEditable: (isContactFieldsEditable: boolean) => void;
  setIsTest: (isTest: boolean) => void;
  setShowLoadingText: (showLoadingText: boolean) => void;
  setUseDefaultColor: (useDefaultColor: boolean) => void;
  setPolicyId: (policyId: string) => void;
  setPolicyNumber: (policyNumber: string | null) => void;
  setInspectionEmail: (inspectionEmail: string | null) => void;
  setMode: (mode: string) => void;
  setTransactionType: (transactionType: TransactionType | null) => void;
  setGadgetType: (gadgetType: GadgetType) => void;
  setInspectionAddress: (inspectionAddress: string) => void;
  setInspectionLongitude: (inspectionLongitude: string) => void;
  setInspectionLatitude: (inspectionLatitude: string) => void;

  // Reset functions
  resetInstanceId: () => void;
  resetPublicKey: () => void;
  resetReference: () => void;
  resetClaimId: () => void;
  resetClaim: () => void;
  resetProductCategory: () => void;
  resetPaymentOption: () => void;
  resetProductId: () => void;
  resetBrandColorPrimary: () => void;
  resetEmail: () => void;
  resetPhone: () => void;
  resetForm: () => void;
  resetBusinessDetails: () => void;
  resetUssdProviders: () => void;
  resetIsContactFieldsEditable: () => void;
  resetIsTest: () => void;
  resetShowLoadingText: () => void;
  resetUseDefaultColor: () => void;
  resetPolicyId: () => void;
  resetPolicyNumber: () => void;
  resetInspectionEmail: () => void;
  resetMode: () => void;
  resetTransactionType: () => void;
  resetGadgetType: () => void;
  resetInspectionAddress: () => void;
  resetInspectionLongitude: () => void;
  resetInspectionLatitude: () => void;
}

export interface GlobalStore extends GlobalStoreState, GlobalStoreActions {
  onComplete: () => void;
  onClose: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  instanceId: '',
  publicKey: '',
  reference: '',
  claimId: '',
  claim: null as ClaimModel | null,
  productCategory: null as ProductCategory | null,
  paymentOption: 'gateway' as PaymentOption,
  productId: [] as string[],
  brandColorPrimary: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  form: {} as Record<string, any>,
  businessDetails: null as BusinessDetailsModel | null,

  ussdProviders: [] as UssdProviderModel[],
  isContactFieldsEditable: true,
  isTest: true,
  showLoadingText: true,
  useDefaultColor: false,
  policyId: '',
  policyNumber: null as string | null,
  inspectionEmail: null as string | null,
  mode: 'liveMode',
  transactionType: null as TransactionType | null,
  gadgetType: 'phone' as GadgetType,
  inspectionAddress: '',
  inspectionLongitude: '',
  inspectionLatitude: '',

  onComplete: () => console.log('Done'),
  onClose: () => console.log('Done'),

  setInstanceId: (instanceId: string) => set(() => ({ instanceId })),
  setPublicKey: (publicKey: string) => set(() => ({ publicKey })),
  setReference: (reference: string) => set(() => ({ reference })),
  setClaimId: (claimId: string) => set(() => ({ claimId })),
  setClaim: (claim: ClaimModel | null) => set(() => ({ claim })),
  setProductCategory: (productCategory: ProductCategory | null) =>
    set(() => ({ productCategory })),
  setPaymentOption: (paymentOption: PaymentOption) =>
    set(() => ({ paymentOption })),
  setProductId: (productId: string[]) => set(() => ({ productId })),
  setBrandColorPrimary: (brandColorPrimary: string | null) =>
    set(() => ({ brandColorPrimary })),
  setEmail: (email: string | null) => set(() => ({ email })),
  setPhone: (phone: string | null) => set(() => ({ phone })),
  setForm: (form: Record<string, any>) => set(() => ({ form })),
  setBusinessDetails: (businessDetails: BusinessDetailsModel | null) =>
    set(() => ({ businessDetails })),
  setUssdProviders: (ussdProviders: UssdProviderModel[]) =>
    set(() => ({ ussdProviders })),
  setIsContactFieldsEditable: (isContactFieldsEditable: boolean) =>
    set(() => ({ isContactFieldsEditable })),
  setIsTest: (isTest: boolean) => set(() => ({ isTest })),
  setShowLoadingText: (showLoadingText: boolean) =>
    set(() => ({ showLoadingText })),
  setUseDefaultColor: (useDefaultColor: boolean) =>
    set(() => ({ useDefaultColor })),
  setPolicyId: (policyId: string) => set(() => ({ policyId })),
  setPolicyNumber: (policyNumber: string | null) =>
    set(() => ({ policyNumber })),
  setInspectionEmail: (inspectionEmail: string | null) =>
    set(() => ({ inspectionEmail })),
  setMode: (mode: string) => set(() => ({ mode })),
  setTransactionType: (transactionType: TransactionType | null) =>
    set(() => ({ transactionType })),

  setGadgetType: (gadgetType: GadgetType) => set(() => ({ gadgetType })),
  setInspectionAddress: (inspectionAddress: string) =>
    set(() => ({ inspectionAddress })),
  setInspectionLongitude: (inspectionLongitude: string) =>
    set(() => ({ inspectionLongitude })),
  setInspectionLatitude: (inspectionLatitude: string) =>
    set(() => ({ inspectionLatitude })),

  // Reset functions
  resetInstanceId: () => set(() => ({ instanceId: '' })),
  resetPublicKey: () => set(() => ({ publicKey: '' })),
  resetReference: () => set(() => ({ reference: '' })),
  resetClaimId: () => set(() => ({ claimId: '' })),
  resetClaim: () => set(() => ({ claim: null })),
  resetProductCategory: () => set(() => ({ productCategory: null })),
  resetPaymentOption: () =>
    set(() => ({ paymentOption: 'gateway' as PaymentOption })),
  resetProductId: () => set(() => ({ productId: [] })),
  resetBrandColorPrimary: () => set(() => ({ brandColorPrimary: null })),
  resetEmail: () => set(() => ({ email: null })),
  resetPhone: () => set(() => ({ phone: null })),
  resetForm: () => set(() => ({ form: {} })),
  resetBusinessDetails: () => set(() => ({ businessDetails: null })),
  resetUssdProviders: () => set(() => ({ ussdProviders: [] })),
  resetIsContactFieldsEditable: () =>
    set(() => ({ isContactFieldsEditable: true })),
  resetIsTest: () => set(() => ({ isTest: true })),
  resetShowLoadingText: () => set(() => ({ showLoadingText: true })),
  resetUseDefaultColor: () => set(() => ({ useDefaultColor: false })),
  resetPolicyId: () => set(() => ({ policyId: '' })),
  resetPolicyNumber: () => set(() => ({ policyNumber: null })),
  resetInspectionEmail: () => set(() => ({ inspectionEmail: null })),
  resetMode: () => set(() => ({ mode: 'liveMode' })),
  resetTransactionType: () => set(() => ({ transactionType: null })),
  resetGadgetType: () => set(() => ({ gadgetType: 'phone' as GadgetType })),
  resetInspectionAddress: () => set(() => ({ inspectionAddress: '' })),
  resetInspectionLongitude: () => set(() => ({ inspectionLongitude: '' })),
  resetInspectionLatitude: () => set(() => ({ inspectionLatitude: '' })),
}));
