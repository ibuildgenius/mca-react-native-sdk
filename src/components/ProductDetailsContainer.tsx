import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { HorizontalSpacer, VerticalSpacer } from './Spacer';
import { StringUtils } from '../utils/StringUtils';
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { RegularText, SemiBoldText } from './CustomText';
import { type FormStore, useFormStore } from '../store/formStore';
import { ColorUtils } from '../utils/colorUtils';

interface ProductDetailsContainerProps {
  isWhiteBg?: boolean;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = ({
  isWhiteBg = false,
}) => {
  const globalForm = useFormStore((state: FormStore) => state);

  const provider = globalForm.selectedProductDetails?.provider;
  const brandColor = ColorUtils.hexToRgba(
    provider?.brandColorPrimary ??
      provider?.settings?.brandColorPrimary ??
      '3BAA90',
    0.5 // Default color
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isWhiteBg
            ? CustomColors.whiteColor
            : CustomColors.backBorderColor,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.providerRow}>
          <View style={[styles.circle, { borderColor: brandColor }]}>
            {provider && provider.icon ? (
              // <CustomImageNetwork
              //   imageUrl={provider.icon || provider.settings?.icon || ''}
              //   loaderComponent={
              //     <RegularText
              //       title={provider.companyName ?? ''}
              //       fontSize={13}
              //       color={CustomColors.greyTextColor}
              //     />
              //   }
              //   height={17}/>
              <Image
                source={{
                  uri: provider.icon,
                }}
                style={styles.productIcon}
              />
            ) : (
              <SemiBoldText
                title={StringUtils.getFirstCharCapitalized(
                  provider?.companyName || ''
                )}
                fontSize={14}
                color={CustomColors.blackColor}
              />
            )}
          </View>

          <HorizontalSpacer width={10}></HorizontalSpacer>

          <View style={styles.providerInfo}>
            <SemiBoldText
              title={globalForm.selectedProductDetails?.name ?? ''}
              fontSize={15}
              color={CustomColors.blackColor}
            />
            <VerticalSpacer height={2} />
            {provider?.companyName && (
              <RegularText
                title={provider.companyName}
                fontSize={13}
                color={CustomColors.greyTextColor}
              />
            )}
          </View>
        </View>

        <HorizontalSpacer width={5}></HorizontalSpacer>

        <View style={styles.priceColumn}>
          {globalForm.selectedProductDetails?.isDynamicPricing ? (
            <SemiBoldText
              title={`${StringUtils.getProductPrice(
                globalForm.selectedProductDetails?.price ?? '',
                globalForm.selectedProductDetails?.isDynamicPricing
              )} / ${StringUtils.getProviderPeriodOfCover(
                globalForm.selectedProductDetails?.coverPeriod ?? ''
              )}`}
              fontSize={14}
              color={DynamicColors().primaryBrandColor}
            />
          ) : (
            <SemiBoldText
              title={`₦ ${StringUtils.formatPriceWithComma(
                globalForm.selectedProductDetails?.price ?? ''
              )} / ${StringUtils.getProviderPeriodOfCover(
                globalForm.selectedProductDetails?.coverPeriod ?? ''
              )}`}
              fontSize={14}
              color={DynamicColors().primaryBrandColor}
            />
          )}

          <VerticalSpacer height={5}></VerticalSpacer>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: CustomColors.backBorderColor,
    borderWidth: 0.2,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  productIcon: {
    height: '60%', // Make the image fill the parent container's height
    width: '60%', // Make the image fill the parent container's width
    borderRadius: 18, // Match the border radius of the circleIconContainer
    resizeMode: 'cover', // Ensure the image scales properly within the container
    // padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    height: 33,
    width: 33,
    borderRadius: 33 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4.13,
    borderColor: 'rgba(0, 0, 0, 0.5)', // Change this dynamically based on provider's brand color
  },

  providerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  priceColumn: {
    alignItems: 'flex-end',
  },
});

export default ProductDetailsContainer;
