import React, { useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { type RootStackParamList } from '../../utils/navigatorStackList';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import globalObject from '../../store/globalObject';
import { TransactionType } from '../../utils/enums';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../components/CustomText';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { VerticalSpacer } from '../../components/Spacer';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import CustomAppBar from '../../components/CustomAppBar';

// interface InspectionSuccessScreenProps {
//   inspection: InspectionModel;
// }

// type InspectionSuccessScreenRouteProps = RouteProp<
//   RootStackParamList,
//   'InspectionSuccessScreen'
// >;

const InspectionSuccessScreen: React.FC =
  // <
  // InspectionSuccessScreenProps>
  () => {
    // const route = useRoute<InspectionSuccessScreenRouteProps>();
    // const {inspection} = route.params;

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

    const handleClose = () => {
      // const response = {
      //   status: SdkResponseStatus.success,
      //   // inspection: inspection,
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
              source={require('../../assets/lottie/purchase_successful.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </View>
          <SemiBoldText
            title={
              globalObject.transactionType == TransactionType.claim
                ? 'Claim Successfully Submitted'
                : 'Inspection Successful'
            }
            fontSize={19}
            color={DynamicColors().primaryBrandColor}
            textAlign="center"
          />
          <VerticalSpacer height={30} />
          <RegularText
            title={
              globalObject.transactionType == TransactionType.claim
                ? "Great! Your inspection has concluded successfully. Please check your email for the inspection's preview and summary."
                : 'Your insurance policy has been activated. Check your email for further information about your policy.'
            }
            fontSize={17}
            color={CustomColors.blackColor}
            textAlign="center"
          />
          {globalObject.transactionType == TransactionType.claim ? (
            <View style={styles.footerContainer}>
              <VerticalSpacer height={30} />

              <View style={styles.noteContainer}>
                <View style={styles.paddingContainer}>
                  <Text style={styles.noteText}>
                    <Text
                      style={[
                        customTextStyles.regular,
                        { fontSize: 14, color: CustomColors.blackTextColor },
                      ]}
                    >
                      Note:
                    </Text>
                    <Text
                      style={[
                        customTextStyles.regular,
                        { fontSize: 13, color: CustomColors.blackTextColor },
                      ]}
                    >
                      {
                        ' Your claim is currently under review. Our team is carefully assessing all the details to ensure a thorough evaluation.\nOnce your claim has been approved, you will receive a notification via email with further instructions and information on the next steps.'
                      }
                      {/* Your claim is currently under review. Our team is carefully
                  assessing all the details to ensure a thorough evaluation.
                  Once your claim has been approved, you will receive a
                  notification via email with further instructions and
                  information on the next steps. */}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.middleSpacer}></View>
          <View style={styles.buttonContainer}></View>
          <CustomButton
            title={
              globalObject.transactionType == TransactionType.claim
                ? 'Done'
                : 'Close'
            }
            onPress={handleClose}
          />
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

  footerContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  noteContainer: {
    backgroundColor: CustomColors.lightOrangeColor,
    borderWidth: 0.4,
    borderColor: CustomColors.orangeColor,
  },
  paddingContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  noteText: {
    textAlign: 'left' as const, // Align left, or use 'center' if desired
    lineHeight: 22, // Assuming a 1.6 height, adjust if needed
  },
};

export default InspectionSuccessScreen;
