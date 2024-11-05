import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints
import mime from 'mime'; // For getting mime type of files
import GenericResponse from '../api/GenericResponse';
import { type FileData } from '../../screens/purchase/form/components/CustomImagePicker';
import { ClaimType } from '../../utils/enums';
import { type GlobalStore } from '../../store/globalStore';
import type {
  AutoInspectionData,
  GadgetClaimInspectionData,
  GadgetInspectionData,
} from './inspection_repo';
import globalObject from '../../store/globalObject';
// Assuming a generic response structure

// const global = useGlobalStore((state: GlobalStore) => state);

interface IClaimRepository {
  submitVehicleClaim(data: VehicleClaimData): Promise<GenericResponse>;
  submitGadgetClaim(data: GadgetClaimData): Promise<GenericResponse>;
  submitTravelClaim(data: TravelClaimData): Promise<GenericResponse>;
  submitAutoClaimInspection(
    data: AutoClaimInspectionData
  ): Promise<GenericResponse>;
  verifyClaimImageAI(data: ClaimImageData): Promise<GenericResponse>;
  getClaimsById(policyId: string): Promise<GenericResponse>;
  getPolicyInfo(email: string, policyNumber: string): Promise<GenericResponse>;
  submitVehicleClaimEstimate(
    data: VehicleClaimEstimateData
  ): Promise<GenericResponse>;
  submitThirdPartyClaim(data: ThirdPartyClaimData): Promise<GenericResponse>;
  submitTravelClaimMedicalDocumentation(
    data: TravelClaimMedicalDocData
  ): Promise<GenericResponse>;
  getBankList(): Promise<GenericResponse>;
  verifyBankAccount(
    accountNumber: VerifyBankAccountData
  ): Promise<GenericResponse>;
  acceptClaimOffer(data: ClaimOfferData): Promise<GenericResponse>;
  rejectClaimOffer(data: ClaimRejectData): Promise<GenericResponse>;

  getPolicyById(policyId: string): Promise<GenericResponse>;
  submitThirdPartyClaim(
    data: SubmitThirdPartyClaimData
  ): Promise<GenericResponse>;
  submitThirdPartyClaimInspection(
    data: SubmitThirdPartyClaimInspectionData
  ): Promise<GenericResponse>;
  submitTravelClaimMedicalDocumentation(
    data: SubmitTravelClaimMedicalData
  ): Promise<GenericResponse>;
  submitTravelClaimLossDocumentation(
    data: SubmitTravelClaimLossData
  ): Promise<GenericResponse>;
  submitTravelClaimBaggageLossDocumentation(
    data: SubmitTravelClaimBaggageLossData
  ): Promise<GenericResponse>;
  submitTravelClaimBaggageDelayDocumentation(
    data: SubmitTravelClaimBaggageDelayData
  ): Promise<GenericResponse>;
  submitTravelClaimPersonalMoneyDocumentation(
    data: SubmitTravelClaimPersonalMoneyData
  ): Promise<GenericResponse>;
  submitTravelClaimMissedDepartureDocumentation(
    data: SubmitTravelClaimMissedDepartureData
  ): Promise<GenericResponse>;
  submitTravelClaimFLightDelayDocumentation(
    data: SubmitTravelClaimFlightDelayData
  ): Promise<GenericResponse>;
  submitTravelClaimLegalExpenseDocumentation(
    data: SubmitTravelClaimLegalExpenseData
  ): Promise<GenericResponse>;
  submitVehiclePoliceReport(
    data: SubmitVehiclePoliceReportData
  ): Promise<GenericResponse>;
  submitGadgetClaimEstimate(
    data: SubmitGadgetClaimEstimateData
  ): Promise<GenericResponse>;
  getIncidentType(claimType: ClaimType): Promise<GenericResponse>;
}

