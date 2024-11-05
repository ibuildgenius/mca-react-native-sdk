import { create } from 'zustand';
import { PaymentOption } from '../utils/enums';
import { SdkInitializationResponse } from '../models/SdkInitializationResponse';
import { ProductCategoriesModel } from '../models/ProductCategoriesModel';
import { BusinessDetailsModel } from '../models/BusinessDetailsModel';
import { ProviderModel } from '../models/ProviderModel';
import { ProductDetailsModel } from '../models/ProductDetailsModel';

export interface MiscStoreState {
  paymentOption: PaymentOption;
  publicKey: string | null;
  onComplete: (() => void) | null;
  onClose: (() => void) | null;
  isContactFieldsEditable: boolean;
  initResponse: SdkInitializationResponse | null;
  productCategories: ProductCategoriesModel[];
  businessDetails: BusinessDetailsModel | null;
  allProvidersList: ProviderModel[] | null;
  productProviderList: ProviderModel[] | null;
  selectedproductProviderList: string[];
  selectedAllProviders: boolean;
  productList: ProductDetailsModel[] | null;
  tempSelectedproductProviderList: string[];
  tempSelectedAllProviders: boolean;
}

export interface MiscStoreActions {
  setPaymentOption: (paymentOption: PaymentOption) => void;
  setPublicKey: (publicKey: string | null) => void;
  setOnComplete: (onComplete: (() => void) | null) => void;
  setOnClose: (onClose: (() => void) | null) => void;
  setIsContactFieldsEditable: (isContactFieldsEditable: boolean) => void;
  setInitResponse: (initResponse: SdkInitializationResponse | null) => void;
  setProductCategories: (productCategories: ProductCategoriesModel[]) => void;
  setBusinessDetails: (businessDetails: BusinessDetailsModel | null) => void;
  setAllProvidersList: (allProvidersList: ProviderModel[] | null) => void;
  setProductProviderList: (productProviderList: ProviderModel[] | null) => void;
  setSelectedproductProviderList: (
    selectedproductProviderList: string[]
  ) => void;
  setSelectedAllProviders: (selectedAllProviders: boolean) => void;
  setProductList: (productList: ProductDetailsModel[] | null) => void;
  setTempSelectedproductProviderList: (
    tempSelectedproductProviderList: string[]
  ) => void;
  setTempSelectedAllProviders: (tempSelectedAllProviders: boolean) => void;

  // Reset functions
  resetPaymentOption: () => void;
  resetPublicKey: () => void;
  resetOnComplete: () => void;
  resetOnClose: () => void;
  resetIsContactFieldsEditable: () => void;
  resetInitResponse: () => void;
  resetProductCategories: () => void;
  resetBusinessDetails: () => void;
  resetAllProvidersList: () => void;
  resetProductProviderList: () => void;
  resetSelectedproductProviderList: () => void;
  resetSelectedAllProviders: () => void;
  resetProductList: () => void;
  resetTempSelectedproductProviderList: () => void;
  resetTempSelectedAllProviders: () => void;
}

export interface MiscStore extends MiscStoreState, MiscStoreActions {}

export const useMiscStore = create<MiscStore>((set) => ({
  paymentOption: PaymentOption.gateway as PaymentOption,
  publicKey: null as string | null,
  onComplete: null as (() => void) | null,
  onClose: null as (() => void) | null,
  isContactFieldsEditable: true as boolean,
  initResponse: null as SdkInitializationResponse | null,
  productCategories: [] as ProductCategoriesModel[],
  businessDetails: null as BusinessDetailsModel | null,

  allProvidersList: null as ProviderModel[] | null,
  productProviderList: null as ProviderModel[] | null,

  selectedproductProviderList: [] as string[],

  selectedAllProviders: true as boolean,
  productList: null as ProductDetailsModel[] | null,
  tempSelectedproductProviderList: [] as string[],
  tempSelectedAllProviders: true as boolean,

  setAllProvidersList: (allProvidersList: ProviderModel[] | null) =>
    set({ allProvidersList }),
  setProductProviderList: (productProviderList: ProviderModel[] | null) =>
    set({ productProviderList }),
  setSelectedproductProviderList: (selectedproductProviderList: string[]) =>
    set({ selectedproductProviderList }),

  setSelectedAllProviders: (selectedAllProviders: boolean) =>
    set({ selectedAllProviders }),
  setProductList: (productList: ProductDetailsModel[] | null) =>
    set({ productList }),
  setTempSelectedproductProviderList: (
    tempSelectedproductProviderList: string[]
  ) => set({ tempSelectedproductProviderList }),
  setTempSelectedAllProviders: (tempSelectedAllProviders: boolean) =>
    set({ tempSelectedAllProviders }),

  setPaymentOption: (paymentOption: PaymentOption) =>
    set(() => ({ paymentOption })),
  setPublicKey: (publicKey: string | null) => set(() => ({ publicKey })),
  setOnComplete: (onComplete: (() => void) | null) =>
    set(() => ({ onComplete })),
  setOnClose: (onClose: (() => void) | null) => set(() => ({ onClose })),
  setIsContactFieldsEditable: (isContactFieldsEditable: boolean) =>
    set(() => ({ isContactFieldsEditable })),
  setInitResponse: (initResponse: SdkInitializationResponse | null) =>
    set(() => ({ initResponse })),
  setProductCategories: (productCategories: ProductCategoriesModel[]) =>
    set(() => ({ productCategories })),
  setBusinessDetails: (businessDetails: BusinessDetailsModel | null) =>
    set(() => ({ businessDetails })),

  // Reset functions
  resetPaymentOption: () =>
    set(() => ({ paymentOption: PaymentOption.gateway })),
  resetPublicKey: () => set(() => ({ publicKey: null })),
  resetOnComplete: () => set(() => ({ onComplete: null })),
  resetOnClose: () => set(() => ({ onClose: null })),
  resetIsContactFieldsEditable: () =>
    set(() => ({ isContactFieldsEditable: true })),
  resetInitResponse: () => set(() => ({ initResponse: null })),
  resetProductCategories: () => set(() => ({ productCategories: [] })),
  resetBusinessDetails: () => set(() => ({ businessDetails: null })),
  resetAllProvidersList: () => set(() => ({ allProvidersList: null })),
  resetProductProviderList: () => set(() => ({ productProviderList: null })),
  resetSelectedproductProviderList: () =>
    set(() => ({ selectedproductProviderList: [] })),
  resetSelectedAllProviders: () => set(() => ({ selectedAllProviders: true })),
  resetProductList: () => set(() => ({ productList: null })),
  resetTempSelectedproductProviderList: () =>
    set(() => ({ tempSelectedproductProviderList: [] })),
  resetTempSelectedAllProviders: () =>
    set(() => ({ tempSelectedAllProviders: true })),
}));
