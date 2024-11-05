import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import PoweredByFooter from '../../../components/PoweredByFooter';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { PurchaseDetailsResponseModel } from '../../../models/PurchaseDetailsResponseModel';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomAppBar from '../../../components/CustomAppBar';
import { VerticalSpacer } from '../../../components/Spacer';

interface PaymentSuccessScreenProps {
  purchaseDetails: PurchaseDetailsResponseModel;
}

type PaymentSuccessScreenRouteProps = RouteProp<
  RootStackParamList,
  'PaymentSuccessScreen'
>;

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = () => {
  const route = useRoute<PaymentSuccessScreenRouteProps>();
  const { purchaseDetails } = route.params;

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

  return (
    <View style={styles.container}>
      <CustomAppBar showBackButton={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.appBar}>{/* No back button for now */}</View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../../assets/lottie/purchase_successful.json')}
            autoPlay
            loop={true}
            style={styles.lottie}
          />
        </View>
        <SemiBoldText
          title="Purchase Successful!"
          fontSize={19}
          color={DynamicColors().primaryBrandColor}
          textAlign="center"
        />
        <VerticalSpacer height={30} />
        <RegularText
          title="Great! You have successfully completed your purchase."
          //Your payment has been confirmed. Activate your policy to generate your HMO ID and start enjoying your benefits.
          fontSize={17}
          color={CustomColors.blackColor}
          textAlign="center"
        />

        <View style={styles.middleSpacer}></View>

        <CustomButton
          title="Proceed to activate Plan"
          onPress={() => {
            navigation.replace('PlanDetailsScreen', {
              purchaseDetails,
            });
          }}
        />
        <VerticalSpacer height={5} />
        <PoweredByFooter />
        <VerticalSpacer height={20} />
        {/* <View style={styles.lottieContainer}></View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  appBar: {
    marginBottom: 10,
  },
  lottieContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSpacer: {
    flex: 3,
  },
  bottomSpacer: {
    flex: 1,
  },
  lottie: {
    width: '100%',
    height: 250,
  },
});

export default PaymentSuccessScreen;
