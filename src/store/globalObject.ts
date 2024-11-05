import { BusinessDetailsModel } from '../models/BusinessDetailsModel';
import { ClaimModel } from '../models/ClaimModel';
import { ProductCategoriesModel } from '../models/ProductCategoriesModel';
import { GadgetType, PaymentOption, TransactionType } from '../utils/enums';

type GlobalObject = {
  primaryBrandColor: string | null;
  publicKey: string | null;
  policyId: string | null;
  claimId: string | null;
  claim: ClaimModel | null;
  policyNumber: string | null;
  email: string | null;
  inspectionEmail: string | null;
  reference: string | null;
  transactionType: TransactionType | null;
  paymentOption: PaymentOption | null;
  businessDetails: BusinessDetailsModel | null;
  productCategories: ProductCategoriesModel[];
  productId: string[];
  gadgetType: GadgetType;

  inspectionAddress: string | null;
  inspectionLongitude: string | null;
  inspectionLatitude: string | null;

  setPrimaryBrandColor: (value: string | null) => void;
  setPublicKey: (value: string | null) => void;
  setReference: (value: string | null) => void;
  setPolicyId: (value: string | null) => void;
  setClaimId: (value: string | null) => void;
  setClaim: (value: ClaimModel | null) => void;
  setPolicyNumber: (value: string | null) => void;
  setEmail: (value: string | null) => void;
  setInspectionEmail: (value: string | null) => void;
  setTransactionType: (value: TransactionType | null) => void;
  setPaymentOption: (value: PaymentOption | null) => void;
  setBusinessDetails: (value: BusinessDetailsModel | null) => void;
  setProductCategories: (value: ProductCategoriesModel[]) => void;

  setProductId: (value: string[]) => void;

  setGadgetType: (value: GadgetType) => void;

  setInspectionAddress: (value: string | null) => void;
  setInspectionLongitude: (value: string | null) => void;
  setInspectionLatitude: (value: string | null) => void;
  clearAll: () => void;
};

// Define the global object with its methods
const globalObject: GlobalObject = {
  primaryBrandColor: null,
  publicKey: null,
  policyId: null,
  claimId: null,
  claim: null,
  policyNumber: null,
  email: null,
  inspectionEmail: null,
  transactionType: null,
  reference: null,
  businessDetails: null,
  productCategories: [] as ProductCategoriesModel[],
  productId: [] as string[],
  gadgetType: GadgetType.phone,
  paymentOption: PaymentOption.gateway,

  inspectionAddress: '',
  inspectionLongitude: '',
  inspectionLatitude: '',

  setPrimaryBrandColor(value: string | null) {
    this.primaryBrandColor = value;
  },
  setPublicKey(value: string | null) {
    this.publicKey = value;
  },
  setPolicyId(value: string | null) {
    this.policyId = value;
  },
  setReference(value: string | null) {
    this.reference = value;
  },

  setClaimId(value: string | null) {
    this.claimId = value;
  },
  setClaim(value: ClaimModel | null) {
    this.claim = value;
  },

  setPolicyNumber(value: string | null) {
    this.policyNumber = value;
  },

  setEmail(value: string | null) {
    this.email = value;
  },
  setInspectionEmail(value: string | null) {
    this.email = value;
  },
  setTransactionType(value: TransactionType | null) {
    this.transactionType = value;
  },

  setPaymentOption(value: PaymentOption | null) {
    this.paymentOption = value;
  },
  setBusinessDetails(value: BusinessDetailsModel | null) {
    this.businessDetails = value;
  },

  setProductCategories(value: ProductCategoriesModel[]) {
    this.productCategories = value;
  },

  setProductId(value: string[]) {
    this.productId = value;
  },

  setGadgetType(value: GadgetType) {
    this.gadgetType = value;
  },

  setInspectionAddress(value: string | null) {
    this.inspectionAddress = value;
  },
  setInspectionLongitude(value: string | null) {
    this.inspectionLongitude = value;
  },
  setInspectionLatitude(value: string | null) {
    this.inspectionLatitude = value;
  },

  clearAll() {
    this.primaryBrandColor = null;
    this.publicKey = null;
  },
};

export default globalObject;
