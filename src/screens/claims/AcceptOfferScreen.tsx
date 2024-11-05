import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import CustomAppBar from '../../components/CustomAppBar';
import BankListDropdownField from './components/BankListDropdownField';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import { ClaimModel } from '../../models/ClaimModel';
import { type RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import { ClaimViewModel } from './ClaimViewModel';
import { type ClaimStore, useClaimStore } from '../../store/claimStore';
import ValidatedCustomFormTextField from '../../components/ValidatedCustomFormTextField';
import { useForm } from 'react-hook-form';
import { ToastStatus } from '../../utils/enums';
import GenericSimplePopup from '../../popups/GenericSimplePopup';
import { BankModel } from '../../models/BankModel';
import { RegularText, SemiBoldText } from '../../components/CustomText';
import { VerticalSpacer } from '../../components/Spacer';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { Circle } from 'react-native-animated-spinkit';
import { ColorUtils } from '../../utils/colorUtils';
import { showToast } from '../../components/CustomToast';

interface AcceptOfferScreenProps {
  claim: ClaimModel;
  banks: Array<BankModel>;
}

type AcceptOfferScreenRouteProps = RouteProp<
  RootStackParamList,
  'AcceptOfferScreen'
>;

const AcceptOfferScreen: React.FC<AcceptOfferScreenProps> = () => {
  const route = useRoute<AcceptOfferScreenRouteProps>();
  const { claim, banks } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { control } = useForm();
  const [isBankLoading, setIsBankLoading] = useState(false);
  const claimStore = useClaimStore((state: ClaimStore) => state);

  const [accountNumber, setAccountNumber] = useState('');
  const claimVm = ClaimViewModel();
  const [isSimplePopupVisible, setSimplePopupVisible] = useState(false);

  const handleContinue = () => {
    if (!claimStore.selectedBank || !claimStore.accountDetails) {
      showToast(ToastStatus.failed, 'Provide valid account details');
      return;
    }

    setSimplePopupVisible(true);
  };

  const handleAcceptClaimOffer = async () => {
    setIsLoading(true);

    await claimVm.acceptClaimOffer(
      claim,
      claimStore.accountDetails?.accountNumber ?? '',
      claimStore.selectedBank?.code ?? '',
      claimStore.accountDetails?.accountName ?? '',
      claimStore.selectedBank?.name ?? ''
    );
    setIsLoading(false);
  };

  const handleVerifyBankAccount = async (value: string) => {
    setIsBankLoading(true);
    await claimVm.verifyBankAccount(
      value,
      claimStore.selectedBank?.code ?? '',
      claimStore
    );
    setIsBankLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar showLogo={false} onBackTap={() => {}} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SemiBoldText title="Accept offer" fontSize={21} textAlign="center" />
        <VerticalSpacer height={20} />

        <View style={styles.card}>
          <View style={{ paddingRight: 65 }}>
            <RegularText
              title="To proceed with the settlement, please provide your account details
            to receive the offer."
              fontSize={15}
              color={CustomColors.formTitleColor}
              lineHeight={22}
            />
          </View>
          <VerticalSpacer height={20} />

          <Image
            style={styles.invoiceImage}
            source={require('../../assets/images/invoice_img.webp')} // Replace with actual image
          />
        </View>
        <VerticalSpacer height={20} />

        <BankListDropdownField
          fieldName="Select bank"
          label="Select bank"
          description="Select bank"
          items={banks}
          selectedItem={claimStore.selectedBank}
          onItemSelected={
            (bank) => claimStore.setSelectedBank(bank)

            //  onItemSelected = (bank: BankModel) => {
            //   claimStore.setSelectedBank(prevSelectedBank => {
            //     // You can add some conditional logic here based on `prevSelectedBank`
            //     return bank;
            //   });
            // };
          }
        />
        <VerticalSpacer height={10} />
        <ValidatedCustomFormTextField
          name={'Account Number'}
          title={'Enter account number'}
          hintText={'Enter account number'}
          isNumber={true}
          value={accountNumber}
          maxLength={10}
          control={control}
          onChanged={(value: string) => {
            setAccountNumber(value);
            claimStore.setAccountDetails(null);
            if (value.length === 10 && claimStore.selectedBank) {
              handleVerifyBankAccount(value);
            }
          }}
          // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
          minMaxConstraint={'length'}
          minLength={10}
          suffix={
            claimStore.accountDetails?.accountName &&
            accountNumber.length == 10 ? (
              <View style={styles.suffixContainer}>
                <View style={styles.accountNameContainer}>
                  <SemiBoldText
                    title={claimStore.accountDetails.accountName.toLowerCase()}
                    color={CustomColors.lightBlackColor}
                  />
                </View>
              </View>
            ) : isBankLoading ? (
              <View style={styles.loadingContainer}>
                <Circle size={25} color={DynamicColors().primaryBrandColor} />
                <View style={{ width: 5 }} />
              </View>
            ) : null
          }
        />
      </ScrollView>
      <View style={{ flex: 1 }} />
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton
          title="Continue"
          isLoading={isLoading}
          onPress={handleContinue}
        />

        <PoweredByFooter />
        <VerticalSpacer height={20} />
      </View>
      <GenericSimplePopup
        isVisible={isSimplePopupVisible}
        title="Accept Offer"
        content={`Your claim offer will be made to the bank information supplied (${claimStore.selectedBank?.name}, ${claimStore.accountDetails?.accountName}, ${claimStore.accountDetails?.accountNumber}) do you want to continue with this action?`}
        okText="Yes, proceed"
        policyNumber="12345"
        onClose={() => setSimplePopupVisible(false)}
        onOkPressed={() => {
          handleAcceptClaimOffer();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  offerInfoContainer: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    position: 'relative',
  },
  offerInfoText: {
    fontSize: 14,
    color: '#333',
  },
  offerImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },

  card: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 8,
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

  suffixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountNameContainer: {
    backgroundColor: ColorUtils.hexToRgba(
      `${CustomColors.productBorderColor}`,
      0.5
    ), // Assuming CustomColors.productBorderColor.withOpacity(0.5)
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  accountNameText: {
    color: '#4a4a4a', // Assuming CustomColors.lightBlackColor
    fontWeight: '600', // Assuming semiBoldText equivalent
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AcceptOfferScreen;
