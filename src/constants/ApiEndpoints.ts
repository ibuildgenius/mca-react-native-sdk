export class ApiEndpoints {
  // SDK Initialization
  static readonly initialiseSdk = 'sdk/initialize';
  static readonly getInsuranceProviders = 'sdk/insurance-providers';
  static readonly getProductDetails = 'sdk/products-with-form-fields';
  static readonly fetchProductPrice = 'sdk/price';
  static readonly initiatePurchase = 'sdk/initiate-purchase';
  static readonly getUssdProviders = 'sdk/ussd-providers';
  static readonly verifyPayment = 'sdk/verify-transaction';
  static readonly getPurchaseInfo = 'sdk/purchase-info';
  static readonly completePurchase = 'sdk/complete-purchase';
  static readonly uploadFile = 'sdk/upload-file';

  // Inspection Endpoints
  static readonly verifyImageAI = 'sdk/inspections-ai/vehicle';
  static readonly submitAutoInspection = 'sdk/submit-inspections-ai/vehicle';
  static readonly submitGadgetInspection = 'sdk/submit-gadget-inspection';
  static readonly submitAutoClaims = 'sdk/submit-vehicle-claim-inspection';
  static readonly submitGadgetClaims = 'sdk/submit-gadget-claim-inspection';

  // Claims Endpoints
  static readonly submitVehicleClaim = 'sdk/submit-vehicle-claim';
  static readonly submitGadgetClaim = 'sdk/submit-gadget-claim';
  static readonly submitTravelClaim = 'sdk/submit-travel-claim';
  static readonly submitTravelClaimDocumentation =
    'sdk/submit-travel-claim-documentation';
  static readonly getClaimsById = 'sdk/fetch-claim-with-policy-id';
  static readonly getTravelClaimIncidentType =
    'sdk/get-travel-claim-incident-type';
  static readonly getGadgetClaimIncidentType =
    'sdk/get-gadget-claim-incident-type';
  static readonly getVehicleClaimIncidentType =
    'sdk/get-vehicle-claim-incident-type';
  static readonly getPolicyInfo = 'sdk/fetch-policy-info';
  static readonly verifyClaimImageAI = 'sdk/verify-claim-auto-images';
  static readonly submitVehicleClaimEstimate =
    'sdk/submit-vehicle-claim-estimate';
  static readonly submitGadgetClaimEstimate =
    'sdk/submit-gadget-claim-estimate';
  static readonly getBankList = 'sdk/list-banks';
  static readonly verifyBankAccount = 'sdk/verify-bank-account';
  static readonly acceptClaimOffer = 'sdk/accept-claim-offer';
  static readonly rejectClaimOffer = 'sdk/reject-claim-offer';
  static readonly submitThirdPartyAutoClaimInspection =
    'sdk/submit-third-party-auto-claim-inspection';

  // Policy Endpoints
  static readonly getPolicyById = 'policies';
}

export default ApiEndpoints;
