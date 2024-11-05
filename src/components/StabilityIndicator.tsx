// @ts-nocheck
import React from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { HorizontalSpacer } from './Spacer';
import { RegularText, SemiBoldText } from './CustomText';
import { CustomColors } from '../constants/CustomColors';

interface StabilityIndicatorProps {
  value: number;
}

const StabilityIndicator: React.FC<StabilityIndicatorProps> = ({ value }) => {
  // Determine the category and colors based on the value
  let dotColor: string, bgColor: string, textColor: string;

  if (value <= 50) {
    dotColor = '#F04438';
    bgColor = '#FEF3F2';
    textColor = '#B42318';
  } else if (value <= 85) {
    dotColor = '#F79009';
    bgColor = '#FFFAEB';
    textColor = '#B54708';
  } else {
    dotColor = '#12B76A';
    bgColor = '#ECFDF3';
    textColor = '#027A48';
  }

  return (
    <View style={styles.container}>
      <RegularText
        title="Stability:"
        fontSize={13}
        color={CustomColors.blackColor}
      />
      <HorizontalSpacer width={5} />
      <View style={[styles.indicatorContainer, { backgroundColor: bgColor }]}>
        <SemiBoldText title="•" color={textColor} fontSize={20} />
        <View style={{ width: 4 }} />
        <RegularText title={`${value}%`} color={textColor} fontSize={13} />
        {/* <Text style={[styles.percentageText, {}]}></Text> */}
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
  } as ViewStyle,
  stabilityText: {
    fontSize: 12,
  } as TextStyle,
  blackColor: {
    color: '#000000',
  } as TextStyle,
  indicatorContainer: {
    height: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  } as ViewStyle,
  percentageText: {
    fontSize: 12,
  } as TextStyle,
});

export default StabilityIndicator;
