// @ts-nocheck
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CustomColors } from '../../../../constants/CustomColors';
import { SemiBoldText, W500Text } from '../../../../components/CustomText';

const ListProviderContainer = ({
  title,
  provider,
  price,
  formattedPrice,
  periodOfCover,
  isDynamicPrice,
  hasDiscount,
  productDetails,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Provider Icon */}
        <View style={styles.iconContainer}>
          {provider?.icon ? (
            <customImagenetwork imageUrl={provider?.icon} height={33} />
          ) : (
            <Text style={styles.providerInitial}>
              {provider?.companyName[0]}
            </Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <SemiBoldText title={title} fontSize={14} />
          <W500Text
            title={provider?.companyName || ''}
            fontSize={12}
            color={CustomColors.greyTextColor}
          />
        </View>
      </View>

      {/* Price & Arrow */}
      <View style={styles.priceContainer}>
        {isDynamicPrice ? (
          <SemiBoldText
            title={`${formattedPrice} / ${periodOfCover}`}
            fontSize={14}
            color={CustomColors.blackColor}
          />
        ) : (
          <Text style={styles.priceText}>
            ₦ {price} / {periodOfCover}
          </Text>
        )}

        {/* Chevron Right */}
        <Svg height={24} width={24}>
          <Path
            d="M9 6 L15 12 L9 18"
            stroke={CustomColors.blackColor}
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 33,
    width: 33,
    borderRadius: 16.5,
    borderWidth: 1,
    borderColor: CustomColors.dividerGreyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerInitial: {
    fontSize: 16,
    color: CustomColors.blackColor,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    color: CustomColors.blackColor,
  },
});

export default ListProviderContainer;
