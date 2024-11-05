import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints

const apiService = new ApiService('https://staging.api.mycover.ai/v1');

export class ProductRepository {
  async getAllInsuranceProviders(): Promise<any> {
    return apiService.get(ApiEndpoints.getInsuranceProviders); // Call ApiService.get
  }

  async getInsuranceProviders(
    categoryId: string,
    providerIds?: string[]
  ): Promise<any> {
    let query = `?category_id=${categoryId}`;
    if (providerIds && providerIds.length > 0) {
      const providerIdQuery = providerIds
        .map((id) => `provider_ids=${encodeURIComponent(id)}`)
        .join('&');
      query += `&${providerIdQuery}`;
    }
    return apiService.get(`${ApiEndpoints.getInsuranceProviders}${query}`);
  }

  async getProductDetails(options: {
    categoryId: string;
    providerIds?: string[];
    search?: string;
    priceStaticFrom?: string;
    priceStaticTo?: string;
    priceDynamicFrom?: string;
    priceDynamicTo?: string;
  }): Promise<any> {
    const queryParams: { [key: string]: string } = {
      category_id: options.categoryId,
    };

    if (options.search) queryParams['search'] = options.search;
    if (options.priceStaticFrom)
      queryParams['price_static_from'] = options.priceStaticFrom;
    if (options.priceStaticTo)
      queryParams['price_static_to'] = options.priceStaticTo;
    if (options.priceDynamicFrom)
      queryParams['price_dynamic_from'] = options.priceDynamicFrom;
    if (options.priceDynamicTo)
      queryParams['price_dynamic_to'] = options.priceDynamicTo;

    if (options.providerIds && options.providerIds.length > 0) {
      options.providerIds.forEach((id) => (queryParams['provider_id'] = id));
    }

    const queryString = new URLSearchParams(queryParams).toString();

    return apiService.get(`${ApiEndpoints.getProductDetails}?${queryString}`);
  }

  async getProductDetailsById(productId: string): Promise<any> {
    return apiService.get(
      `${ApiEndpoints.getProductDetails}?product_ids=${productId}`
    );
  }
}

export default ProductRepository;
