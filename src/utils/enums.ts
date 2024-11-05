// @ts-nocheck
import globalObject from '../store/globalObject';
import { type GlobalStore } from '../store/globalStore';

export enum SdkOptions {
  buy = 'buy',
  renew = 'renew',
  manage = 'manage',
  claim = 'claim',
}

export function getBounceTextName(step: any): [string, string] {
  switch (step) {
    case CarVerificationStep.frontSidePreCapture:
    case CarVerificationStep.frontSideCapture:
    case CarVerificationStep.frontSideVerify:
    case CarVerificationStep.frontSideFailed:
      return ['Ensure to capture the ', 'bumper and windshield'];
    case CarVerificationStep.chasisNumberPreCapture:
    case CarVerificationStep.chasisNumberCapture:
    case CarVerificationStep.chasisNumberVerify:
    case CarVerificationStep.chasisNumberFailed:
      return ['Check ', "driver's side door"];
    case CarVerificationStep.leftSidePreCapture:
    case CarVerificationStep.leftSideCapture:
    case CarVerificationStep.leftSideVerify:
    case CarVerificationStep.leftSideFailed:
      return ['Snap from the ', "driver's side"];
    case CarVerificationStep.backSidePreCapture:
    case CarVerificationStep.backSideCapture:
    case CarVerificationStep.backSideVerify:
    case CarVerificationStep.backSideFailed:
    case CarVerificationStep.rightSidePreCapture:
    case CarVerificationStep.rightSideCapture:
    case CarVerificationStep.rightSideVerify:
    case CarVerificationStep.rightSideFailed:
      return ['Snap from the ', "passenger's side"];
    default:
      return ['', ''];
  }
}

export function getEndpointName(step: any): string {
  switch (step) {
    case CarVerificationStep.frontSidePreCapture:
    case CarVerificationStep.frontSideCapture:
    case CarVerificationStep.frontSideVerify:
    case CarVerificationStep.frontSideFailed:
    case PhoneVerificationStep.phoneFrontPreCapture:
    case PhoneVerificationStep.phoneFrontCapture:
    case PhoneVerificationStep.phoneFrontVerify:
      return 'front';
    case CarVerificationStep.chasisNumberPreCapture:
    case CarVerificationStep.chasisNumberCapture:
    case CarVerificationStep.chasisNumberVerify:
    case CarVerificationStep.chasisNumberFailed:
      return 'vin';
    case CarVerificationStep.leftSidePreCapture:
    case CarVerificationStep.leftSideCapture:
    case CarVerificationStep.leftSideVerify:
    case CarVerificationStep.leftSideFailed:
      return 'left';
    case CarVerificationStep.backSidePreCapture:
    case CarVerificationStep.backSideCapture:
    case CarVerificationStep.backSideVerify:
    case CarVerificationStep.backSideFailed:
      return 'rear';
    case CarVerificationStep.rightSidePreCapture:
    case CarVerificationStep.rightSideCapture:
    case CarVerificationStep.rightSideVerify:
    case CarVerificationStep.rightSideFailed:
      return 'right';
    case CarVerificationStep.dashboardPreCapture:
    case CarVerificationStep.dashboardCapture:
    case CarVerificationStep.dashboardVerify:
    case CarVerificationStep.dashboardFailed:
      return 'dashboard';
    case CarVerificationStep.interiorPreCapture:
    case CarVerificationStep.interiorCapture:
    case CarVerificationStep.interiorVerify:
    case CarVerificationStep.interiorFailed:
      return 'interior';
    case PhoneVerificationStep.phoneSidePreCapture:
    case PhoneVerificationStep.phoneSideCapture:
    case PhoneVerificationStep.phoneSideVerify:
      return 'side';
    case PhoneVerificationStep.phoneBackPreCapture:
    case PhoneVerificationStep.phoneBackCapture:
    case PhoneVerificationStep.phoneBackVerify:
      return 'back';
    case PhoneVerificationStep.phoneSettingsPreCapture:
    case PhoneVerificationStep.phoneSettingsCapture:
    case PhoneVerificationStep.phoneSettingsVerify:
      return 'settings';
    default:
      return 'Unknown';
  }
}

