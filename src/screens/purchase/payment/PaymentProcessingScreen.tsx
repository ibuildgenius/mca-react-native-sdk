import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'; // Navigation hook
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastStatus } from '../../../utils/enums';

import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { PurchaseinitializationModel } from '../../../models/PurchaseinitializationModel';
import CustomAppBar from '../../../components/CustomAppBar';
import PaymentDetailsContainer from '../../../components/PaymentDetailsContainer';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import SentGreenIcon from '../../../assets/icons/sent_green_icon.svg';
import ReceivedIcon from '../../../assets/icons/received_icon.svg';

import ReconfirmIcon from '../../../assets/icons/reconfirm_icon.svg';
import RoundInfoOutlined from '../../../assets/icons/round_info_outlined.svg';
import AnimatedProgressBar from '../../../components/AnimatedProgressBar';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
  W500Text,
} from '../../../components/CustomText';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { useLoadStore, type LoadStore } from '../../../store/loadStore';
import { PaymentViewModel } from './PaymentViewModel';
import CopyIcon from '../../../assets/icons/copy_icon.svg';
import { Circle } from 'react-native-animated-spinkit';
import { ColorUtils } from '../../../utils/colorUtils';
import { showToast } from '../../../components/CustomToast';

interface PaymentProcessingScreenProps {
  purchaseDetails: PurchaseinitializationModel;
  paymentMethod: 'transfer' | 'ussd'; // Assuming you have these two options for simplicity
}

type PaymentProcessingScreenRouteProps = RouteProp<
  RootStackParamList,
  'PaymentProcessingScreen'
>;

const PaymentProcessingScreen: React.FC<PaymentProcessingScreenProps> = () => {
  const paymentVM = PaymentViewModel();
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(1800); // 30 minutes
  const [_displayText, setDisplayText] = useState('Copy details');
  const navigation = useNavigation();

  const route = useRoute<PaymentProcessingScreenRouteProps>();
  const { purchaseDetails, paymentMethod } = route.params;
  const loadingState = useLoadStore((state: LoadStore) => state);

  useEffect(() => {
    setDisplayText(
      paymentMethod === 'transfer' ? 'Copy details' : 'Copy USSD code'
    );

    const timer = setInterval(() => {
      setRemainingTimeInSeconds((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentMethod]);
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  const handleCopy = () => {
    const textToCopy =
      paymentMethod === 'transfer'
        ? purchaseDetails.accountNumber
        : purchaseDetails.paymentCode;
    Clipboard.setString(textToCopy ?? '');
    showToast(ToastStatus.success, 'Copied to clipboard');
  };

  const handlePaymentVerification = () => {
    paymentVM.verifyPayment(
      purchaseDetails.reference ?? '',
      paymentMethod,
      purchaseDetails,
      loadingState
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Appbar */}

      <View style={styles.appBar}>
        <CustomAppBar onBackTap={() => navigation.goBack()} />
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
        <PaymentDetailsContainer />
      </View>
      <VerticalSpacer height={40} />

      <View style={styles.content}>
        <View style={styles.paymentDetailsContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: ColorUtils.hexToRgba(
                      CustomColors.lightGreenBgColor,
                      0.15
                    ),
                  },
                ]}
              >
                <SentGreenIcon
                  width={22}
                  height={22}
                  fill={DynamicColors().primaryBrandColor}
                />
              </View>
              <VerticalSpacer height={5} />
              <W500Text
                title="Sent"
                fontSize={16}
                color={CustomColors.progressGreenTextColor}
              />
            </View>

            <View style={styles.horizontalSpacer} />

            <View style={styles.progressContainer}>
              <View style={styles.verticalSpacer} />
              <AnimatedProgressBar />
              <View style={styles.verticalSpacer} />
              <W500Text
                title={formatTime(remainingTimeInSeconds)}
                fontSize={16}
                color={
                  remainingTimeInSeconds > 600
                    ? CustomColors.progressGreenTextColor
                    : remainingTimeInSeconds > 300
                      ? CustomColors.orangeColor
                      : CustomColors.redExitColor
                }
                textAlign="center"
              />
            </View>

            <View style={styles.horizontalSpacer} />

            <View style={styles.columnContainer}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: ColorUtils.hexToRgba(
                      CustomColors.lightOrangeBgColor,
                      0.15
                    ),
                  },
                ]}
              >
                <ReceivedIcon
                  width={22}
                  height={22}
                  // fill={DynamicColors().primaryBrandColor}
                />
              </View>

              <VerticalSpacer height={5} />
              <W500Text
                title="Received"
                fontSize={15}
                color={CustomColors.blackColor}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }} />

        <View style={styles.payingToContainer}>
          <RegularText
            title="Paying to"
            fontSize={14}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={15} />

          <SemiBoldText
            title={
              paymentMethod === 'transfer' ? purchaseDetails.bank || '' : ''
            }
            fontSize={17}
            color={CustomColors.blackTextColor}
          />

          <View style={styles.row}>
            <TouchableOpacity onPress={handleCopy}>
              <View style={styles.row}>
                <SemiBoldText
                  title={
                    paymentMethod === 'transfer'
                      ? purchaseDetails.accountNumber || ''
                      : purchaseDetails.paymentCode || ''
                  }
                  fontSize={18}
                  color={DynamicColors().primaryBrandColor}
                />
                <HorizontalSpacer width={5} />

                <CopyIcon
                  width={14}
                  height={14}
                  color={CustomColors.greyTextColor}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loadingState.paymentVmLoading}
              onPress={() => {
                if (!loadingState.paymentVmLoading) {
                  handlePaymentVerification();
                }
              }}
            >
              <View style={styles.row}>
                {loadingState.paymentVmLoading ? (
                  <Circle size={20} color={DynamicColors().primaryBrandColor} />
                ) : (
                  <ReconfirmIcon
                    width={20}
                    height={20}
                    // fill={DynamicColors().primaryBrandColor}
                  />
                )}
                <HorizontalSpacer width={5} />
                <W500Text
                  title="Re-Confirm"
                  fontSize={17}
                  color={CustomColors.formTitleColor}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <RoundInfoOutlined
              width={22}
              height={22}
              // fill={DynamicColors().primaryBrandColor}
            />
          </View>

          <Text style={[customTextStyles.regular, styles.description]}>
            Please wait for us to confirm your payment. Don't close this window
            while we check your transaction. If there's any delay, contact our
            support team at{' '}
            <Text style={[customTextStyles.semiBold, styles.email]}>
              support@mycover.ai
            </Text>
            .
          </Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      {/* <View style={{flex: 1}} /> */}

      {/* Powered by footer */}
      <PoweredByFooter />
      <VerticalSpacer height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  appBar: {
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  backText: {
    fontSize: 16,
    color: DynamicColors().primaryBrandColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  paymentDetailsContainer: {
    marginBottom: 40,
  },
  headingText: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
  bankNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: CustomColors.blackTextColor,
  },
  accountNumberText: {
    fontSize: 16,
    color: DynamicColors().primaryBrandColor,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 16,
  },
  normalText: {
    color: CustomColors.progressGreenTextColor,
  },
  warningText: {
    color: CustomColors.redExitColor,
  },
  reconfirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  reconfirmText: {
    fontSize: 16,
    marginLeft: 10,
    color: CustomColors.formTitleColor,
  },
  instructionsContainer: {
    paddingVertical: 20,
  },
  instructionsText: {
    fontSize: 14,
    color: CustomColors.lightBlackColor,
  },
  supportText: {
    fontWeight: '600',
    color: DynamicColors().primaryBrandColor,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: CustomColors.greyTextColor,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21, // Circle shape
    // opacity: 0.15,
  },
  statusText: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: '500', // equivalent to w500Text
  },
  horizontalSpacer: {
    width: 10,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  verticalSpacer: {
    height: 14,
  },
  // timerText: {
  //   fontSize: 16,
  //   fontWeight: '500', // equivalent to w500Text
  // },

  payingToContainer: {
    width: '100%',
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  label: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
  bankName: {
    fontSize: 15,
    color: CustomColors.blackTextColor,
    fontWeight: '600',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
  },
  copyText: {
    fontSize: 16,
    color: DynamicColors().primaryBrandColor,
  },
  icon: {
    marginLeft: 5,
    color: CustomColors.greyTextColor,
  },

  divider: {
    borderBottomColor: CustomColors.lightDividerColor,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  infoRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontSize: 15,
    color: CustomColors.lightBlackColor,
    marginTop: 20,
  },
  email: {
    fontSize: 15,
    fontWeight: '600',
    color: DynamicColors().primaryBrandColor,
  },
});

