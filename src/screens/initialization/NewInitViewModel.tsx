import InitRepository from '../../data/repositories/init_repo';

import { SdkInitializationResponse } from '../../models/SdkInitializationResponse';
import customLog from '../../utils/logger';
import globalObject from '../../store/globalObject';

const initRepository = new InitRepository();

export const NewInitViewModel = () => {
  const initialiseSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository.initialiseSdk();

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

        // if (global.transactionType === TransactionType.purchase) {
        //   customLog.info('error');
        // } else {
        //   customLog.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          console.log(errorMessage);
          //   navigation.navigate('SDKErrorScreen', {
          //     error: errorMessage,
          //   });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  return {
    initialiseSdk,
  };
};
