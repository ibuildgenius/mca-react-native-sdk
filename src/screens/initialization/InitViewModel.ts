import { type GlobalStore, useGlobalStore } from '../../store/globalStore';
import InitRepository from '../../data/repositories/init_repo';
import ProductRepository from '../../data/repositories/product_repo';
import { useNavigation } from '@react-navigation/native';

import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { SdkInitializationResponse } from '../../models/SdkInitializationResponse';
import {
  getGadgetType,
  ProductCategory,
  ToastStatus,
  TransactionType,
} from '../../utils/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import customLog from '../../utils/logger';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import globalObject from '../../store/globalObject';
import { StringUtils } from '../../utils/StringUtils';
import ClaimRepository from '../../data/repositories/claim_repo';
import { PolicyModel } from '../../models/PolicyModel';
import { ClaimModel } from '../../models/ClaimModel';
import PaymentRepository from '../../data/repositories/payment_repo';
import { PurchaseDetailsResponseModel } from '../../models/PurchaseDetailsResponseModel';
import { type FormStore, useFormStore } from '../../store/formStore';
import { showToast } from '../../components/CustomToast';

const initRepository = new InitRepository();
const claimRepository = new ClaimRepository();
const productRepository = new ProductRepository();
const paymentRepository = new PaymentRepository();

