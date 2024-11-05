import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomColors } from '../../../constants/CustomColors';
import { VerticalSpacer } from '../../../components/Spacer';
import { customTextStyles, RegularText } from '../../../components/CustomText';

const RepairEstimateWidget: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <VerticalSpacer height={10} /> */}

      <RegularText
        title="We understand you may not have a valid mechanic at the moment for an estimate of repair."
        color={CustomColors.formTitleColor}
        fontSize={16}
      />

      <VerticalSpacer height={20} />

      <Text
        style={[
          customTextStyles.regular,
          { color: CustomColors.formTitleColor, fontSize: 16 },
        ]}
      >
        <Text
          style={[
            customTextStyles.w500,
            { color: CustomColors.orangeColor, fontSize: 16 },
          ]}
        >
          Note:{'  '}
        </Text>
        <Text>
          Kindly submit this within the next 30 days, as any submissions beyond
          this timeframe will render the claim invalid.
        </Text>
      </Text>

      <VerticalSpacer height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  regularText: {
    fontSize: 15,
    color: CustomColors.formTitleColor,
    lineHeight: 22, // This replicates Flutter's height property for TextSpan
  },
  richText: {
    fontSize: 15,
    lineHeight: 22,
    color: CustomColors.formTitleColor,
  },
  noteText: {
    fontSize: 14,
    color: CustomColors.orangeColor,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

export default RepairEstimateWidget;
