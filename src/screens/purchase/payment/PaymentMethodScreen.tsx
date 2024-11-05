import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {
//   CustomAppbar,
//   CustomButton,
//   PaymentDetailsContainer,
//   PoweredByFooter,
//   GridOptionsContainer,
//   ListOptionsContainer,
// } from './your-custom-components';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import { PaymentMethod } from '../../../utils/enums';
import TransferIcon from '../../../assets/icons/transfer_icon.svg';
import UssdIcon from '../../../assets/icons/ussd_icon.svg';
// import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';
import { PaymentViewModel } from './PaymentViewModel';
import GridOptionsContainer from '../../initialization/components/GridOptionsContainer';
import ListOptionsContainer from '../../initialization/components/ListOptionsContainer';
import CustomButton from '../../../components/CustomButton';
import PoweredByFooter from '../../../components/PoweredByFooter';
import CustomAppBar from '../../../components/CustomAppBar';
import { type LoadStore, useLoadStore } from '../../../store/loadStore';
import PaymentDetailsContainer from '../../../components/PaymentDetailsContainer';
import { SemiBoldText } from '../../../components/CustomText';
import { DynamicColors } from '../../../constants/CustomColors';
import globalObject from '../../../store/globalObject';
// import TransferIcon from '../../../assets/icons/transfer_icon.svg';
// import TransferIcon from '../../../assets/icons/transfer_icon.svg';
// import { usePaymentStore } from './path-to-your-zustand-store';
// import { PaymentMethod } from './path-to-your-enums';
// import { Text, Spacer } from './path-to-your-text-and-spacing-components';
// import { ConstantString } from './path-to-your-constants';
// import { useFormStore } from './path-to-your-form-store';

const PaymentMethodScreen: React.FC = () => {
  const navigation = useNavigation();

  const paymentVM = PaymentViewModel();
  //   const {isLoading, fetchUssdProviders, initiateGatewayPurchase} =
  //     usePaymentStore();

  // const global = useGlobalStore((state: GlobalStore) => state);
  const loadingState = useLoadStore((state: LoadStore) => state);
  const [selectedOption, setSelectedOption] = useState<PaymentMethod>(
    PaymentMethod.transfer
  );
  //   const initResponse = useFormStore((state) => state.initResponse); // Assuming you have an initResponse state in your Zustand form store

  const handleContinue = () => {
    if (selectedOption === PaymentMethod.ussd) {
      paymentVM.fetchUssdProviders(loadingState);
    } else {
      paymentVM.initiateGatewayPurchase(selectedOption, loadingState);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <VerticalSpacer height={20} />
        <CustomAppBar onBackTap={() => navigation.goBack()} />
        <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
          <PaymentDetailsContainer />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <VerticalSpacer height={40} />
          {/* <Text>""</Text> */}
          {/* <Text>  Select Payment method </Text> */}
          <SemiBoldText title="Select Payment method " fontSize={21} />
          <VerticalSpacer height={40} />

          <ScrollView>
            {globalObject.businessDetails?.layout?.toLowerCase() === 'grid' ? (
              <View style={{ flexDirection: 'row' }}>
                <GridOptionsContainer
                  title="Transfer"
                  subTitle="Send to a bank account"
                  icon={
                    <TransferIcon
                      width={22}
                      height={22}
                      fill={DynamicColors().primaryBrandColor}
                    />
                  }
                  isSelected={selectedOption === PaymentMethod.transfer}
                  onTap={() => setSelectedOption(PaymentMethod.transfer)}
                />
                <HorizontalSpacer width={20} />
                <GridOptionsContainer
                  title="USSD"
                  subTitle="Select any bank to generate USSD"
                  icon={
                    <UssdIcon
                      width={22}
                      height={22}
                      fill={DynamicColors().primaryBrandColor}
                    />
                  }
                  isSelected={selectedOption === PaymentMethod.ussd}
                  onTap={() => setSelectedOption(PaymentMethod.ussd)}
                />
              </View>
            ) : (
              <>
                <ListOptionsContainer
                  title="Transfer"
                  subTitle="Send to a bank account"
                  icon={<TransferIcon width={22} height={22} />}
                  isSelected={selectedOption === PaymentMethod.transfer}
                  onTap={() => setSelectedOption(PaymentMethod.transfer)}
                />
                <VerticalSpacer height={25} />
                <ListOptionsContainer
                  title="USSD"
                  subTitle="Select any bank to generate USSD"
                  icon={<UssdIcon width={22} height={22} />}
                  isSelected={selectedOption === PaymentMethod.ussd}
                  onTap={() => setSelectedOption(PaymentMethod.ussd)}
                />
              </>
            )}
          </ScrollView>
          <VerticalSpacer height={25} />

          <CustomButton
            title="Continue"
            isLoading={loadingState.paymentVmLoading}
            onPress={handleContinue}
          />
          <PoweredByFooter />
          <VerticalSpacer height={15} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;