export default PaymentProcessingScreen;

//

// <ScrollView style={styles.content}>
//         <View style={styles.paymentDetailsContainer}>
//           <Text style={styles.headingText}>Paying to:</Text>
//           <Text style={styles.bankNameText}>
//             {paymentMethod === 'transfer'
//               ? purchaseDetails.bank
//               : 'Your Bank Name'}
//           </Text>
//           <TouchableOpacity onPress={handleCopy} style={styles.copyContainer}>
//             <Text style={styles.accountNumberText}>
//               {paymentMethod === 'transfer'
//                 ? purchaseDetails.accountNumber
//                 : purchaseDetails.paymentCode}
//             </Text>
//             <Svg width={16} height={16} viewBox="0 0 24 24">
//               <Path d="M..." fill={CustomColors.greyTextColor} />
//             </Svg>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.timerContainer}>
//           <Text
//             style={[
//               styles.timerText,
//               remainingTimeInSeconds <= 300
//                 ? styles.warningText
//                 : styles.normalText,
//             ]}>
//             {formatTime(remainingTimeInSeconds)}
//           </Text>
//         </View>

//   <TouchableOpacity
//     style={styles.reconfirmButton}
//     onPress={() => {
//       // Handle re-confirm logic here
//     }}>
//     <Svg width={16} height={16} viewBox="0 0 24 24">
//       <Path d="M..." fill={CustomColors.greyTextColor} />
//     </Svg>
//     <Text style={styles.reconfirmText}>Re-Confirm</Text>
//   </TouchableOpacity>

//   {/* Instructions */}
//   <View style={styles.instructionsContainer}>
//     <Text style={styles.instructionsText}>
//       Please wait while we confirm your payment. If there's a delay,
//       contact support at{' '}
//       <Text style={styles.supportText}>support@mycover.ai</Text>
//     </Text>
//   </View>
// </ScrollView>
