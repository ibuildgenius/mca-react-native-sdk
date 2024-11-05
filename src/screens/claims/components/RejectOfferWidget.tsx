import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomColors } from '../../../constants/CustomColors';
import { VerticalSpacer } from '../../../components/Spacer';
import { RegularText } from '../../../components/CustomText';
import ValidatedCustomFormTextField from '../../../components/ValidatedCustomFormTextField';
import type { Control, FieldValues } from 'react-hook-form';

interface RejectOfferWidgetProps {
  reason: string | null;
  setReason: (value: string) => void;
  control: Control<FieldValues, any>;
}

const RejectOfferWidget: React.FC<RejectOfferWidgetProps> = ({
  reason,
  setReason,
  control,
}) => {
  return (
    <View style={styles.container}>
      {/* <VerticalSpacer height={10} /> */}

      <RegularText
        title="Please provide rejection reason"
        color={CustomColors.blackColor}
        fontSize={16}
      />

      <VerticalSpacer height={30} />

      <ValidatedCustomFormTextField
        name={'Type rejection reason'}
        // title={null}
        // title={'Type rejection reason'}
        hintText={'Type rejection reason'}
        value={reason ?? ''}
        control={control}
        maxLines={4}
        onChanged={(text: string) => {
          setReason(text);
        }}
        minMaxConstraint={'length'}
        minLength={10}
      />

      <VerticalSpacer height={5} />
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

export default RejectOfferWidget;