export const InitViewModel = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const global = useGlobalStore((state: GlobalStore) => state);
  const formGlobal = useFormStore((state: FormStore) => state);
  // const miscGlobal = useMiscStore((state: any) => state);

  const navigation = useNavigation<NavigationProps>();

  const initialiseSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId[0],
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        customLog.info('data', data);

        customLog.debug('error1');
        customLog.debug('error77');

        globalObject.setBusinessDetails(data.businessDetails);
        // global.setBusinessDetails(data.businessDetails);
        customLog.debug('error77');
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null
        );
        customLog.debug('error88');
        customLog.debug('error', data.businessDetails);
        customLog.info('error', data.productCategories);

        globalObject.setProductCategories(data.productCategories ?? []);
        customLog.debug('error2');

        // data.productCategories?.sort((a, b) => {
        //   if (!a.name || !b.name) return 0;
        //   return a.name.localeCompare(b.name);
        // });

        if (data.productCategories && data.productCategories.length > 0) {
          data.productCategories.sort((a, b) => {
            if (!a.name || !b.name) return 0;
            return a.name.localeCompare(b.name);
          });
        } else {
          customLog.debug('productCategories is undefined or empty');
        }
        // const categoryId = data.productCategories?.[0].id ?? '';

        if (global.transactionType === TransactionType.purchase) {
          customLog.info('error');
        } else {
          customLog.info('here');
          navigation.replace('WelcomeScreen');
        }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          navigation.navigate('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseContinuePurchaseSdk = async (
    redirectError: boolean = true
  ) => {
    try {
      if (StringUtils.isNullOrEmpty(globalObject.reference)) {
        navigation.navigate('SDKErrorScreen', {
          error: 'Payment reference cannot be null',
        });
      } else {
        const purchaseRes = await paymentRepository.getPurchaseInfo(
          globalObject.reference ?? ''
        );

        if (purchaseRes.responseCode === 1) {
          const purchaseData = PurchaseDetailsResponseModel.fromJson(
            purchaseRes.data
          );
          global.setReference(purchaseData.reference || '');

          const res = await initRepository
            .initialiseSdk
            // global.paymentOption,
            // global.reference,
            // global.productId[0],
            ();

          if (res.responseCode === 1) {
            const data = SdkInitializationResponse.fromJson(res.data);

            customLog.info('data', data);

            customLog.debug('error1');
            customLog.debug('error77');

            globalObject.setBusinessDetails(data.businessDetails);
            // global.setBusinessDetails(data.businessDetails);
            customLog.debug('error77');
            globalObject.setPrimaryBrandColor(
              data.businessDetails
                ? data.businessDetails.brandColorPrimary
                : null
            );
            customLog.debug('error88');
            customLog.debug('error', data.businessDetails);
            customLog.info('error', data.productCategories);

            globalObject.setProductCategories(data.productCategories ?? []);
            customLog.debug('error2');

            // formGlobal.updateFormData(purchaseData.payload?.data ?? {});
            if (
              purchaseData &&
              purchaseData.payload &&
              purchaseData.payload.data
            ) {
              formGlobal.updateFormData(purchaseData.payload.data);
            } else {
              console.warn('No data found in purchaseData.payload');
              formGlobal.updateFormData({}); // Update with an empty object if data doesn't exist
            }

            const productRes = await productRepository.getProductDetailsById(
              purchaseData.payload?.productId ?? ''
            );

            const productDetails = ProductDetailsModel.fromJson(
              productRes.data['products'][0]
            );

            formGlobal.setSelectedProductDetails(productDetails);
            // formGlobal.setSelectedProductCategory(productCategory);

            navigation.replace('PlanDetailsScreen', {
              purchaseDetails: purchaseData,
            });

            // data.productCategories?.sort((a, b) => {
            //   if (!a.name || !b.name) return 0;
            //   return a.name.localeCompare(b.name);
            // });

            // if (data.productCategories && data.productCategories.length > 0) {
            //   data.productCategories.sort((a, b) => {
            //     if (!a.name || !b.name) return 0;
            //     return a.name.localeCompare(b.name);
            //   });
            // } else {
            //   log.debug('productCategories is undefined or empty');
            // }
            // const categoryId = data.productCategories?.[0].id ?? '';

            // if (global.transactionType === TransactionType.purchase) {
            //   log.info('error');
            // } else {
            //   log.info('here');
            //   navigation.replace('WelcomeScreen');
            // }
          } else {
            console.error('Failed to initialize SDK', res.errors);
            if (redirectError) {
              const errorMessage =
                res.errors && res.errors.length > 0
                  ? res.errors.join(', ')
                  : res.message;

              navigation.navigate('SDKErrorScreen', {
                error: errorMessage,
              });
            }
          }
        } else {
          const errorMessage =
            purchaseRes.errors && purchaseRes.errors.length > 0
              ? purchaseRes.errors.join(', ')
              : purchaseRes.message;

          navigation.navigate('SDKErrorScreen', {
            error: errorMessage ?? '',
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseInspectionSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        customLog.info('data', data);

        customLog.debug('error1');
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null
        );
        customLog.debug('error', data.businessDetails);
        customLog.info('error', data.productCategories);
        globalObject.setProductCategories(data.productCategories ?? []);
        customLog.debug('error2');

        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
        // const categoryId = data.productCategories?.[0].id ?? '';
        if (StringUtils.isNullOrEmpty(globalObject.policyId)) {
          navigation.navigate('SDKErrorScreen', {
            error: 'Policy Id cannot be null',
          });
        } else {
          const policyRes = await claimRepository.getPolicyById(
            globalObject.policyId ?? ''
          );

          if (policyRes.responseCode == 1) {
            const policy = PolicyModel.fromJson(policyRes.data['policy']);

            const productRes = await productRepository.getProductDetailsById(
              policy.productId ?? ''
            );
            const productDetails = ProductDetailsModel.fromJson(
              productRes.data['products'][0]
            );

            if (
              productDetails.inspectable != false ||
              (productDetails.routeName ?? '')
                .toLowerCase()
                .includes('third-party')
            ) {
              if (
                (productDetails.productCategory?.name ?? '').toLowerCase() ===
                'gadget'
              ) {
                globalObject.setGadgetType(
                  getGadgetType(
                    policy.meta['payload']['device_type']
                      .toString()
                      .toLowerCase()
                  )
                );
                globalObject.policyNumber =
                  policy.meta['policy_number'] ?? globalObject.policyNumber;
              }

              // if (!StringUtils.isNullOrEmptyList(policy.inspections)) {
              //   navigation.replace('SDKErrorScreen', {
              //     error: 'You have completed pre inspection for this policy',
              //   });
              // }
              // else
              // {
              navigation.replace('InspectionInitScreen', {
                // claim: null,
                productCategory:
                  (productDetails.productCategory?.name ?? '').toLowerCase() ==
                  'gadget'
                    ? ProductCategory.gadget
                    : ProductCategory.auto,
              });
              // }
            } else {
              navigation.replace('SDKErrorScreen', {
                error: 'This product is not inspectable',
              });
            }
          } else {
            const errorMessage =
              policyRes.errors && policyRes.errors.length > 0
                ? policyRes.errors.join(', ')
                : policyRes.message;

            navigation.replace('SDKErrorScreen', {
              error: errorMessage ?? '',
            });
          }
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseClaimSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        customLog.info('data', data);

        customLog.debug('error1');
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null
        );
        customLog.debug('error', data.businessDetails);
        customLog.info('error', data.productCategories);
        globalObject.setProductCategories(data.productCategories ?? []);
        customLog.debug('error2');

        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
        // const categoryId = data.productCategories?.[0].id ?? '';

        if (
          StringUtils.isNullOrEmpty(globalObject.policyId) ||
          StringUtils.isNullOrEmpty(globalObject.policyNumber) ||
          StringUtils.isNullOrEmpty(globalObject.email)
        ) {
          navigation.navigate('SDKErrorScreen', {
            error: StringUtils.isNullOrEmpty(globalObject.policyId)
              ? 'Policy Id cannot be null'
              : StringUtils.isNullOrEmpty(globalObject.policyNumber)
                ? 'Policy Number cannot be null'
                : 'Customer email cannot be null',
          });
        } else {
          await getClaimsById(
            globalObject.email ?? '',
            globalObject.policyNumber ?? ''
            // loadStore
          );
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
      showToast(ToastStatus.failed, `SDK initialization error ${error}`);
    }
  };

  const getClaimsById = async (
    email: string,
    policyNumber: string
    // productDetails: ProductDetailsModel,
    // loadingState: LoadStore
  ) => {
    try {
      // loadingState.setClaimVmLoading(true);

      const res = await claimRepository.getClaimsById(
        globalObject.policyId ?? ''
      );

      const policyRes = await claimRepository.getPolicyInfo(
        email,
        policyNumber
      );

      if (policyRes.responseCode === 1) {
        const policy = PolicyModel.fromJson(policyRes.data);

        const productRes = await productRepository.getProductDetailsById(
          policy.productId ?? ''
        );

        const productDetails = ProductDetailsModel.fromJson(
          productRes.data['products'][0]
        );

        if (policy.product?.claimable != true) {
          showToast(
            ToastStatus.failed,
            'Selected product is not claimable, please try again'
          );
        } else if (
          res.message == 'Claim does not exist' &&
          res.responseCode == 0
        ) {
          // loadingState.setClaimVmLoading(false);
          navigation.navigate('ConfirmPolicyInfoScreen', {
            policy,
            productDetails,
          });
        } else {
          const claim = ClaimModel.fromJson(res.data);
          // loadingState.setClaimVmLoading(false);

          if (
            productDetails?.productCategory?.name?.toLowerCase() === 'travel'
          ) {
            navigation.navigate('TrackTravelClaimsScreen', { claim });
          } else if (
            productDetails?.productCategory?.name?.toLowerCase() === 'gadget'
          ) {
            navigation.navigate('TrackGadgetClaimsScreen', { claim });
          } else {
            navigation.navigate('TrackClaimsScreen', { claim });
          }
        }
      } else {
        console.error('Failed to initialize SDK', policyRes.errors);

        const errorMessage =
          policyRes.errors && policyRes.errors?.length > 0
            ? policyRes.errors.join(', ')
            : policyRes.message;

        navigation.replace('SDKErrorScreen', {
          error: errorMessage ?? '',
        });
      }
    } catch (error) {
      // loadingState.setClaimVmLoading(false);
      console.error(error);
      showToast(
        ToastStatus.failed,
        'Selected product is not claimable, please try again'
      );
    }
  };

  return {
    initialiseSdk,
    initialiseInspectionSdk,
    initialiseClaimSdk,
    initialiseContinuePurchaseSdk,
  };
};
