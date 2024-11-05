import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import customLog from '../../../utils/logger';
import PaymentRepository from '../../../data/repositories/payment_repo';
import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';
import { UssdProviderModel } from '../../../models/UssdProviderModel';
import {
  PaymentMethod,
  PaymentMethodHelper,
  ToastStatus,
} from '../../../utils/enums';
import { create } from 'zustand';
import { PurchaseDetailsResponseModel } from '../../../models/PurchaseDetailsResponseModel';
import { PurchaseinitializationModel } from '../../../models/PurchaseinitializationModel';
import type { LoadStore } from '../../../store/loadStore';
import { type FormStore, useFormStore } from '../../../store/formStore';

import globalObject from '../../../store/globalObject';
import { showToast } from '../../../components/CustomToast';

export const usePaymentStore = create((set) => ({
  paymentViewModelLoading: false,
  setPaymentLoading: (loading: boolean) =>
    set({ paymentViewModelLoading: loading }),
}));

const paymentRepository = new PaymentRepository();

export const PaymentViewModel = () => {
  const global = useGlobalStore((state: GlobalStore) => state);
  const globalForm = useFormStore((state: FormStore) => state);

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const fetchUssdProviders = async (
    // paymentMethod: any,
    loadingState: LoadStore
  ) => {
    try {
      loadingState.setPaymentVmLoading(true);
      // global.ussdProviders = await getUssdProviders();

      loadingState.setPaymentVmLoading(false);
      // navigation.navigate('SelectBankScreen');
      return true;
    } catch (error) {
      loadingState.setPaymentVmLoading(false);

      showToast(ToastStatus.failed, `${error}`);
      return false;
    }
  };

  const initiateGatewayPurchase = async (
    paymentMethod: PaymentMethod,
    loadingState: LoadStore
  ) => {
    try {
      loadingState.setPaymentVmLoading(true);
      customLog.info('PAYMENT METHOD', paymentMethod);
      customLog.info('PAYMENT METHOD', paymentMethod === 'ussd');
      customLog.info(
        'PAYMENT METHOD',
        paymentMethod === PaymentMethod.transfer
      );

      const res = await paymentRepository.initiateGatewayPurchase({
        paymentChannel:
          paymentMethod === 'ussd'
            ? new Map<string, any>([
                ['channel', PaymentMethodHelper.getName(paymentMethod)],
                [
                  'bank_code',
                  global.ussdProviders.length > 0
                    ? globalForm.selectedBank?.type
                    : '',
                ],
              ])
            : new Map<string, any>([
                ['channel', PaymentMethodHelper.getName(paymentMethod)],
              ]),
        payload: globalForm.formData,
        instanceId: globalObject.businessDetails?.instanceId ?? '',
      });

      loadingState.setPaymentVmLoading(false);

      if (res.responseCode === 1) {
        const data = PurchaseinitializationModel.fromJson(res.data);
        navigation.navigate('AccountDetailsScreen', {
          purchaseDetails: data,
          paymentMethod,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }

      return true;
    } catch (error) {
      loadingState.setPaymentVmLoading(false);

      showToast(ToastStatus.failed, `${error}`);
      return false;
    }
  };

  const initiateWalletPurchase = async (loadingState: LoadStore) => {
    try {
      loadingState.setPaymentVmLoading(true);

      const res = await paymentRepository.initiateWalletPurchase({
        payload: globalForm.formData,
        reference: globalObject.reference ?? '',
      });

      if (res.responseCode === 1) {
        const purchaseRes = await paymentRepository.getPurchaseInfo(
          globalObject.reference ?? ''
        );
        const data = PurchaseDetailsResponseModel.fromJson(purchaseRes.data);
        global.setReference(data.reference || '');

        navigation.replace('PlanDetailsScreen', {
          purchaseDetails: data,
        });
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }

      loadingState.setPaymentVmLoading(false);
      return true;
    } catch (error) {
      loadingState.setPaymentVmLoading(false);

      showToast(ToastStatus.failed, `${error}`);
      return false;
    }
  };

  // const getUssdProviders = async (
  //   loadingState: LoadStore
  // ): Promise<UssdProviderModel[]> => {
  //   try {
  //     loadingState.setPaymentVmLoading(true);
  //     const res = await paymentRepository.getUssdProviders();
  //     loadingState.setPaymentVmLoading(false);

  //     if (res.responseCode === 1) {
  //       return (res.data || []).map((e: any) => UssdProviderModel.fromJson(e));
  //     } else {
  //       const errorMessage =
  //         res.errors && res.errors.length > 0
  //           ? res.errors.join(', ')
  //           : res.message;

  //       showToast(ToastStatus.failed, errorMessage);
  //       return [];
  //     }
  //   } catch (error) {
  //     loadingState.setPaymentVmLoading(false);

  //     showToast(ToastStatus.failed, `${error}`);
  //     return [];
  //   }
  // };

  const verifyPayment = async (
    reference: string,
    paymentMethod: any,
    purchaseDetails: PurchaseinitializationModel,
    loadingState: LoadStore,
    redirect = true
  ): Promise<UssdProviderModel[]> => {
    try {
      loadingState.setPaymentVmLoading(true);
      const res = await paymentRepository.verifyPayment(reference);

      if (res.responseCode === 1) {
        const purchaseRes = await paymentRepository.getPurchaseInfo(reference);
        const data = PurchaseDetailsResponseModel.fromJson(purchaseRes.data);
        // global.reference = ;
        globalObject.setReference(data.reference || '');

        navigation.navigate('PaymentSuccessScreen', { purchaseDetails: data });
        loadingState.setPaymentVmLoading(false);
        return [];
      } else {
        // const errorMessage =
        //   res.errors && res.errors.length > 0
        //     ? res.errors.join(', ')
        //     : res.message;

        showToast(
          ToastStatus.failed,
          'We have not received your payment. Hang on, we will keep trying'
        );
        loadingState.setPaymentVmLoading(false);
        if (redirect) {
          navigation.navigate('PaymentProcessingScreen', {
            purchaseDetails,
            paymentMethod,
          });
        }
        return [];
      }
    } catch (error) {
      loadingState.setPaymentVmLoading(false);

      showToast(ToastStatus.failed, `${error}`);
      return [];
    }
  };

  const navigateToLastScreen = (context: any) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      setTimeout(() => {
        navigateToLastScreen(context);
      }, 300);
    }
  };

  return {
    fetchUssdProviders,
    initiateGatewayPurchase,
    initiateWalletPurchase,
    verifyPayment,
    navigateToLastScreen,
  };
};
