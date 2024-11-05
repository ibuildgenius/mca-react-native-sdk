import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints
// import * as FileSystem from 'expo-file-system'; // For file handling
import GenericResponse from '../api/GenericResponse';
import customLog from '../../utils/logger';

// const global = useGlobalStore((state: GlobalStore) => state);
interface IFormRepository {
  getListData(dataUrl: string, dependsOnId?: string): Promise<GenericResponse>;
  fetchProductPrice(
    payload: Record<string, any>,
    productId: string
  ): Promise<GenericResponse>;
  // uploadFile(
  //   file: FileData,
  //   fileType?: string,
  //   onSendProgress?: (progressEvent: ProgressEvent) => void,
  // ): Promise<GenericResponse>;
  completePurchase(
    payload: Record<string, any>,
    reference: String
  ): Promise<GenericResponse>;
}

const apiService = new ApiService('https://staging.api.mycover.ai/v1');

class FormRepository implements IFormRepository {
  //   apiService: ApiService;

  //   constructor(baseUrl: string) {
  //     this.apiService = new ApiService(baseUrl);
  //   }

  async getListData(
    dataUrl: string,
    dependsOnId?: string
  ): Promise<GenericResponse> {
    let url = dataUrl;
    if (dependsOnId) {
      url = `${dataUrl}/${dependsOnId}`;
    }
    const res = await apiService.get(url, { useToken: true });
    return new GenericResponse(res);
  }

  async fetchProductPrice(
    payload: Record<string, any>,
    productId: string
  ): Promise<GenericResponse> {
    const requestData = {
      payload: payload,
      productId: productId,
    };
    customLog.debug('heeeeeeeeeeeee', payload);
    // console.log(first);
    const res = await apiService.post(
      ApiEndpoints.fetchProductPrice,
      requestData,
      { useToken: true }
    );

    return new GenericResponse(res);
  }

  // async uploadFile(
  //   file: FileData,
  //   fileType?: string,
  //   onSendProgress?: (progressEvent: ProgressEvent) => void,
  // ): Promise<GenericResponse> {
  //   const mimeType = mime.getType(file.name); // Using 'mime' package to get mime type
  //   const mediaType =
  //     fileType === 'video' || fileType === 'document'
  //       ? undefined
  //       : mimeType || 'image/jpeg';

  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: file.uri,
  //     name: file.name,
  //     type: mediaType,
  //   });
  //   log.info(1);
  //   log.info(1);
  //   log.info(1);
  //   log.info(1);
  //   log.info(1);
  //   log.info(1);
  //   log.info(formData);
  //   formData.append('fileType', fileType || 'image');

  //   const res = await apiService.post(ApiEndpoints.uploadFile, formData, {
  //     useToken: true,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     onSendProgress: onSendProgress, // For upload progress
  //   });

  //   return new GenericResponse(res);
  // }

  async completePurchase(
    payload: Record<string, any>,
    reference: String
  ): Promise<GenericResponse> {
    const requestData = {
      payload: payload,
      reference: reference, // Assuming Global object contains a reference.
    };

    // const requestData = {
    //   payload: Object.fromEntries(payload),
    //   productId: productId,
    // };

    const res = await apiService.post(
      ApiEndpoints.completePurchase,
      requestData,
      { useToken: true }
    );

    return new GenericResponse(res);
  }
}

export default FormRepository;
