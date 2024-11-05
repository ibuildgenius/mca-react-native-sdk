import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// Assuming you have custom components
import CustomAppBar from '../../../components/CustomAppBar';
import CustomButton from '../../../components/CustomButton';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { getGadgetType, ProductCategory } from '../../../utils/enums';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { PolicyModel } from '../../../models/PolicyModel';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VerticalSpacer } from '../../../components/Spacer';
import globalObject from '../../../store/globalObject';

interface PurchaseSuccessScreenProps {
  policy: PolicyModel; // Replace 'any' with the correct type of PurchaseinitializationModel
  productDetails: ProductDetailsModel; // Replace 'string' with a more specific type if available
}

type PurchaseSuccessScreenRouteProps = RouteProp<
  RootStackParamList,
  'PurchaseSuccessScreen'
>;

const PurchaseSuccessScreen: React.FC<PurchaseSuccessScreenProps> = () => {
  const route = useRoute<PurchaseSuccessScreenRouteProps>();
  const { policy, productDetails } = route.params;

  const isInspectable = productDetails?.inspectable === true;

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Disable back button functionality
    const backAction = () => {
      // Returning true disables the back button
      return true;
    };

    // Add the back button event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Cleanup event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);

  const handleInspection = () => {
    globalObject.policyId = policy.id ?? globalObject.policyId;

    if (
      (productDetails.productCategory?.name ?? '').toLowerCase() === 'gadget'
    ) {
      globalObject.setGadgetType(
        getGadgetType(
          policy.meta['payload']['device_type'].toString().toLowerCase()
        )
      );
      globalObject.policyNumber =
        policy.meta['policy_number'] ?? globalObject.policyNumber;
    }

    const productCategory =
      (productDetails.productCategory?.name ?? '').toLowerCase() === 'gadget'
        ? ProductCategory.gadget
        : ProductCategory.auto;
    // const claim = null;

    // Assuming you have an InspectionInitScreen in your navigation stack
    navigation.replace('InspectionInitScreen', { productCategory });
  };

  const handleClose = () => {
    // Handle close and return response
    // const response = {
    //   status: SdkResponseStatus.success,
    //   policyModel: policy,
    // };

    // Assuming you're using some global function to complete the process
    navigation.popToTop();
    // Call global onComplete or some callback method with response
    // Global.onComplete(response);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar showBackButton={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../../assets/lottie/purchase_successful.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>
        <SemiBoldText
          title={
            isInspectable
              ? 'Proceed to conduct Inspection'
              : 'Activation Successful!'
          }
          fontSize={19}
          color={DynamicColors().primaryBrandColor}
          textAlign="center"
        />
        <VerticalSpacer height={30} />
        <RegularText
          title={
            isInspectable
              ? (productDetails?.productCategory?.name ?? '').toLowerCase() ===
                'gadget'
                ? 'Great! You have provided your gadget details, proceed to conduct inspection to activate the policy.'
                : 'Great! You have provided your vehicle details, proceed to conduct inspection to activate the policy.'
              : 'Your insurance policy has been activated. Check your email for further information about your policy.'
          }
          fontSize={17}
          color={CustomColors.blackColor}
          textAlign="center"
        />
        <View style={styles.middleSpacer}></View>

        <View style={styles.buttonContainer}></View>

        {isInspectable ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleClose}>
              <CustomButton
                title="Do later"
                onPress={handleClose}
                textColor={CustomColors.backTextColor}
                buttonColor={CustomColors.dividerGreyColor}
                fontSize={15}
              />
            </TouchableOpacity>
            <View style={styles.continueButton}>
              <CustomButton
                title="Conduct Inspection"
                onPress={handleInspection}
              />
              {/* <Text style={styles.buttonText}>Continue</Text> */}
            </View>
            {/* <CustomButton
  title="Continue"
  onPress={onContinue}
/> */}
          </View>
        ) : (
          // <View>
          //   <CustomButton title="Do later" onPress={handleClose} />
          //   <View style={styles.spacer} />
          //   <CustomButton
          //     title="Conduct Inspection"
          //     onPress={handleInspection}
          //   />
          // </View>
          <CustomButton title="Close" onPress={handleClose} />
        )}
        <VerticalSpacer height={30} />
        <PoweredByFooter />
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between' as const,
    flexGrow: 1,
  },
  middleSpacer: {
    flex: 3,
  },
  lottieContainer: {
    flex: 2,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  laterButton: {
    backgroundColor: CustomColors.greyTextColor,
  },
  laterButtonText: {
    color: CustomColors.blackColor,
  },
  spacer: {
    width: 10,
  },
  buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginVertical: 20,
  },
  goBackButton: {
    flex: 1,
    marginRight: 10,
  },
  continueButton: {
    flex: 2,
  },
};

export default PurchaseSuccessScreen;
