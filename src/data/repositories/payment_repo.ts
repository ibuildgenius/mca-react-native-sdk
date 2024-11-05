import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints
import GenericResponse from '../api/GenericResponse';
import customLog from '../../utils/logger';
import globalObject from '../../store/globalObject';
// Assuming a generic response structure

interface IPaymentRepository {
  initiateGatewayPurchase(data: GatewayPurchaseData): Promise<GenericResponse>;
  initiateWalletPurchase(data: WalletPurchaseData): Promise<GenericResponse>;
  getUssdProviders(): Promise<GenericResponse>;
  verifyPayment(reference: string): Promise<GenericResponse>;
  getPurchaseInfo(reference: string): Promise<GenericResponse>;
}

const apiService = new ApiService('https://staging.api.mycover.ai/v1');

export class PaymentRepository implements IPaymentRepository {
  // apiService: ApiService;

  // constructor(baseUrl: string) {
  //   this.apiService = new ApiService(baseUrl);
  // }

  async initiateGatewayPurchase(
    data: GatewayPurchaseData
  ): Promise<GenericResponse> {
    // log.debug('response data', JSON.stringify(response.data, null, 2))
    const requestData = {
      payload: data.payload,
      payment_channel: Object.fromEntries(data.paymentChannel),
      instance_id: globalObject.businessDetails?.instanceId || '',
    };
    customLog.debug('data', JSON.stringify(requestData, null, 2));

    const res = await apiService.post(
      ApiEndpoints.initiatePurchase,
      requestData,
      {
        useToken: true,
      }
    );
    return new GenericResponse(res);
  }

  async initiateWalletPurchase(
    data: WalletPurchaseData
  ): Promise<GenericResponse> {
    customLog.debug('data', data);
    const requestData = {
      payload: data.payload,
      reference: data.reference,
      instance_id: globalObject.businessDetails?.instanceId || '',
    };

    const res = await apiService.post(
      ApiEndpoints.initiatePurchase,
      requestData,
      {
        useToken: true,
      }
    );
    return new GenericResponse(res);
  }

  async getUssdProviders(): Promise<GenericResponse> {
    const res = await apiService.get(ApiEndpoints.getUssdProviders, {
      useToken: true,
    });
    return new GenericResponse(res);
  }

  async verifyPayment(reference: string): Promise<GenericResponse> {
    const requestData = {
      transaction_reference: reference,
    };

    const res = await apiService.post(ApiEndpoints.verifyPayment, requestData, {
      useToken: true,
    });
    return new GenericResponse(res);
  }

  async getPurchaseInfo(reference: string): Promise<GenericResponse> {
    const query = `?reference=${reference}`;
    const res = await apiService.get(ApiEndpoints.getPurchaseInfo + query, {
      useToken: true,
    });
    return new GenericResponse(res);
  }
}

export default PaymentRepository;

// Define types for input data for each method
interface GatewayPurchaseData {
  paymentChannel: Map<string, any>;
  payload: Record<string, any>;
  instanceId?: string; // Optional
}

interface WalletPurchaseData {
  payload: Record<string, any>;
  reference: string;
  instanceId?: string; // Optional
}
