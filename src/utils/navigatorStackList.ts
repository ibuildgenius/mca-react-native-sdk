import { BankModel } from '../models/BankModel';
import { ClaimModel } from '../models/ClaimModel';
import { InspectionModel } from '../models/InspectionModel';
import { PolicyModel } from '../models/PolicyModel';
import { ProductDetailsModel } from '../models/ProductDetailsModel';
import { PurchaseDetailsResponseModel } from '../models/PurchaseDetailsResponseModel';
import { PurchaseinitializationModel } from '../models/PurchaseinitializationModel';
import { type FileData } from '../screens/purchase/form/components/CustomImagePicker';
import {
  ClaimType,
  PaymentMethod,
  PaymentOption,
  ProductCategory,
  TransactionType,
} from './enums';

// types.ts
export type RootStackParamList = {
  WelcomeScreen: undefined;
  InputForm: undefined;
  VideoRecorder: undefined;
  GridSdkOptionsScreen: undefined;
  ListSdkOptionsScreen: undefined;
  CustomItemPairWidget: undefined;
  GadgetVerificationScreen: undefined;
  SDKErrorScreen: { error: string };
  GridViewProductListScreen: undefined;
  VehicleVerificationScreen: undefined;
  ListViewProductListScreen: undefined;
  PaymentMethodScreen: undefined;
  CarInspectionPageView: undefined;
  GadgetInspectionPageView: undefined;
  AccountDetailsScreen: {
    purchaseDetails: PurchaseinitializationModel;
    paymentMethod: PaymentMethod;
  };

  VideoPlayerScreen: {
    videoUri: string;
  };

  PaymentProcessingScreen: {
    purchaseDetails: PurchaseinitializationModel;
    paymentMethod: PaymentMethod;
  };

  PurchaseSuccessScreen: {
    policy: PolicyModel;
    productDetails: ProductDetailsModel;
  };
  InspectionInitScreen: {
    productCategory: ProductCategory | null;
  };
  PaymentSuccessScreen: { purchaseDetails: PurchaseDetailsResponseModel };
  PlanDetailsScreen: { purchaseDetails: PurchaseDetailsResponseModel };
  SecondFormScreen: { productDetails: ProductDetailsModel };
  // GridViewProviderListScreen: { categoryId: string; productCategory: any };
  GridViewProviderListScreen: {
    categoryId: string;
    productCategory: any;
  };
  UploadThirdPartyDocumentScreen: {
    claim: ClaimModel | null;
  };

  ListViewProviderListScreen: { categoryId: string; productCategory: any };
  FirstFormScreen: { productDetails: ProductDetailsModel | null };
  ProductDetailsScreen: { productDetails: ProductDetailsModel | null };
  VehicleInspectionSummaryScreen: { videoFile: FileData | null };

  GadgetInspectionSummaryScreen: { videoFile: FileData | null };

  InspectionSuccessScreen: { inspection: InspectionModel };

  ConfirmPolicyInfoScreen: {
    policy: PolicyModel;
    productDetails: ProductDetailsModel;
  };

  ClaimFirstFormScreen: {
    policy: PolicyModel;
  };

  GadgetClaimFirstFormScreen: {
    policy: PolicyModel;
  };

  TravelClaimFirstFormScreen: {
    policy: PolicyModel;
  };

  ClaimSummaryScreen: {
    incidentType: string;
    incidentDate: string;
    incidentTime: string;
    lossType: string[];
    incidentLocation: string;
    isThirdParty: boolean;
    description: string;
    thirdPartyLossType: string[];
    thirdPartyPhoneNumber: string;
    claimType: string;
  };

  GadgetClaimSummaryScreen: {
    incidentType: string;
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    description: string;
    // claimType: string;
    policyNumber: string;
    paymentReceipt: FileData;
  };

  TravelClaimSummaryScreen: {
    incidentType: string;
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    description: string;

    policyNumber: string;
    boardingPass: FileData;
    bookingInvoice: FileData;
  };

  ClaimSubmittedScreen: {
    claim: ClaimModel;
    detailedClaim?: ClaimModel;
    submissionStep?: string;
  };

  GadgetClaimSubmittedScreen: {
    claim: ClaimModel;
    detailedClaim?: ClaimModel;
    submissionStep?: string;
  };
  TravelClaimSubmittedScreen: {
    claim: ClaimModel;
    detailedClaim?: ClaimModel;
    submissionStep?: string;
  };

  TrackClaimsScreen: {
    claim: ClaimModel;
  };

  TrackTravelClaimsScreen: {
    claim: ClaimModel;
  };

  TravelDocumentationScreen: {
    claim: ClaimModel;
  };

  TrackGadgetClaimsScreen: {
    claim: ClaimModel;
  };

  RepairEstimateScreen: {
    claim: ClaimModel;
  };

  OfferSettlementScreen: {
    claim: ClaimModel;
  };

  ThirdPartyClaimFormScreen: {
    policy: PolicyModel;
  };

  SubmitPoliceReportScreen: {
    claim: ClaimModel; // Adjust based on your claim model
    claimType?: ClaimType; // Assuming ClaimType can be 'auto' or 'gadget'
  };

  AcceptOfferScreen: {
    claim: ClaimModel;
    banks: Array<BankModel>;
  };

  // video: VideoFile

  // StartupScreen: { showLoadingText?: boolean };
  StartupScreen: undefined;

  SetSdkPropScreen: {
    apikey: string;
    policyId?: string | null;
    policyNumber?: string | null;
    referenceNumber?: string | null;
    email?: string | null;
    transactionType?: TransactionType | null;
    paymentOption?: PaymentOption | null;
  };
};
