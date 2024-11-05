import ApiService from '../api/api_service'; // The API service that handles generic requests
import ApiEndpoints from '../../constants/ApiEndpoints'; // Your API endpoints
import globalObject from '../../store/globalObject';

const apiService = new ApiService('https://staging.api.mycover.ai/v2');

// Define the InitRepository class
export class InitRepository {
  // Function to initialize the SDK with necessary data
  async initialiseSdk(): // paymentOption: string,
  // reference: string | null,
  // productId: string
  Promise<any> {
    const requestData = {
      payment_option: globalObject.paymentOption,
      debit_wallet_reference: globalObject.reference
        ? globalObject.reference
        : null,
      action: 'purchase',
      product_id: globalObject.productId,
    };
    console.error('Got here', requestData);

    // Call the ApiService's post method to send the request
    return apiService.post(ApiEndpoints.initialiseSdk, requestData);
  }
}

export default InitRepository;
