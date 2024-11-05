import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  //   CheckBox,
  TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import { StringUtils } from '../../utils/StringUtils';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import { ClaimModel } from '../../models/ClaimModel';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClaimViewModel } from './ClaimViewModel';
import GenericBottomSheet from '../../bottom_sheets/GenericBottomSheet';
import CustomAppBar from '../../components/CustomAppBar';
import {
  SemiBoldText,
  RegularText,
  customTextStyles,
} from '../../components/CustomText';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import GenericSimplePopup from '../../popups/GenericSimplePopup';
import InfoRowComponent from './components/InfoRowComponent';
import RejectOfferWidget from './components/RejectOfferWidget';
import { useForm } from 'react-hook-form';
import { type ClaimStore, useClaimStore } from '../../store/claimStore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface OfferSettlementScreenProps {
  claim: ClaimModel; // Adjust the type of claim based on your model
}

type RepairEstimateScreenRouteProps = RouteProp<
  RootStackParamList,
  'OfferSettlementScreen'
>;

const OfferSettlementScreen: React.FC<OfferSettlementScreenProps> = () => {
  const route = useRoute<RepairEstimateScreenRouteProps>();

  const { claim } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const claimStore = useClaimStore((state: ClaimStore) => state);
  const [isSimplePopupVisible, setSimplePopupVisible] = useState(false);

  const [reason, setReason] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const claimVm = ClaimViewModel();
  const { control, handleSubmit } = useForm();

  const handleRejectOffer = async () => {
    setIsLoading(true);
    await claimVm.rejectClaimOffer(claim, reason ?? '');
    setIsLoading(false);
  };

  const handleAcceptOffer = async () => {
    if (!isChecked) {
      return;
    }

    if (StringUtils.isNullOrEmptyList(claimStore.bankList)) {
      setIsLoading(true);
      await claimVm.getBankList(claim, true, claimStore);
      setIsLoading(false);
    } else {
      navigation.navigate('AcceptOfferScreen', {
        claim: claim,
        banks: claimStore.bankList,
      });
    }

    // Fetch banks from Zustand store
  };

  return (
    <View style={styles.container}>
      {/* <VerticalSpacer height={20} /> */}
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />
      <VerticalSpacer height={30} />
      <View style={styles.paddingContainer}>
        <SemiBoldText
          title="Settlement of offer"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={30} />
        <View style={styles.card}>
          <View style={{ paddingRight: 65 }}>
            <RegularText
              title="Following the submission of all claim sustaining documents in respect
          of your vehicle accidental damage claim, we are pleased to communicate
          our settlement offer as stated below:"
              fontSize={15}
              color={CustomColors.formTitleColor}
              lineHeight={20}
            />
          </View>
          <VerticalSpacer height={20} />

          <Image
            style={styles.invoiceImage}
            source={require('../../assets/images/invoice_img.webp')} // Replace with actual image
          />
        </View>
        <VerticalSpacer height={5} />
        <View style={styles.detailsContainer}>
          <InfoRowComponent
            title1="Provider"
            subtitle1={claim.policy?.provider?.companyName || ''}
            title2="Policy number"
            subtitle2={claim.policy?.meta?.policy_number || ''}
          />

          <InfoRowComponent
            title1="Betterment deduction"
            subtitle1={`₦ ${StringUtils.formatPriceWithComma(
              claim.bettermentDeductionAmount || ''
            )}`}
            title2="Less 10% policy excess"
            subtitle2={`₦ ${StringUtils.formatPriceWithComma(
              claim.excessDeductionAmount || ''
            )}`}
          />

          <RegularText
            title={'Net offer'}
            fontSize={15}
            color={DynamicColors().primaryBrandColor}
          />

          <VerticalSpacer height={4} />
          <SemiBoldText
            title={`₦ ${StringUtils.formatPriceWithComma(
              claim.offerAmount || ''
            )}`}
            fontSize={15}
            color={CustomColors.backTextColor}
          />

          <View style={styles.detailRow}>
            <Text style={styles.netOfferLabel}></Text>
            <Text style={styles.netOfferValue}></Text>
          </View>
        </View>

        <View style={{ flex: 1 }}></View>

        {/* <View style={styles.spacer20} /> */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
        >
          <BouncyCheckbox
            isChecked={isChecked}
            disableText
            fillColor={DynamicColors().primaryBrandColor}
            size={20}
            useBuiltInState={false}
            innerIconStyle={{
              borderRadius: 0,
              borderColor: CustomColors.checkBoxBorderColor,
            }}
            iconImageStyle={{
              width: 13,
              height: 13,
              borderRadius: 0, // Force square for inner icon
            }}
            // iconStyle={{ borderColor: 'green' }}
            iconStyle={{
              borderColor: DynamicColors().primaryBrandColor,
              borderRadius: 0,
            }}
            style={{
              borderRadius: 0,
            }}
            onPress={(_checked: boolean) => {
              // These two should be same value

              setIsChecked(!isChecked);
            }}
          />
          <HorizontalSpacer width={10} />

          <Text
            style={[
              customTextStyles.regular,
              { fontSize: 14, color: CustomColors.blackTextColor },
            ]}
          >
            I have Read and Understand this{' '}
            <Text
              style={[
                customTextStyles.regular,
                { fontSize: 14, color: DynamicColors().primaryBrandColor },
              ]}
              onPress={() => {
                /* Show Privacy Policy */
              }}
            >
              Privacy.
            </Text>
          </Text>
        </TouchableOpacity>
        <VerticalSpacer height={10} />

        <View style={styles.newButtonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Reject offer"
              buttonColor={CustomColors.dividerGreyColor}
              textColor={CustomColors.backTextColor}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
          <HorizontalSpacer width={10} />

          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Accept offer"
              isLoading={isLoading}
              onPress={
                isChecked ? handleAcceptOffer : undefined
                // !amount || !selectedFile
                //   ? undefined
                //   : handleSubmit(verifyUserInput)
              }
            />
          </View>
        </View>

        <VerticalSpacer height={5} />
        <PoweredByFooter />
        <VerticalSpacer height={30} />
        <GenericSimplePopup
          isVisible={isSimplePopupVisible}
          title="Estimate of repair"
          content="You are about to send an estimate of repair, are you sure you want to proceed with this action?"
          okText="Yes, proceed"
          policyNumber="12345"
          onClose={() => setSimplePopupVisible(false)}
          onOkPressed={() => {}}
        />
        <GenericBottomSheet
          title="Reject Offer"
          isVisible={isModalVisible}
          content={
            <RejectOfferWidget
              reason={reason}
              setReason={setReason}
              control={control}
            />
          }
          isLoading={isLoading}
          buttonColor={CustomColors.redExitColor}
          onClose={() => setModalVisible(false)}
          onOkPressed={handleSubmit(handleRejectOffer)}
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   appBarContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   backText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//     borderRadius: 8,
//   },
//   bodyText: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//   },
//   invoiceImage: {
//     width: 60,
//     height: 60,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
//   detailsContainer: {
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   label: {
//     fontSize: 14,
//     color: '#666',
//   },
//   value: {
//     fontSize: 14,
//     color: '#000',
//   },
//   netOfferLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#4CAF50',
//   },
//   netOfferValue: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#000',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkboxText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: '#000',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bodyText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  invoiceImage: {
    width: 65,
    height: 65,
    marginTop: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  dottedBorder: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  uploadContainer: {
    alignItems: 'center',
    padding: 10,
  },
  uploadIcon: {
    width: 60,
    height: 60,
  },
  uploadText: {
    fontSize: 14.5,
    textAlign: 'center',
    color: '#333',
  },
  fileText: {
    fontSize: 14.5,
    textAlign: 'center',
    color: '#4CAF50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 35,
  },
  buttonWrapper: {
    flex: 1,
    // marginHorizontal: 5,
  },

  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  detailsContainer: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
  netOfferLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  netOfferValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OfferSettlementScreen;