const apiService = new ApiService('https://staging.api.mycover.ai/v1');
class ClaimRepository implements IClaimRepository {
  async submitVehicleClaim(data: VehicleClaimData): Promise<GenericResponse> {
    const requestData = {
      claim_type: data.claimType,
      description: data.description,
      incident_date: data.incidentDate,
      incident_location: data.incidentLocation,
      incident_time: data.incidentTime,
      incident_type: data.incidentType,
      is_third_party: data.isThirdParty,
      loss_type: data.lossType,
      // third_party_loss_type: data.thirdPartyLossType,
      // third_party_phone_number: data.thirdPartyPhoneNumber,
      // third_party_full_name: data.thirdPartyFullName,
      policy_id: data.policyId,
      progress: 'submission',
    };
    const res = await apiService.post(
      ApiEndpoints.submitVehicleClaim,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async submitGadgetClaim(data: GadgetClaimData): Promise<GenericResponse> {
    const requestData = {
      address: data.incidentLocation,
      date: data.incidentDate,
      description: data.description,
      incident_type: data.incidentType,
      payment_receipt: data.paymentReceiptUrl,
      policy_number: data.policyNumber,
      progress: 'submission',
      time: data.incidentTime,
    };
    const res = await apiService.post(
      ApiEndpoints.submitGadgetClaim,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async submitTravelClaim(data: TravelClaimData): Promise<GenericResponse> {
    const requestData = {
      address: data.incidentLocation,
      boarding_pass: data.boardingPassUrl,
      booking_invoice: data.bookingInvoiceUrl,
      date: data.incidentDate,
      description: data.description,
      incident_type: data.incidentType,
      policy_number: data.policyNumber,
      progress: 'submission',
      time: data.incidentTime,
    };
    const res = await apiService.post(
      ApiEndpoints.submitTravelClaim,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }
  async submitTravelClaimMedicalDocumentation(
    data: TravelClaimMedicalDocData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      medical_certificate: data.medicalCertificate,
      incident_type: globalObject.claim?.travelClaimMeta.incident_type,
      medical_receipt: data.medicalReceipt,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async verifyClaimImageAI(data: ClaimImageData): Promise<GenericResponse> {
    const formData = new FormData();
    formData.append('file', {
      uri: data.file.uri,
      name: data.file.name,
      type: mime.getType(data.file.name),
    });
    formData.append('action', data.action);
    formData.append('vehicle_section', data.vehicleSection);
    if (data.claimId) formData.append('claim_id', data.claimId);
    if (data.policyId) formData.append('policy_id', data.policyId);
    if (data.bypass) formData.append('bypass', 'true');

    const res = await apiService.post(
      ApiEndpoints.verifyClaimImageAI,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        useToken: true,
      }
    );
    return new GenericResponse(res);
  }

  async getClaimsById(policyId: string): Promise<GenericResponse> {
    const res = await apiService.get(
      `${ApiEndpoints.getClaimsById}/${policyId}`,

      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async getPolicyInfo(
    email: string,
    policyNumber: string
  ): Promise<GenericResponse> {
    const requestData = {
      email: email,
      policy_number: policyNumber,
    };

    const res = await apiService.post(ApiEndpoints.getPolicyInfo, requestData, {
      useToken: true,
    });
    return new GenericResponse(res);
  }

  async submitVehicleClaimEstimate(
    data: VehicleClaimEstimateData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      estimate_amount: data.estimateAmount,
      claim_invoice_url: data.claimInvoiceUrl,
      progress: 'repair_estimate',
    };
    const res = await apiService.post(
      ApiEndpoints.submitVehicleClaimEstimate,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async submitThirdPartyClaim(
    data: ThirdPartyClaimData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_type: 'Vehicle',
      description: data.description,
      incident_date: data.incidentDate,
      incident_location: data.incidentLocation,
      incident_time: data.incidentTime,
      incident_type: 'Accidental damage',
      is_third_party: true,
      loss_type: ['Collision'],
      policy_id: data.policyId,
      is_third_party_insured: data.isThirdPartyInsured,
      progress: 'submission',
      third_party_email: data.thirdPartyEmail,
      third_party_full_name: data.thirdPartyFullName,
      third_party_policy_number: data.thirdPartyPolicyNumber,
      third_party_loss_type: data.thirdPartyLossType,
      third_party_phone_number: data.thirdPartyPhoneNumber,
      third_party_insurance_provider: data.thirdPartyInsuranceProvider,
    };
    const res = await apiService.post(
      ApiEndpoints.submitVehicleClaim,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async getBankList(): Promise<GenericResponse> {
    const res = await apiService.get(ApiEndpoints.getBankList, {
      useToken: true,
    });
    return new GenericResponse(res);
  }

  async verifyBankAccount(
    data: VerifyBankAccountData
  ): Promise<GenericResponse> {
    const requestData = {
      account_number: data.accountNumber,
      bank_code: data.bankCode,
    };
    const res = await apiService.post(
      ApiEndpoints.verifyBankAccount,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async acceptClaimOffer(data: ClaimOfferData): Promise<GenericResponse> {
    const requestData = {
      account_name: data.accountName,
      account_number: data.accountNumber,
      bank_code: data.bankCode,
      bank_name: data.bankName,
      claim_id: data.claimId,
      claim_payment_method: 'bank transfer',
      customer_id: data.customerId,
      provider_id: data.providerId,
    };
    const res = await apiService.put(
      ApiEndpoints.acceptClaimOffer,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async rejectClaimOffer(data: ClaimRejectData): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      comment: data.comment,
      comment_type: 'Offer',
      customer_id: data.customerId,
      provider_id: data.providerId,
    };
    const res = await apiService.put(
      ApiEndpoints.rejectClaimOffer,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async getPolicyById(policyId: string): Promise<GenericResponse> {
    const query = `/${policyId}`;
    const res = await apiService.get(`${ApiEndpoints.getPolicyById}${query}`, {
      useToken: true,
    });
    return new GenericResponse(res);
  }

  async submitAutoClaimInspection(
    data: AutoClaimInspectionData
  ): Promise<GenericResponse> {
    const requestData = {
      action: 'inspection',
      policy_id: data.policyId,
      timestamp: data.timeStamp,
      geolocation: data.address ? data.address : 'home',
      inspection_device_type: data.inspectionType,
      inspection_duration: 'string',

      video_url: data.videoUrl,
      progress: 'inspection',

      bypass: 'true',
      claim_id: data.claimId,
      claim_type: data.claimType,

      description: globalObject.claim?.claimDescription,
      incident_date: globalObject.claim?.vehicleClaimMeta.date,
      incident_location: globalObject.claim?.vehicleClaimMeta.address,
      incident_time: globalObject.claim?.vehicleClaimMeta.time,
      incident_type: globalObject.claim?.vehicleClaimMeta.incident_type,
      is_third_party: globalObject.claim?.vehicleClaimMeta.is_third_party,
      loss_type: globalObject.claim?.vehicleClaimMeta.loss_type,
      third_party_loss_type:
        globalObject.claim?.vehicleClaimMeta.third_party_loss_type,
      third_party_phone_number:
        globalObject.claim?.vehicleClaimMeta.third_party_phone_number,
      third_party_full_name: 'FUhad Aminu',
    };
    const res = await apiService.post(
      ApiEndpoints.submitAutoClaims,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async submitAutoInspection(
    data: AutoInspectionData
  ): Promise<GenericResponse> {
    const requestData = {
      reference: null,
      action: 'inspection',

      policy_id: data.policyId,

      timestamp: data.timeStamp || '30',

      geolocation: data.address ? data.address : 'home',

      inspection_device_type: data.inspectionType,

      inspection_duration: 'string',
      video_url: data.videoUrl,
    };

    const res = await apiService.post(
      ApiEndpoints.submitAutoInspection,
      requestData,
      { useToken: true }
      // {
      //   headers: {'Content-Type': 'multipart/form-data'},
      //   useToken: true,
      // },
    );
    return new GenericResponse(res);
  }

  async submitGadgetInspection(
    data: GadgetInspectionData
  ): Promise<GenericResponse> {
    const requestData = {
      reference: globalObject.reference,
      policy_id: data.policyId,
      front_image: data.frontImage,
      back_image: data.backImage,
      side_image: data.sideImage,
      serial_number_image: data.serialNumberImage,
      action: 'inspection',
      timestamp: data.timeStamp || '30',
      geolocation: data.address ? data.address : 'home',

      inspection_device_type: data.inspectionType,

      inspection_duration: 'string',
      video_url: data.videoUrl,
    };

    const res = await apiService.post(
      ApiEndpoints.submitGadgetInspection,
      requestData,
      { useToken: true }
      // {
      //   headers: {'Content-Type': 'multipart/form-data'},
      //   useToken: true,
      // },
    );

    return new GenericResponse(res);
  }

  async submitGadgetClaimInspection(
    data: GadgetClaimInspectionData
  ): Promise<GenericResponse> {
    const requestData = {
      reference: globalObject.reference,
      policy_id: data.policyId,
      front_image: data.frontImage,
      back_image: data.backImage,
      side_image: data.sideImage,
      serial_number_image: data.serialNumberImage,
      progress: 'inspection',
      timestamp: data.timeStamp || '30',
      geolocation: data.address ? data.address : 'home',
      policy_number: data.policyNumber,
      claim_id: data.claimId,

      inspection_device_type: data.inspectionType,

      inspection_duration: 'string',
      video_url: data.videoUrl,

      // police_report: policeReportUrl,
    };

    const res = await apiService.post(
      ApiEndpoints.submitGadgetClaims,
      requestData,
      { useToken: true }
      // {
      //   headers: {'Content-Type': 'multipart/form-data'},
      //   useToken: true,
      // },
    );

    return new GenericResponse(res);
  }

  // async submitThirdPartyClaim(data: SubmitThirdPartyClaimData): Promise<GenericResponse> {
  //   const requestData = {
  //     claim_type: "Vehicle",
  //     description: data.description,
  //     incident_date: data.incidentDate,
  //     incident_location: data.incidentLocation,
  //     incident_time: data.incidentTime,
  //     incident_type: "Accidental damage",
  //     is_third_party: true,
  //     loss_type: ["Collision"],
  //     policy_id: data.policyId,
  //     is_third_party_insured: data.isThirdPartyInsured,
  //     progress: "submission",
  //     third_party_email: data.thirdPartyEmail,
  //     third_party_full_name: data.thirdPartyFullName,
  //     third_party_policy_number: data.thirdPartyPolicyNumber,
  //     third_party_loss_type: data.thirdPartyLossType,
  //     third_party_phone_number: data.thirdPartyPhoneNumber,
  //     third_party_insurance_provider: data.thirdPartyInsuranceProvider,
  //   };

  //   const res = await apiService.post(ApiEndpoints.submitVehicleClaim, requestData, { useToken: true });
  //   return new GenericResponse(res);
  // }

  async submitThirdPartyClaimInspection(
    data: SubmitThirdPartyClaimInspectionData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      evidence_one: data.evidenceOne,
      evidence_two: data.evidenceTwo,
      evidence_three: data.evidenceThree,
      evidence_four: data.evidenceFour,
      progress: 'third_party_inspection',
    };

    const res = await apiService.post(
      ApiEndpoints.submitThirdPartyAutoClaimInspection,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  // async submitTravelClaimMedicalDocumentation(data: SubmitTravelClaimMedicalData): Promise<GenericResponse> {
  //   const requestData = {
  //     amount: data.amount,
  //     claim_id: data.claimId,
  //     incident_type: global.claim?.travelClaimMeta?.incident_type,
  //     medical_certificate: data.medicalCertificate,
  //     medical_receipt: data.medicalReceipt,
  //     progress: "documentation",
  //   };

  //   const res = await apiService.post(ApiEndpoints.submitTravelClaimDocumentation, requestData, {
  //     useToken: true,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   return new GenericResponse(res);
  // }

  async submitTravelClaimLossDocumentation(
    data: SubmitTravelClaimLossData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      incident_type: globalObject.claim?.travelClaimMeta?.incident_type,
      consulate_confirmation_report: data.consulateConfirmationReport,
      police_report: data.policeReport,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimBaggageLossDocumentation(
    data: SubmitTravelClaimBaggageLossData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      incident_type: globalObject.claim?.travelClaimMeta?.incident_type,
      purchase_receipt: data.purchaseReceipt,
      police_report: data.policeReport,
      repair_estimate: data.repairEstimate,
      other_report: data.otherReport,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimBaggageDelayDocumentation(
    data: SubmitTravelClaimBaggageDelayData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      incident_type: globalObject.claim?.travelClaimMeta?.incident_type,
      property_irregularity_report: data.propertyIrregularityReport,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimPersonalMoneyDocumentation(
    data: SubmitTravelClaimPersonalMoneyData
  ): Promise<GenericResponse> {
    const requestData = {
      amount: data.amount,
      claim_id: data.claimId,
      incident_type: globalObject.claim?.travelClaimMeta?.incident_type,
      debit_receipt: data.debitReceipt,
      other_report: data.otherReport,
      police_report: data.policeReport,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimMissedDepartureDocumentation(
    data: SubmitTravelClaimMissedDepartureData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      incident_type: data.globalStore.claim?.travelClaimMeta?.incident_type,
      transporter_report: data.transporterReport,
      other_report: data.otherReport,
      missed_departure_reason: data.missedDepartureReason,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimFLightDelayDocumentation(
    data: SubmitTravelClaimFlightDelayData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      incident_type: data.globalStore.claim?.travelClaimMeta?.incident_type,
      delay_confirmation: data.delayConfirmation,
      departure_time: data.departureTime,
      travel_delay_reason: data.travelDelayReason,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitTravelClaimLegalExpenseDocumentation(
    data: SubmitTravelClaimLegalExpenseData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      incident_type: data.globalStore.claim?.travelClaimMeta?.incident_type,
      event_description: data.eventDescription,
      witness_details: data.witnessDetails,
      written_summon: data.writtenSummon,
      progress: 'documentation',
    };

    const res = await apiService.post(
      ApiEndpoints.submitTravelClaimDocumentation,
      requestData,
      {
        useToken: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return new GenericResponse(res);
  }

  async submitVehiclePoliceReport(
    data: SubmitVehiclePoliceReportData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      incident_type: 'Theft',
      police_report: data.policeReportUrl,
      progress: 'inspection',
      policy_number: data.policyNumber,
    };

    const res = await apiService.post(
      data.claimType === ClaimType.gadget
        ? ApiEndpoints.submitGadgetClaims
        : ApiEndpoints.submitAutoClaims,
      requestData,
      { useToken: true }
    );

    return new GenericResponse(res);
  }

  async submitGadgetClaimEstimate(
    data: SubmitGadgetClaimEstimateData
  ): Promise<GenericResponse> {
    const requestData = {
      claim_id: data.claimId,
      estimate_amount: data.estimateAmount,
      claim_invoice_url: data.claimInvoiceUrl,
      policy_number: data.policyNumber,
    };

    const res = await apiService.post(
      ApiEndpoints.submitGadgetClaimEstimate,
      requestData,
      { useToken: true }
    );
    return new GenericResponse(res);
  }

  async getIncidentType(claimType: ClaimType): Promise<GenericResponse> {
    const res = await apiService.get(
      claimType == ClaimType.travel
        ? ApiEndpoints.getTravelClaimIncidentType
        : claimType == ClaimType.gadget
          ? ApiEndpoints.getGadgetClaimIncidentType
          : ApiEndpoints.getVehicleClaimIncidentType,
      { claimType },
      { useToken: true }
    );
    return new GenericResponse(res);
  }
}

export default ClaimRepository;

// Define types for input data for each method
export interface VehicleClaimData {
  policyId: string;
  claimType: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentType: string;
  isThirdParty: boolean;
  lossType: string[];
  // thirdPartyLossType: string[];
  // thirdPartyPhoneNumber: string;
  // thirdPartyFullName: string;
}

// export interface ThirdPartyClaimData {
//   policyId: string;
//   claimType: string;
//   description: string;
//   incidentDate: string;
//   incidentTime: string;
//   incidentLocation: string;
//   incidentType: string;
//   isThirdParty: boolean;
//   lossType: string[];
//   // thirdPartyLossType: string[];
//   // thirdPartyPhoneNumber: string;
//   // thirdPartyFullName: string;
// }

interface GadgetClaimData {
  policyNumber: string;
  paymentReceiptUrl: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentType: string;
}

export interface InitialGadgetClaimData {
  policyNumber: string;
  paymentReceipt: FileData;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentType: string;
}

interface TravelClaimData {
  policyNumber: string;
  boardingPassUrl: string;
  bookingInvoiceUrl: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentType: string;
}
export interface InitialTravelClaimData {
  policyNumber: string;
  boardingPass: FileData;
  bookingInvoice: FileData;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentType: string;
}

interface AutoClaimInspectionData {
  vehicleImages: Record<string, FileData>;
  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  inspectionType?: string;
  timeStamp?: string;
  policyId?: string;
  claimId?: string;
  claimType?: string;
}

interface ClaimImageData {
  file: FileData;
  action: string;
  vehicleSection: string;
  claimId?: string;
  policyId?: string;
  bypass?: boolean;
}

interface VehicleClaimEstimateData {
  claimId: string;
  estimateAmount: number;
  claimInvoiceUrl: string;
}

export interface ThirdPartyClaimData {
  policyId: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  thirdPartyPhoneNumber: string;
  thirdPartyInsuranceProvider: string;
  thirdPartyFullName: string;
  thirdPartyPolicyNumber: string;
  thirdPartyEmail: string;
  isThirdPartyInsured: boolean;
  thirdPartyLossType: string[];
}

interface ClaimOfferData {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  claimId: string;
  customerId: string;
  providerId: string;
}

interface VerifyBankAccountData {
  accountNumber: string;
  bankCode: string;
}

interface ClaimRejectData {
  comment: string;
  claimId: string;
  customerId: string;
  providerId: string;
}

interface TravelClaimMedicalDocData {
  amount: number;
  claimId?: string;
  medicalCertificate: string;
  medicalReceipt: string;
}

// Interfaces for data payloads
export interface SubmitThirdPartyClaimData {
  policyId: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  thirdPartyPhoneNumber: string;
  thirdPartyInsuranceProvider: string;
  thirdPartyFullName: string;
  thirdPartyPolicyNumber: string;
  thirdPartyEmail: string;
  isThirdPartyInsured: boolean;
  thirdPartyLossType: string[];
}

export interface SubmitThirdPartyClaimInspectionData {
  amount: number;
  claimId: string;
  evidenceOne: string;
  evidenceTwo: string;
  evidenceThree: string;
  evidenceFour: string;
}

export interface SubmitTravelClaimMedicalData {
  amount: number;
  claimId?: string;
  medicalCertificate: string;
  medicalReceipt: string;
}

export interface SubmitTravelClaimLossData {
  amount: number;
  claimId?: string;
  consulateConfirmationReport: string;
  policeReport: string;
}

export interface SubmitTravelClaimBaggageLossData {
  amount: number;
  claimId?: string;
  purchaseReceipt: string;
  policeReport: string;
  repairEstimate: string;
  otherReport: string;
}

export interface SubmitTravelClaimBaggageDelayData {
  amount: number;
  claimId?: string;
  propertyIrregularityReport: string;
}

export interface SubmitTravelClaimPersonalMoneyData {
  amount: number;
  claimId?: string;
  debitReceipt: string;
  otherReport: string;
  policeReport: string;
}

export interface SubmitTravelClaimMissedDepartureData {
  claimId?: string;
  missedDepartureReason: string;
  otherReport: string;
  transporterReport: string;
  globalStore: GlobalStore;
}

export interface SubmitTravelClaimFlightDelayData {
  claimId?: string;
  delayConfirmation: string;
  departureTime: string;
  travelDelayReason: string;
  globalStore: GlobalStore;
}

export interface SubmitTravelClaimLegalExpenseData {
  claimId?: string;
  eventDescription: string;
  witnessDetails: string;
  writtenSummon: string;
  globalStore: GlobalStore;
}

export interface SubmitVehiclePoliceReportData {
  claimId: string;
  policeReportUrl: string;
  policyNumber: string;
  claimType: ClaimType;
}

export interface SubmitGadgetClaimEstimateData {
  claimId: string;
  estimateAmount: number;
  claimInvoiceUrl: string;
  policyNumber: string;
}
