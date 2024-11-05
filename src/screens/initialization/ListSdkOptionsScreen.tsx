import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';
import ListOptionsContainer from './components/ListOptionsContainer';
import { SdkOptions } from '../../utils/enums';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import BuyIcon from '../../assets/icons/buy_icon.svg';
import RenewIcon from '../../assets/icons/renew_icon.svg';
import ManageIcon from '../../assets/icons/manage_icon.svg';
import ClaimIcon from '../../assets/icons/claim_icon.svg';
import { SemiBoldText } from '../../components/CustomText';
import PoweredByFooter from '../../components/PoweredByFooter';
import { VerticalSpacer } from '../../components/Spacer';
import globalObject from '../../store/globalObject';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigatorStackList';
// import type { RootStackParamList } from 'utils/navigatorStackList';

const ListSdkOptionsScreen: React.FC = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();
  const [selectedOption, setSelectedOption] = useState<SdkOptions>(
    SdkOptions.buy
  );

  const handleContinue = () => {
    navigation.navigate('ListViewProductListScreen');
  };

  return (
    <View style={styles.container}>
      <VerticalSpacer height={10} />
      <CustomAppBar
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />

      <View style={styles.contentContainer}>
        <VerticalSpacer height={15} />
        <SemiBoldText
          title="Select an option to proceed"
          fontSize={19}
          textAlign="center"
        />
        <VerticalSpacer height={40} />

        <ScrollView contentContainerStyle={styles.scrollView}>
          <ListOptionsContainer
            title="Buy Insurance"
            subTitle={
              globalObject.businessDetails?.sdkMenu1SupportingText ??
              'Get Insurance for yourself, family, and loved ones.'
            }
            icon={
              <BuyIcon
                width={22}
                height={22}
                fill={DynamicColors().primaryBrandColor}
              />
            }
            isSelected={selectedOption === SdkOptions.buy}
            onTap={() => setSelectedOption(SdkOptions.buy)}
          />
          <View style={styles.spacer} />
          <ListOptionsContainer
            title="Renew Insurance"
            subTitle={
              globalObject.businessDetails?.sdkMenu2SupportingText ??
              'Seamlessly renew your Insurance'
            }
            icon={
              <RenewIcon
                width={22}
                height={22}
                fill={DynamicColors().primaryBrandColor}
              />
            }
            isSelected={selectedOption === SdkOptions.renew}
            onTap={() => setSelectedOption(SdkOptions.renew)}
          />
          <View style={styles.spacer} />
          <ListOptionsContainer
            title="Manage Plan"
            subTitle={
              globalObject.businessDetails?.sdkMenu3SupportingText ??
              'Seamlessly manage your insurance plan'
            }
            icon={
              <ManageIcon
                width={22}
                height={22}
                stroke={DynamicColors().primaryBrandColor}
              />
            }
            isSelected={selectedOption === SdkOptions.manage}
            onTap={() => setSelectedOption(SdkOptions.manage)}
          />
          <View style={styles.spacer} />
          <ListOptionsContainer
            title="Make Claim"
            subTitle={
              globalObject.businessDetails?.sdkMenu4SupportingText ??
              'Seamlessly lodge a claim'
            }
            icon={
              <ClaimIcon
                width={22}
                height={22}
                fill={DynamicColors().primaryBrandColor}
              />
            }
            isSelected={selectedOption === SdkOptions.claim}
            onTap={() => setSelectedOption(SdkOptions.claim)}
          />
        </ScrollView>

        <CustomButton
          title="Continue"
          onPress={
            selectedOption !== SdkOptions.buy ? undefined : handleContinue
          }
        />

        <PoweredByFooter></PoweredByFooter>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 50,
  },
  scrollView: {
    paddingVertical: 10,
  },
  spacer: {
    height: 15,
  },
  footer: {
    marginTop: 25,
    alignItems: 'center',
  },
});

export default ListSdkOptionsScreen;
