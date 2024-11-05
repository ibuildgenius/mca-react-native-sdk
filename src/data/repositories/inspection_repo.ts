import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints
// Assuming a generic response structure
import GenericResponse from '../api/GenericResponse';
import { type FileData } from '../../screens/purchase/form/components/CustomImagePicker';
import globalObject from '../../store/globalObject';
import { TransactionType } from '../../utils/enums';

interface IInspectionRepository {
  verifyImageAI(data: VerifyImageAIData): Promise<GenericResponse>;
  submitAutoInspection(data: AutoInspectionData): Promise<GenericResponse>;
  submitGadgetInspection(data: GadgetInspectionData): Promise<GenericResponse>;
  submitGadgetClaimInspection(
    data: GadgetClaimInspectionData
  ): Promise<GenericResponse>;
}

const apiService = new ApiService('https://staging.api.mycover.ai/v1', true);
class InspectionRepository implements IInspectionRepository {
  async verifyImageAI(data: VerifyImageAIData): Promise<GenericResponse> {
    const formData = new FormData();
    formData.append('file', {
      uri: data.file.uri,
      name: data.file.uri.split('/').pop(),
      type: 'image/jpeg',
    });
    formData.append('action', data.action);
    formData.append('vehicle_section', data.vehicleSection);
    formData.append('bypass', data.bypass);
    if (data.claimId) formData.append('claim_id', data.claimId);
    if (data.policyId) formData.append('policy_id', data.policyId);
    // if (data.bypass) formData.append('bypass', 'true');

    const res = await apiService.postForm(
      globalObject.transactionType == TransactionType.claim
        ? ApiEndpoints.verifyClaimImageAI
        : ApiEndpoints.verifyImageAI,
      formData

      //   {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   useToken: true,
      // }
    );
    return new GenericResponse(res);
  }

  // type: mime.getType(data.file.name),
  async submitAutoInspection(
    data: AutoInspectionData
  ): Promise<GenericResponse> {
    const formData = new FormData();
    formData.append('reference', data.reference || '');
    formData.append('policy_id', data.policyId || '');
    formData.append('timestamp', data.timeStamp || '');
    formData.append('geolocation', data.address);
    formData.append('inspection_device_type', data.inspectionType);
    formData.append('video_url', data.videoUrl);

    Object.keys(data.vehicleImages).forEach((key) => {
      const imageFile = data.vehicleImages[key];
      formData.append(key, {
        uri: imageFile?.uri,
        name: imageFile?.name,
        type: 'image/jpeg',
      });
    });

    const res = await apiService.post(
      ApiEndpoints.submitAutoInspection,
      formData
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
    const formData = new FormData();
    formData.append('reference', data.reference || '');
    formData.append('policy_id', data.policyId || '');
    formData.append('front_image', data.frontImage);
    formData.append('back_image', data.backImage);
    formData.append('side_image', data.sideImage);
    formData.append('serial_number_image', data.serialNumberImage);
    formData.append('geolocation', data.address);
    formData.append('inspection_device_type', data.inspectionType || '');
    formData.append('video_url', data.videoUrl);

    const res = await apiService.post(
      ApiEndpoints.submitGadgetInspection,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        useToken: true,
      }
    );
    return new GenericResponse(res);
  }

  async submitGadgetClaimInspection(
    data: GadgetClaimInspectionData
  ): Promise<GenericResponse> {
    const formData = new FormData();
    formData.append('policy_number', data.policyNumber);
    formData.append('front_image', data.frontImage);
    formData.append('back_image', data.backImage);
    formData.append('side_image', data.sideImage);
    formData.append('serial_number_image', data.serialNumberImage);
    formData.append('geolocation', data.address);
    formData.append('video_url', data.videoUrl);
    formData.append('video_url', data.claimId);
    formData.append('video_url', data.policyNumber);
    // if (data.policeReportUrl)
    //   formData.append('police_report', data.policeReportUrl);
    if (data.timeStamp) formData.append('timestamp', data.timeStamp);
    if (data.claimId) formData.append('claim_id', data.claimId);

    const res = await apiService.post(
      ApiEndpoints.submitGadgetClaims,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        useToken: true,
      }
    );
    return new GenericResponse(res);
  }
}

export default InspectionRepository;

// Define types for input data for each method
interface VerifyImageAIData {
  file: FileData;
  action: string;
  vehicleSection: string;
  claimId?: string;
  policyId?: string;
  bypass?: boolean;
}

export interface AutoInspectionData {
  vehicleImages: Record<string, FileData>;
  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  inspectionType: string;
  timeStamp?: string;
  policyId?: string;
  reference?: string;
}

export interface GadgetInspectionData {
  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  frontImage: string;
  backImage: string;
  sideImage: string;
  serialNumberImage: string;
  // claimId: string;
  // policyNumber: string;
  inspectionType?: string;
  timeStamp?: string;
  policyId?: string;
  reference?: string;
}
export interface GadgetClaimInspectionData {
  videoUrl: string;
  address: string;
  longitude: string;
  latitude: string;
  frontImage: string;
  backImage: string;
  sideImage: string;
  serialNumberImage: string;
  // policeReportUrl?: string;
  claimId: string;
  policyNumber: string;
  inspectionType?: string;
  timeStamp?: string;
  policyId?: string;
  reference?: string;
}

// interface GadgetClaimInspectionData {
//   policyNumber: string;
//   videoUrl: string;
//   address: string;
//   longitude: string;
//   latitude: string;
//   frontImage: string;
//   backImage: string;
//   sideImage: string;
//   serialNumberImage: string;
//   policeReportUrl?: string;
//   timeStamp?: string;
//   claimId?: string;
//   reference?: string;
// }
