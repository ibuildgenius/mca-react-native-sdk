import { create } from 'zustand';

import { BankAccountModel } from '../models/BankAccountModel';
import { BankModel } from '../models/BankModel';

export interface ClaimStoreState {
  selectedBank: BankModel | null;
  accountDetails: BankAccountModel | null;
  bankList: Array<BankModel>;
  incidentTypeList: Array<string>;

  thirdPartyIncidentType: string[];
  thirdPartyDateOfIncident: string | null;
  thirdPartyAccidentTime: string | null;
  thirdPartyPolicyProvider: string | null;
  thirdPartyDamageType: string[];
}

export interface ClaimStoreActions {
  setSelectedBank: (selectedBank: BankModel | null) => void;
  setAccountDetails: (accountDetails: BankAccountModel | null) => void;
  setBankList: (bankList: Array<BankModel>) => void;

  setIncidentTypeList: (incidentTypeList: Array<string>) => void;
  setThirdPartyIncidentType: (thirdPartyIncidentType: string[]) => void;
  setThirdPartyDateOfIncident: (thirdPartyDateOfIncident: string) => void;
  setThirdPartyAccidentTime: (thirdPartyAccidentTime: string) => void;
  setThirdPartyPolicyProvider: (
    thirdPartyPolicyProvider: string | null
  ) => void;
  setThirdPartyDamageType: (thirdPartyDamageType: string[]) => void;

  // Reset functions
  resetSelectedBank: () => void;
  resetAccountDetails: () => void;
  resetBankList: () => void;
  resetIncidentTypeList: () => void;
  resetThirdPartyIncidentType: () => void;
  resetThirdPartyDateOfIncident: () => void;
  resetThirdPartyAccidentTime: () => void;
  resetThirdPartyPolicyProvider: () => void;
  resetThirdPartyDamageType: () => void;
}

export interface ClaimStore extends ClaimStoreState, ClaimStoreActions {}

export const useClaimStore = create<ClaimStore>((set) => ({
  selectedBank: null,
  accountDetails: null,
  bankList: [],
  incidentTypeList: [],

  thirdPartyIncidentType: [],
  thirdPartyDateOfIncident: null,
  thirdPartyAccidentTime: null,
  thirdPartyPolicyProvider: null,
  thirdPartyDamageType: [],

  setSelectedBank: (selectedBank: BankModel | null) =>
    set(() => ({ selectedBank })),

  setBankList: (bankList: Array<BankModel>) => set(() => ({ bankList })),

  // setAccountDetails: (selectedBank: BankModel) => set(() => ({selectedBank})),
  setAccountDetails: (accountDetails: BankAccountModel | null) =>
    set(() => ({ accountDetails })),

  setIncidentTypeList: (incidentTypeList: Array<string>) =>
    set(() => ({ incidentTypeList })),

  setThirdPartyIncidentType: (thirdPartyIncidentType: string[]) =>
    set({ thirdPartyIncidentType }),

  setThirdPartyDateOfIncident: (thirdPartyDateOfIncident: string) =>
    set({ thirdPartyDateOfIncident }),

  setThirdPartyAccidentTime: (thirdPartyAccidentTime: string) =>
    set({ thirdPartyAccidentTime }),

  setThirdPartyPolicyProvider: (thirdPartyPolicyProvider: string | null) =>
    set({ thirdPartyPolicyProvider }),

  setThirdPartyDamageType: (thirdPartyDamageType: string[]) =>
    set({ thirdPartyDamageType }),

  // Reset functions
  resetSelectedBank: () => set(() => ({ selectedBank: null })),
  resetAccountDetails: () => set(() => ({ accountDetails: null })),
  resetBankList: () => set(() => ({ bankList: [] })),
  resetIncidentTypeList: () => set(() => ({ incidentTypeList: [] })),
  resetThirdPartyIncidentType: () =>
    set(() => ({ thirdPartyIncidentType: [] })),
  resetThirdPartyDateOfIncident: () =>
    set(() => ({ thirdPartyDateOfIncident: null })),
  resetThirdPartyAccidentTime: () =>
    set(() => ({ thirdPartyAccidentTime: null })),
  resetThirdPartyPolicyProvider: () =>
    set(() => ({ thirdPartyPolicyProvider: null })),
  resetThirdPartyDamageType: () => set(() => ({ thirdPartyDamageType: [] })),
}));
