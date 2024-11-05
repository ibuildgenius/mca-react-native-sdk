import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import React from 'react';

const AnimatedToggleSwitch = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (i: number) => void;
}) => {
  return (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        onPress={() => onChange(1)}
        style={[
          styles.toggleButton,
          {
            backgroundColor:
              value === 1
                ? DynamicColors().primaryBrandColor
                : CustomColors.whiteColor,
          },
        ]}
      >
        <SemiBoldText
          title="Yes"
          fontSize={10}
          color={
            value === 1 ? CustomColors.whiteColor : CustomColors.blackColor
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange(0)}
        style={[
          styles.toggleButton,
          {
            backgroundColor:
              value === 0
                ? DynamicColors().primaryBrandColor
                : CustomColors.whiteColor,
          },
        ]}
      >
        <RegularText
          title="No"
          fontSize={10}
          color={
            value === 0 ? CustomColors.whiteColor : CustomColors.blackColor
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  switchContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    height: 28,
    borderWidth: 0.5,
    borderColor: CustomColors.greyToastColor,
    borderRadius: 5,
  },
  toggleButton: {
    width: 32, //30
    height: 23,
    borderRadius: 5,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedToggleSwitch;
