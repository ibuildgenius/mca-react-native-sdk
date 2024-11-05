import ApiService from '../api/api_service'; // Import ApiService
import ApiEndpoints from '../../constants/ApiEndpoints'; // Import API endpoints
// import * as FileSystem from 'expo-file-system'; // For file handling
import GenericResponse from '../api/GenericResponse';
import type { FileData } from '../../screens/purchase/form/components/CustomImagePicker';
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'react-native-blob-util';
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'react-native-blob-util';
import axios from 'axios';
import globalObject from '../../store/globalObject';

// const global = useGlobalStore((state: GlobalStore) => state);
interface IFIleRepository {
  uploadFile(
    file: FileData,
    fileType?: string,
    isCompressed?: boolean,
    isInspectionLoading?: number,
    setIsInspectionLoading?: (data: number) => void
  ): Promise<GenericResponse>;
}

const apiService = new ApiService('https://staging.api.mycover.ai/v1', true);

class FileRepository implements IFIleRepository {
  async uploadFile(
    file: FileData,
    fileType?: string,
    // loadStore?: LoadStore,

    isCompressed?: boolean,
    _isInspectionLoading?: number,
    setIsInspectionLoading?: (data: number) => void
  ): Promise<GenericResponse> {
    // const newLoadStore = useLoadStore.getState(); // Access the loadStore directly

    const formData = new FormData();
    let fileUri = file.uri;

    formData.append('file', {
      uri: `file://${fileUri}`, // fileType == 'video' ? `file://${fileUri}` : file.uri,
      name: 'testttt', //file.uri.split('/').pop(),
      type:
        fileType == 'video' || fileType == 'document'
          ? 'image/jpeg'
          : 'image/jpeg',
    });

    const res = await apiService.postForm(ApiEndpoints.uploadFile, formData, {
      onUploadProgress: (progress) => {
        // if (loadStore) {
        //   loadStore.setUploadProgress(progress);
        // }
        const scaledProgress = Math.ceil(80 + progress * 0.2);

        if (setIsInspectionLoading) {
          if (isCompressed) {
            const scaledProgress = Math.ceil(80 + progress * 0.2);
            setIsInspectionLoading(scaledProgress || 0);
            console.log('Upload Progress (80-100):', scaledProgress);
          } else {
            setIsInspectionLoading(progress || 0);
          }
        }

        // if (loadStore) {
        //   if (isCompressed) {
        //     loadStore.setUploadProgress(scaledProgress);
        //   } else {
        //     loadStore.setUploadProgress(progress);
        //   }
        // }

        console.log('Upload Progress (80-100):', scaledProgress);
      },
    });

    return new GenericResponse(res);
  }

  async uploadVideoFile(
    file: FileData,
    fileType?: string
  ): Promise<GenericResponse> {
    const formData = new FormData();
    let fileUri = file.uri;

    formData.append('file', {
      uri: fileType == 'image' ? `file://${fileUri}` : file.uri,
      name: file.uri.split('/').pop(),
      type:
        fileType == 'video' || fileType == 'document'
          ? 'image/jpeg'
          : 'image/jpeg',
    });

    console.log(`file://${fileUri}`);

    const res = await axios.postForm(ApiEndpoints.uploadFile, formData, {
      headers: {
        'Authorization': `Bearer ${
          globalObject.publicKey ??
          'MCAPUBK_TEST|1acf339a-d36f-47e7-8e1b-fd0b76b61b0c'
        }`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      // onUploadProgress: progressEvent => {
      //   // Ensure total and loaded are available before calculating progress
      //   if (progressEvent.total && progressEvent.loaded) {
      //     const progress = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total,
      //     );

      //     const scaledProgress = Math.ceil(80 + progress * 0.2);

      //     if (loadStore) {
      //       loadStore.setUploadProgress(scaledProgress); // Update the progress in the store
      //     }

      //     console.log('Upload Progress (80-100):', scaledProgress);
      //   } else {
      //     // Handle the case where total is undefined
      //     console.warn('Unable to track progress: total size is undefined');
      //   }
      // },
    });
    // mentioned the family does not know and the wife knew what if both
    // is the company liable to pay if the family was not informed

    return new GenericResponse(res);
  }

  // async uploadVideoFile(
  //   file: FileData,
  //   fileType?: string,
  //   onSendProgress?: (progressEvent: ProgressEvent) => void,
  // ): Promise<GenericResponse> {
  //   log.info('test', file);
  //   log.info('fileType', fileType);

  //   const formData = new FormData();

  //   formData.append('file', {
  //     uri: data.file.uri,
  //     name: data.file.uri.split('/').pop(),
  //     type: 'image/jpeg',
  //   });

  //   formData.append('file', {
  //     uri: file.uri,
  //     name: file.name,
  //     type: mime.getType(file.name),
  //   });

  //   const res = await apiService.post(
  //     ApiEndpoints.submitAutoInspection,
  //     formData,
  //     {
  //       headers: {'Content-Type': 'multipart/form-data'},
  //       useToken: true,
  //     },
  //   );

  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: data.file.uri,
  //     name: data.file.uri.split('/').pop(),
  //     type: 'image/jpeg',
  //   });
  //   formData.append('action', data.action);
  //   formData.append('vehicle_section', data.vehicleSection);
  //   formData.append('bypass', 'true');
  //   if (data.claimId) formData.append('claim_id', data.claimId);
  //   if (data.policyId) formData.append('policy_id', data.policyId);
  //   // if (data.bypass) formData.append('bypass', true);

  //   const res = await apiService.postForm(
  //     ApiEndpoints.verifyImageAI,
  //     formData,

  //     //   {
  //     //   headers: { 'Content-Type': 'multipart/form-data' },
  //     //   useToken: true,
  //     // }
  //   );

  //   return new GenericResponse(res);
  // }

  // const uploadNewFile = async (file: FileData, fileType: string): Promise<any> => {
  //   const formData = new FormData();

  //   // Ensure the URI is properly formatted
  //   let fileUri = file.uri.startsWith('file://') ? file.uri : `file://${file.uri}`;

  //   // Set MIME type based on fileType
  //   const mimeType = fileType === 'video' ? 'video/mp4' :
  //                    fileType === 'image' ? 'image/jpeg' :
  //                    fileType === 'document' ? 'application/pdf' : 'image/jpeg';

  //   // Construct the FormData with the correct fields for Axios
  //   formData.append('file', {
  //     uri: fileUri,              // The file URI (with file:// prefix)
  //     name: file.name || 'file.mp4', // Ensure the file has a proper name
  //     type: mimeType,            // Correct MIME type
  //   });

  //   // Append additional data to FormData
  //   formData.append('fileType', fileType);

  //   // Send the file using Axios
  //   try {
  //     const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Ensure multipart data
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         console.log(`Upload Progress: ${progress}%`);
  //       },
  //     });

  //     return response.data; // Handle the response
  //   } catch (error) {
  //     console.error('File upload error:', error);
  //     throw error;
  //   }
  // };
}

export default FileRepository;
