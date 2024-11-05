import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
// import { Checkbox } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';

import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { useGlobalStore } from '../../store/globalStore';
import { TransactionType } from '../../utils/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../components/CustomText';
import globalObject from '../../store/globalObject';
import GenericBottomSheet from '../../bottom_sheets/GenericBottomSheet';
import PrivacyPolicyContainer from '../../components/PrivacyPolicyContainer';
import { HorizontalSpacer } from '../../components/Spacer';

const WelcomeScreen: React.FC = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const transactionType = useGlobalStore((state: any) => state.transactionType);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  // const closeSDK = () => {
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar showHelp={true} showLogo={true} showBackButton={false} />
      <View style={styles.scrollView}>
        <View />

        <View style={styles.content}>
          <View style={styles.spacer40} />
          <View style={styles.imageContainer}>
            {globalObject.businessDetails == null ||
            !globalObject.businessDetails.sdkBannerPurchase ? (
              <Image
                source={require('../../assets/images/intro_image.jpg')}
                style={styles.bannerImage}
              />
            ) : (
              <Image
                source={{ uri: globalObject.businessDetails.sdkBannerPurchase }}
                style={styles.bannerImage}
              />
            )}
          </View>

          <View style={styles.spacer30} />
          <SemiBoldText
            title={
              globalObject.businessDetails?.sdkWelcomeScreenHeaderPrePurchase ??
              'Insurance by Cowrywise'
            }
            fontSize={21}
            color={CustomColors.blackTextColor}
          />
          <View style={styles.spacer15} />

          <RegularText
            title={
              globalObject.businessDetails?.sdkWelcomeScreenBodyPrePurchase ??
              'Insurance by cowrywise powered by mycover.ai gives you everything you need about insurance ranging from Health product to more than thousands plus products.'
            }
            fontSize={15}
            color={CustomColors.blackTextColor}
            textAlign="center"
          />

          <View style={{ flex: 0.2 }} />

          {/* <View style={styles.spacer20} /> */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            // onPress={() => setIsChecked(!isChecked)}
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
                setIsChecked(!isChecked);
              }}
            />
            <HorizontalSpacer width={10} />

            {/* <CheckBox
            value={false}
            // onValueChange={setIsChecked}
            onValueChange={(value) => {
    
              // return setIsChecked(value);
            }}

            // status={isChecked ? 'checked' : 'unchecked'}
            // onPress={() => {
            //   setIsChecked(!isChecked);
            // }}
            // tintColors={{
            //   true: DynamicColors().primaryBrandColor,
            //   false: CustomColors.checkBoxBorderColor,
            // }}
          /> */}

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
                  setModalVisible(true);
                }}
              >
                Privacy.
              </Text>
            </Text>
          </TouchableOpacity>

          {/* </View> */}

          <View style={styles.spacer30} />
          <CustomButton
            title="Continue"
            onPress={
              isChecked
                ? () => {
                    if (transactionType === TransactionType.purchase) {
                    } else {
                      navigation.navigate(
                        globalObject.businessDetails?.layout?.toLowerCase() ===
                          'grid'
                          ? 'GridSdkOptionsScreen'
                          : 'ListSdkOptionsScreen'
                      );
                    }
                  }
                : undefined
            }
          />

          {/* <View style={styles.spacer10} /> */}
          {/* <PoweredByFooter /> */}
        </View>
      </View>

      <GenericBottomSheet
        title="Privacy Condition"
        isVisible={isModalVisible}
        content={
          <>
            <PrivacyPolicyContainer />
          </>
        }
        modalHeight={600}
        onClose={() => setModalVisible(false)}
        showButtons={false}
        onOkPressed={() => {
          navigation.popToTop();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  scrollView: {
    // height: '100%',
    flex: 1,
    padding: 20,
  },
  spacer10: {
    height: 10,
  },
  spacer15: {
    height: 15,
  },
  spacer20: {
    height: 20,
  },
  spacer25: {
    height: 25,
  },
  spacer30: {
    height: 30,
  },
  spacer40: {
    height: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: CustomColors.backBorderColor,
  },
  iconImageStyle: {
    width: 20,
    height: 20,
    borderRadius: 0,
  },
  bannerImage: {
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,

    textAlign: 'center',
    fontFamily: 'PhantomSans-Regular',
    color: CustomColors.blackTextColor,
  },
  bodyText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'PhantomSans-Medium',
    color: CustomColors.blackTextColor,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center', // Center items horizontally
  },
  checkboxText: {
    fontSize: 13,
    color: '#000',
    marginLeft: 5,
    fontFamily: 'PhantomSans-Medium',
  },
  privacyText: {
    color: DynamicColors().primaryBrandColor,
  },
});

export default WelcomeScreen;
