import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';
import GridOptionsContainer from './components/GridOptionsContainer';
import { useNavigation } from '@react-navigation/native';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';

import PoweredByFooter from '../../components/PoweredByFooter';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import { SdkOptions } from '../../utils/enums';
import BuyIcon from '../../assets/icons/buy_icon.svg';
import RenewIcon from '../../assets/icons/renew_icon.svg';
import ManageIcon from '../../assets/icons/manage_icon.svg';
import ClaimIcon from '../../assets/icons/claim_icon.svg';
import { SemiBoldText } from '../../components/CustomText';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigatorStackList';
// import type { RootStackParamList } from 'utils/navigatorStackList';

const GridSdkOptionsScreen: React.FC = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const [selectedOption, setSelectedOption] = useState<SdkOptions>(
    SdkOptions.buy
  );

  const navigation = useNavigation<NavigationProps>();

  const handleContinue = () => {
    navigation.navigate('GridViewProductListScreen');
  };

  return (
    <View style={styles.container}>
      <VerticalSpacer height={20} />
      <CustomAppBar
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />
      <View style={styles.contentContainer}>
        <VerticalSpacer height={40} />
        <SemiBoldText
          title="Select an option to proceed"
          fontSize={22}
          textAlign="center"
        />
        <VerticalSpacer height={40} />

        {/* First Row */}
        <View style={styles.row}>
          <GridOptionsContainer
            title="Buy Insurance"
            subTitle="Get Insurance for yourself, family and loved ones"
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
          <HorizontalSpacer width={15} />
          <GridOptionsContainer
            title="Renew Insurance"
            subTitle="Seamlessly renew your Insurance"
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
        </View>

        <VerticalSpacer height={15} />

        {/* Second Row */}
        <View style={styles.row}>
          <GridOptionsContainer
            title="Manage Plan"
            subTitle="Seamlessly manage your insurance plan"
            icon={
              <ManageIcon
                width={22}
                height={22}
                // fill={DynamicColors().primaryBrandColor}
                stroke={DynamicColors().primaryBrandColor}
              />
            }
            isSelected={selectedOption === SdkOptions.manage}
            onTap={() => setSelectedOption(SdkOptions.manage)}
          />
          <HorizontalSpacer width={15} />
          <GridOptionsContainer
            title="Make Claim"
            subTitle="Seamlessly lodge a claim"
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
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <CustomButton
            title="Continue"
            onPress={
              selectedOption !== SdkOptions.buy ? undefined : handleContinue
            }
          />

          <PoweredByFooter />
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: CustomColors.blackTextColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default GridSdkOptionsScreen;
