import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import { HorizontalSpacer, VerticalSpacer } from './Spacer';
import { type FormStore, useFormStore } from '../store/formStore';
import { type GlobalStore, useGlobalStore } from '../store/globalStore';
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { RegularText, SemiBoldText } from './CustomText';
import { StringUtils } from '../utils/StringUtils';
import CopyIcon from '../assets/icons/copy_icon.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastStatus } from '../utils/enums';
import customLog from '../utils/logger';
import { showToast } from './CustomToast';

const PaymentDetailsContainer: React.FC = () => {
  //   const selectedProductDetails = useProductStore((state) => state.selectedProductDetails);

  const globalForm = useFormStore((state: FormStore) => state);
  const global = useGlobalStore((state: GlobalStore) => state);

  //   const productPrice = useProductStore((state) => state.productPrice);
  //   const email = useProductStore((state) => state.email); // Assuming email is stored in Zustand

  const handleCopyPrice = async () => {
    Clipboard.setString(globalForm.productPrice.toString());
    customLog.error('oweoweoiweinw');
    showToast(ToastStatus.success, 'Price successfully copied to clipboard.');

    // Toast.show({
    //   type: 'success',
    //   text1: 'Price copied!',
    //   text2: 'Price successfully copied to clipboard.',
    // });

    // showToastMessage('Pending! Please wait.', ToastStatus.pending);
  };

  return (
    <View
      style={{
        backgroundColor: DynamicColors().lightPrimaryColor,
        borderRadius: 3,
        borderBottomWidth: 0.2,
        borderBottomColor: DynamicColors().primaryBrandColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Add icon container if necessary */}
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <SemiBoldText
              title={globalForm.selectedProductDetails?.name || ''}
              fontSize={15}
              // textAlign="center"
            />
            <VerticalSpacer height={5} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RegularText title="by" fontSize={14} textAlign="center" />
              {/* <HorizontalSpacer width={5} /> */}
              {globalForm.selectedProductDetails?.provider?.logo ? (
                // <CustomImageNetwork
                //   imageUrl={globalForm.selectedProductDetails.provider?.logo}
                //   fit="cover"
                //   loaderComponent={<ShimmerLoader height={15} width={50} />}
                //   height={15}
                // />
                <Image
                  source={{
                    uri: globalForm.selectedProductDetails.provider?.logo,
                  }}
                  style={styles.providerIcon}
                />
              ) : (
                <RegularText
                  title={
                    globalForm.selectedProductDetails?.provider?.companyName ||
                    ''
                  }
                  fontSize={14}
                  textAlign="center"
                  color={CustomColors.greyTextColor}
                />
              )}
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={handleCopyPrice}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>
                <RegularText
                  title="Pay"
                  fontSize={13}
                  textAlign="center"
                  color={CustomColors.greyTextColor}
                />
                <HorizontalSpacer width={5} />
                {/* <Text style={CustomTextStyles.semiBold(15)}>

                  NGN{' '}
                  {StringUtils.formatPriceWithComma(
                    globalForm.productPrice.toString(),
                  )}
                </Text> */}

                <SemiBoldText
                  //   title={ "NGN "  StringUtils.formatPriceWithComma(
                  //     globalForm.productPrice.toString(),
                  //   ) ?? ""}
                  title={`NGN ${StringUtils.formatPriceWithComma(
                    globalForm.productPrice.toString()
                  )} `}
                  fontSize={15}
                  textAlign="center"
                  color={DynamicColors().primaryBrandColor}
                />
              </Text>
              <HorizontalSpacer width={5} />

              <CopyIcon
                width={15}
                height={15}
                color={CustomColors.greyTextColor}
              />
            </View>
          </TouchableOpacity>
          <VerticalSpacer height={5} />
          {/* <Text style={CustomTextStyles.regular(12)}>{global.email || ''}</Text> */}
          <RegularText
            title={
              globalForm.formData['email']
                ? globalForm.formData['email']
                : global.email || ''
            }
            fontSize={14}
            textAlign="center"
            color={CustomColors.blackColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  providerIcon: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
    // paddingVertical: 20,
  },
});

export default PaymentDetailsContainer;

// providerIcon: {
//   width: 25,
//   height: 25,
//   resizeMode: 'cover',
//   // paddingVertical: 20,
// },

// style={styles.providerIcon}
