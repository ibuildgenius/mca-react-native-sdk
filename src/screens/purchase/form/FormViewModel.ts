import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import customLog from '../../../utils/logger';
import FormRepository from '../../../data/repositories/form_repo';
// import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';
import { PolicyModel } from '../../../models/PolicyModel';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import { type FormStore, useFormStore } from '../../../store/formStore';
import type { LoadStore } from '../../../store/loadStore';
import type { FileData } from './components/CustomImagePicker';
import { FormDataUrlResponse } from '../../../models/FormDataUrlResponse';
import FileRepository from '../../../data/repositories/file_repo';

import { ToastStatus } from '../../../utils/enums';
import globalObject from '../../../store/globalObject';
import { showToast } from '../../../components/CustomToast';

const formRepository = new FormRepository();

const fileRepository = new FileRepository();

// type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const FormViewModel = () => {
  // const global = useGlobalStore((state: GlobalStore) => state);
  const globalForm = useFormStore((state: FormStore) => state);
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const getListData = async (
    dataUrl: string,
    fieldName: string,
    dependsOn?: string
  ): Promise<boolean> => {
    try {
      if (dependsOn != null) {
        const dependsOnValue = dependsOn
          ? globalForm.formData[dependsOn]
          : null;
        if (dependsOnValue === null) return true;
        const dependsOnId = dependsOn
          ? globalForm.urlFormData
              .get(dependsOn)
              ?.find((field: any) => field.name === dependsOnValue)?.id
          : undefined;
        const res = await formRepository.getListData(
          dataUrl,
          dependsOnId ?? ''
        );
        if (res.responseCode === 1) {
          globalForm.setUrlFormData(fieldName, processResponseData(res.data));

          return true;
        } else {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          showToast(ToastStatus.failed, errorMessage);

          return false;
        }
      } else {
        const res = await formRepository.getListData(dataUrl);
        if (res.responseCode === 1) {
          globalForm.setUrlFormData(fieldName, processResponseData(res.data));
          return true;
        } else {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          showToast(ToastStatus.failed, errorMessage);
          return false;
        }
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      return false;
    }
  };
  const processMapResponseData = (data: any): FormDataUrlResponse[] => {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([key, value]) => ({
        name: value as string,
        id: key,
      }));
    } else if (Array.isArray(data)) {
      // Return as is if it's an array of strings
      return data.map((item: any) => ({
        name: item.toString(),
        id: null,
      }));
    } else {
      // Return empty array if data type is not expected
      return [];
    }
  };

  const getMapData = async (
    dataUrl: string,
    fieldName: string
  ): Promise<boolean> => {
    try {
      const res = await formRepository.getListData(dataUrl);

      if (res.responseCode === 1) {
        globalForm.setUrlFormData(fieldName, processMapResponseData(res.data));

        return true;
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
        return false;
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      return false;
    }
  };

  const fetchProductPrice = async (
    loadingState: LoadStore,
    productId: string
  ) => {
    try {
      loadingState.setFormVmLoading(true);

      const res = await formRepository.fetchProductPrice(
        globalForm.formData,
        productId
      );

      if (res.responseCode === 1) {
        globalForm.setProductPrice(res.data.price);

        loadingState.setFormVmLoading(false);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
        loadingState.setFormVmLoading(false);
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      loadingState.setFormVmLoading(false);
    }
  };

  const uploadImage = async () => {
    try {
      const imageList = globalForm.imageList;

      if (imageList.length > 0) {
        const images: Record<string, string> = {};
        for (const imageMap of imageList) {
          for (const [key, file] of imageMap.entries()) {
            const fileData: FileData = {
              uri: file.uri,
              name: file.name,
            };

            const res = await fileRepository.uploadFile(fileData, 'image');

            if (res.responseCode === 1) {
              globalForm.setFormData(key, res.data.file_url);
              console.log('Test1 Images,', res.data.file_url);
              images[key] = res.data.file_url;
              console.log('Test2 Images,', images);
            } else {
              const errorMessage =
                res.errors && res.errors.length > 0
                  ? res.errors.join(', ')
                  : res.message;

              showToast(ToastStatus.failed, errorMessage);
              throw new Error('Failed to upload file');
            }
          }
        }

        return images;
      }
      return undefined;
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      return undefined;
    }
  };

  const uploadSingleImage = async (
    // name: string,
    file: FileData,
    fileType?: string
  ): Promise<string | null> => {
    try {
      const res = await fileRepository.uploadFile(file, fileType);

      if (res.responseCode === 1) {
        return res.data.file_url;
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
        return null;
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      return null;
    }
  };

  const completePurchase = async (
    loadingState: LoadStore,
    productDetails: ProductDetailsModel
  ) => {
    try {
      loadingState.setFormVmLoading(true);
      const images = await uploadImage();
      const payload = { ...globalForm.formData, ...(images ?? {}) };
      const res = await formRepository.completePurchase(
        payload,
        globalObject.reference ?? ''
      );
      if (res.responseCode === 1) {
        const policy = PolicyModel.fromJson(res.data);
        navigation.navigate('PurchaseSuccessScreen', {
          policy,
          productDetails,
        });
        loadingState.setFormVmLoading(false);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);

        loadingState.setFormVmLoading(false);
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
      loadingState.setFormVmLoading(false);
    }
  };

  const processResponseData = (data: any[]): FormDataUrlResponse[] => {
    customLog.info(data);
    return data.map((item: any) => {
      if (typeof item === 'object' && item !== null && 'name' in item) {
        return new FormDataUrlResponse(item.name, item.id ?? null);
      }
      return new FormDataUrlResponse(item.toString(), null);
    });
  };

  return {
    getListData,
    fetchProductPrice,
    uploadImage,
    uploadSingleImage,
    completePurchase,
    getMapData,
  };
};