export function getSideName(step: any): string {
  switch (step) {
    case CarVerificationStep.frontSidePreCapture:
    case CarVerificationStep.frontSideCapture:
    case CarVerificationStep.frontSideVerify:
    case CarVerificationStep.frontSideFailed:
    case PhoneVerificationStep.phoneFrontPreCapture:
    case PhoneVerificationStep.phoneFrontCapture:
    case PhoneVerificationStep.phoneFrontVerify:
      return 'Front';
    case PhoneVerificationStep.phoneBackPreCapture:
    case PhoneVerificationStep.phoneBackCapture:
    case PhoneVerificationStep.phoneBackVerify:
      return 'Back';
    case PhoneVerificationStep.phoneSettingsPreCapture:
    case PhoneVerificationStep.phoneSettingsCapture:
    case PhoneVerificationStep.phoneSettingsVerify:
      return 'Internal Properties';
    case PhoneVerificationStep.phoneSidePreCapture:
    case PhoneVerificationStep.phoneSideCapture:
    case PhoneVerificationStep.phoneSideVerify:
      return 'Side';
    case CarVerificationStep.chasisNumberPreCapture:
    case CarVerificationStep.chasisNumberCapture:
    case CarVerificationStep.chasisNumberVerify:
    case CarVerificationStep.chasisNumberFailed:
      return 'Chassis Number';
    case CarVerificationStep.leftSidePreCapture:
    case CarVerificationStep.leftSideCapture:
    case CarVerificationStep.leftSideVerify:
    case CarVerificationStep.leftSideFailed:
      return 'Left';
    case CarVerificationStep.backSidePreCapture:
    case CarVerificationStep.backSideCapture:
    case CarVerificationStep.backSideVerify:
    case CarVerificationStep.backSideFailed:
      return 'Back';

    case CarVerificationStep.rightSidePreCapture:
    case CarVerificationStep.rightSideCapture:
    case CarVerificationStep.rightSideVerify:
    case CarVerificationStep.rightSideFailed:
      return 'Right';

    case CarVerificationStep.dashboardPreCapture:
    case CarVerificationStep.dashboardCapture:
    case CarVerificationStep.dashboardVerify:
    case CarVerificationStep.dashboardFailed:
      return 'Dashboard';

    case CarVerificationStep.interiorPreCapture:
    case CarVerificationStep.interiorCapture:
    case CarVerificationStep.interiorVerify:
    case CarVerificationStep.interiorFailed:
      return 'Interior';

    case CarVerificationStep.verificationCompleted:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

export function getInspectionSummaryName(
  step: string,
  inspectionType: InspectionType = InspectionType.vehicle
): string {
  switch (step) {
    case 'front':
      return inspectionType === InspectionType.gadget
        ? 'Front Image'
        : 'Front side';
    case 'back':
      return inspectionType === InspectionType.gadget
        ? 'Back Image'
        : 'Back side';
    case 'vin':
      return 'Chassis';
    case 'left':
      return 'Left side';
    case 'rear':
      return inspectionType === InspectionType.gadget
        ? 'Back Image'
        : 'Back side';
    case 'right':
      return 'Right side';
    case 'dashboard':
      return 'Dashboard';
    case 'interior':
      return 'Interior';
    case 'side':
      return 'Side Image';
    case 'settings':
      return 'Serial Number';
    default:
      return 'Unknown';
  }
}

export function getSideImage(step: any, global: GlobalStore): SideImage {
  switch (step) {
    case CarVerificationStep.frontSidePreCapture:
    case CarVerificationStep.frontSideCapture:
    case CarVerificationStep.frontSideVerify:
    case CarVerificationStep.frontSideFailed:
      return SideImage.front;
    case CarVerificationStep.chasisNumberPreCapture:
    case CarVerificationStep.chasisNumberCapture:
    case CarVerificationStep.chasisNumberVerify:
    case CarVerificationStep.chasisNumberFailed:
      return SideImage.chassisNumber;
    case CarVerificationStep.leftSidePreCapture:
    case CarVerificationStep.leftSideCapture:
    case CarVerificationStep.leftSideVerify:
    case CarVerificationStep.leftSideFailed:
      return SideImage.left;
    case CarVerificationStep.backSidePreCapture:
    case CarVerificationStep.backSideCapture:
    case CarVerificationStep.backSideVerify:
    case CarVerificationStep.backSideFailed:
      return SideImage.back;
    case CarVerificationStep.rightSidePreCapture:
    case CarVerificationStep.rightSideCapture:
    case CarVerificationStep.rightSideVerify:
    case CarVerificationStep.rightSideFailed:
      return SideImage.right;

    case CarVerificationStep.dashboardPreCapture:
    case CarVerificationStep.dashboardCapture:
    case CarVerificationStep.dashboardVerify:
    case CarVerificationStep.dashboardFailed:
      return SideImage.dashboard;

    case CarVerificationStep.interiorPreCapture:
    case CarVerificationStep.interiorCapture:
    case CarVerificationStep.interiorVerify:
    case CarVerificationStep.interiorFailed:
      return SideImage.interior;

    case PhoneVerificationStep.phoneFrontPreCapture:
    case PhoneVerificationStep.phoneFrontCapture:
    case PhoneVerificationStep.phoneFrontVerify:
      return globalObject.gadgetType == GadgetType.laptop
        ? SideImage.laptopFront
        : SideImage.phoneFrontImg;

    case PhoneVerificationStep.phoneBackPreCapture:
    case PhoneVerificationStep.phoneBackCapture:
    case PhoneVerificationStep.phoneBackVerify:
      return globalObject.gadgetType == GadgetType.laptop
        ? SideImage.laptopBackImg
        : SideImage.phoneBackImg;

    case PhoneVerificationStep.phoneSidePreCapture:
    case PhoneVerificationStep.phoneSideCapture:
    case PhoneVerificationStep.phoneSideVerify:
      return globalObject.gadgetType == GadgetType.laptop
        ? SideImage.laptopOtherImg
        : SideImage.phoneSideImg;

    case PhoneVerificationStep.phoneSettingsPreCapture:
    case PhoneVerificationStep.phoneSettingsCapture:
    case PhoneVerificationStep.phoneSettingsVerify:
      return globalObject.gadgetType == GadgetType.laptop
        ? SideImage.laptopSettingsImg
        : SideImage.phoneSettingsImg;

    case CarVerificationStep.verificationCompleted:
      return SideImage.leftSample;

    default:
      return SideImage.leftSample;
  }
}

// Verification stages and phone verification enums
export enum VerificationStage {
  unknown = 'unknown',
  preCapture = 'preCapture',
  capture = 'capture',
  verify = 'verify',
  failed = 'failed',
  loading = 'loading',
}

export enum PhoneVerificationStep {
  phoneFrontPreCapture = 'phoneFrontPreCapture',
  phoneFrontCapture = 'phoneFrontCapture',
  phoneFrontVerify = 'phoneFrontVerify',
  phoneBackPreCapture = 'phoneBackPreCapture',
  phoneBackCapture = 'phoneBackCapture',
  phoneBackVerify = 'phoneBackVerify',
  phoneSettingsPreCapture = 'phoneSettingsPreCapture',
  phoneSettingsCapture = 'phoneSettingsCapture',
  phoneSettingsVerify = 'phoneSettingsVerify',
  phoneSidePreCapture = 'phoneSidePreCapture',
  phoneSideCapture = 'phoneSideCapture',
  phoneSideVerify = 'phoneSideVerify',
  verificationLoading = 'verificationLoading',
  verificationCompleted = 'verificationCompleted',
}

export enum CarVerificationStep {
  frontSidePreCapture = 'frontSidePreCapture',
  frontSideCapture = 'frontSideCapture',
  frontSideVerify = 'frontSideVerify',
  frontSideFailed = 'frontSideFailed',
  chasisNumberPreCapture = 'chasisNumberPreCapture',
  chasisNumberCapture = 'chasisNumberCapture',
  chasisNumberVerify = 'chasisNumberVerify',
  chasisNumberFailed = 'chasisNumberFailed',
  leftSidePreCapture = 'leftSidePreCapture',
  leftSideCapture = 'leftSideCapture',
  leftSideVerify = 'leftSideVerify',
  leftSideFailed = 'leftSideFailed',
  backSidePreCapture = 'backSidePreCapture',
  backSideCapture = 'backSideCapture',
  backSideVerify = 'backSideVerify',
  backSideFailed = 'backSideFailed',
  rightSidePreCapture = 'rightSidePreCapture',
  rightSideCapture = 'rightSideCapture',
  rightSideVerify = 'rightSideVerify',
  rightSideFailed = 'rightSideFailed',
  dashboardPreCapture = 'dashboardPreCapture',
  dashboardCapture = 'dashboardCapture',
  dashboardVerify = 'dashboardVerify',
  dashboardFailed = 'dashboardFailed',
  interiorPreCapture = 'interiorPreCapture',
  interiorCapture = 'interiorCapture',
  interiorVerify = 'interiorVerify',
  interiorFailed = 'interiorFailed',
  verificationLoading = 'verificationLoading',
  verificationCompleted = 'verificationCompleted',
}

export enum PageViewContent {
  firstAutoPage = 'firstAutoPage',
  secondAutoPage = 'secondAutoPage',
  thirdAutoPage = 'thirdAutoPage',
  fourthAutoPage = 'fourthAutoPage',
  displayPlainColor = 'displayPlainColor',
  displayGreenColor = 'displayGreenColor',
  displayTextAndList = 'displayTextAndList',
}

export enum SideImage {
  front = 'firstAutofrontPage',
  chassisNumber = 'chassisNumber',
  left = 'left',
  back = 'back',
  right = 'right',
  dashboard = 'dashboard',
  interior = 'interior',
  laptopFront = 'laptopFront',
  phoneFrontImg = 'phoneFrontImg',
  laptopBackImg = 'laptopBackImg',
  phoneBackImg = 'phoneBackImg',
  laptopOtherImg = 'laptopOtherImg',
  phoneSideImg = 'phoneSideImg',
  laptopSettingsImg = 'laptopSettingsImg',
  phoneSettingsImg = 'phoneSettingsImg',
  leftSample = 'leftSample',
}

export enum PaymentOption {
  wallet = 'wallet',
  gateway = 'gateway',
}

export class PaymentOptionHelper {
  static getName(option: PaymentOption): string {
    switch (option) {
      case PaymentOption.wallet:
        return 'wallet';
      case PaymentOption.gateway:
        return 'gateway';
      default:
        return '';
    }
  }
}

export enum PaymentMethod {
  transfer = 'transfer',
  ussd = 'ussd',
}

export class PaymentMethodHelper {
  static getName(method: PaymentMethod): string {
    switch (method) {
      case PaymentMethod.transfer:
        return 'bank transfer';
      case PaymentMethod.ussd:
        return 'ussd';
      default:
        return '';
    }
  }
}

export enum ToastStatus {
  success = 'success',
  pending = 'pending',
  failed = 'failed',
}

export enum SdkResponseStatus {
  success = 'success',
  failed = 'failed',
}

export enum TransactionType {
  continuePurchase = 'continuePurchase',
  purchase = 'purchase',
  inspection = 'inspection',
  claim = 'claim',
}

export enum SdkLayout {
  grid = 'grid',
  list = 'list',
}

export enum InspectionType {
  vehicle = 'vehicle',
  gadget = 'gadget',
  home = 'home',
}

export enum GadgetType {
  phone = 'phone',
  laptop = 'laptop',
  other = 'other',
}

export enum ProductCategory {
  package = 'package',
  gadget = 'gadget',
  life = 'life',
  creditLife = 'creditLife',
  auto = 'auto',
  health = 'health',
  content = 'content',
  travel = 'travel',
}

export enum ClaimStatus {
  pending = 'pending',
  inspectionSubmitted = 'inspectionSubmitted',
  approved = 'approved',
  declined = 'declined',
  repairEstimateSubmitted = 'repairEstimateSubmitted',
  offerSent = 'offerSent',
  offerAccepted = 'offerAccepted',
  offerRejected = 'offerRejected',
  paid = 'paid',
  settled = 'settled',
}

export enum ClaimType {
  gadget = 'gadget',
  auto = 'auto',
  travel = 'travel',
}

export enum ClaimSubmissionStep {
  claimLodged = 'claimLodged',
  repairEstimate = 'repairEstimate',
  offerAccepted = 'offerAccepted',
  offerRejected = 'offerRejected',
  thirdPartyClaimLodged = 'thirdPartyClaimLodged',
  thirdPartyInspected = 'thirdPartyInspected',
  travelDocSubmitted = 'travelDocSubmitted',
  submitAutoPoliceReport = 'submitAutoPoliceReport',
  submitGadgetPoliceReport = 'submitGadgetPoliceReport',
}

export enum TravelIncidentType {
  medicalExpenses = 'medicalExpenses',
  lossOfTravelDocument = 'lossOfTravelDocument',
  baggageLoss = 'baggageLoss',
  baggageDelay = 'baggageDelay',
  personalMoneyLoss = 'personalMoneyLoss',
  missedDepartureOrConnection = 'missedDepartureOrConnection',
  travelDelay = 'travelDelay',
  legalExpensesAndBailBond = 'legalExpensesAndBailBond',
}

// Utility functions for enums
export function getClaimStatusDescription(type: ClaimStatus): string {
  switch (type) {
    case ClaimStatus.pending:
      return 'Pending';
    case ClaimStatus.inspectionSubmitted:
      return 'Inspection Submitted';
    case ClaimStatus.approved:
      return 'Approved';
    case ClaimStatus.declined:
      return 'Declined';
    case ClaimStatus.repairEstimateSubmitted:
      return 'Repair Estimate Submitted';
    case ClaimStatus.offerSent:
      return 'Offer Sent';
    case ClaimStatus.offerAccepted:
      return 'Offer Accepted';
    case ClaimStatus.offerRejected:
      return 'Offer Rejected';
    case ClaimStatus.paid:
      return 'Paid';
    case ClaimStatus.settled:
      return 'Settled';
    default:
      return 'Unknown';
  }
}

export function getProductCategoryText(category: ProductCategory): string {
  switch (category) {
    case ProductCategory.package:
      return 'package';
    case ProductCategory.gadget:
      return 'gadget';
    case ProductCategory.life:
      return 'life';
    default:
      return 'unknown';
  }
}

export function getGadgetType(gadgetType: string): GadgetType {
  switch (gadgetType) {
    case 'laptop':
      return GadgetType.laptop;
    case 'phone':
      return GadgetType.phone;
    default:
      return GadgetType.other;
  }
}

// Function to get the verification stage based on the step
export function getVerificationStage(step: any) {
  switch (step) {
    // case CarVerificationStep.frontSidePreCapture:
    // case CarVerificationStep.chasisNumberPreCapture:
    // case CarVerificationStep.leftSidePreCapture:
    // case CarVerificationStep.rightSidePreCapture:
    // case CarVerificationStep.dashboardPreCapture:

    case CarVerificationStep.frontSidePreCapture:
    case CarVerificationStep.chasisNumberPreCapture:
    case CarVerificationStep.leftSidePreCapture:
    case CarVerificationStep.backSidePreCapture:
    case CarVerificationStep.rightSidePreCapture:
    case CarVerificationStep.dashboardPreCapture:
    case CarVerificationStep.interiorPreCapture:
    case PhoneVerificationStep.phoneFrontPreCapture:
    case PhoneVerificationStep.phoneBackPreCapture:
    case PhoneVerificationStep.phoneSettingsPreCapture:
    case PhoneVerificationStep.phoneSidePreCapture:
      return VerificationStage.preCapture;

    // case CarVerificationStep.frontSideCapture:
    // case CarVerificationStep.chasisNumberCapture:
    // case CarVerificationStep.leftSideCapture:
    // case CarVerificationStep.rightSideCapture:
    // case CarVerificationStep.dashboardCapture:

    case CarVerificationStep.frontSideCapture:
    case CarVerificationStep.chasisNumberCapture:
    case CarVerificationStep.leftSideCapture:
    case CarVerificationStep.backSideCapture:
    case CarVerificationStep.rightSideCapture:
    case CarVerificationStep.dashboardCapture:
    case CarVerificationStep.interiorCapture:
    case PhoneVerificationStep.phoneFrontCapture:
    case PhoneVerificationStep.phoneBackCapture:
    case PhoneVerificationStep.phoneSettingsCapture:
    case PhoneVerificationStep.phoneSideCapture:
      return VerificationStage.capture;

    case CarVerificationStep.frontSideVerify:
    case CarVerificationStep.chasisNumberVerify:
    case CarVerificationStep.leftSideVerify:
    case CarVerificationStep.backSideVerify:
    case CarVerificationStep.rightSideVerify:
    case CarVerificationStep.dashboardVerify:
    case CarVerificationStep.interiorVerify:
    case PhoneVerificationStep.phoneFrontVerify:
    case PhoneVerificationStep.phoneBackVerify:
    case PhoneVerificationStep.phoneSettingsVerify:
    case PhoneVerificationStep.phoneSideVerify:
      return VerificationStage.verify;

    case CarVerificationStep.frontSideFailed:
    case CarVerificationStep.chasisNumberFailed:
    case CarVerificationStep.leftSideFailed:
    case CarVerificationStep.backSideFailed:
    case CarVerificationStep.rightSideFailed:
    case CarVerificationStep.dashboardFailed:
    case CarVerificationStep.interiorFailed:
      return VerificationStage.failed;

    case PhoneVerificationStep.verificationLoading:
      return VerificationStage.loading;

    default:
      return VerificationStage.unknown;
  }
}
