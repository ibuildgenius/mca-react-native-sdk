import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StringUtils } from '../../../../utils/StringUtils';
import { SemiBoldText, W500Text } from '../../../../components/CustomText';
import {
  CustomColors,
  DynamicColors,
} from '../../../../constants/CustomColors';
import { type FormStore, useFormStore } from '../../../../store/formStore';

interface ProductPriceContainerProps {
  title: string;
  isLoading?: boolean;
}

const ProductPriceContainer: React.FC<ProductPriceContainerProps> = ({
  title,
  isLoading = false,
}) => {
  const globalForm = useFormStore((state: FormStore) => state);

  return (
    <View style={styles.container}>
      <W500Text
        title={title ?? ''}
        fontSize={17}
        color={CustomColors.formTitleColor}
      />

      <View style={styles.spacer} />

      <View style={styles.priceContainer}>
        {/* <Text style={styles.currency}>₦</Text> */}

        <SemiBoldText
          title="₦"
          fontSize={19}
          color={DynamicColors().primaryBrandColor}
        />

        <View style={styles.priceContent}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#3498db" />
          ) : (
            // <Text style={styles.price}>
            //   {StringUtils.formatPriceWithComma(
            //     globalForm.productPrice?.toString() || '0',
            //   )}
            // </Text>
            <SemiBoldText
              title={
                StringUtils.formatPriceWithComma(
                  globalForm.productPrice?.toString() || '0'
                ) ?? ''
              }
              fontSize={19}
              color={DynamicColors().primaryBrandColor}
            />
          )}
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  spacer: {
    height: 8,
  },
  priceContainer: {
    width: '100%',
    height: 55,
    backgroundColor: DynamicColors().lightPrimaryColor,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingVertical: 15,
  },

  priceContent: {
    marginLeft: 10,
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    overflow: 'hidden',
  },
  bottomSpacer: {
    height: 0,
  },
});

export { ProductPriceContainer };
