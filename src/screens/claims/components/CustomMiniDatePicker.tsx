import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { customTextStyles, W500Text } from '../../../components/CustomText';
import { VerticalSpacer } from '../../../components/Spacer';
import { CustomColors } from '../../../constants/CustomColors';
import DateIcon from '../../../assets/icons/date_icon.svg';

interface CustomMiniDatePickerProps {
  label: string;
  description: string;
  isTodayMax: boolean;
  minDate?: number;
  selectedDate?: string | null; // Passed from parent
  setSelectedDate: (data: string | null) => void; // Passed from parent
}

const CustomMiniDatePicker: React.FC<CustomMiniDatePickerProps> = ({
  label,
  description,
  isTodayMax,
  minDate,
  selectedDate,
  setSelectedDate,
}) => {
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const today = new Date();
  const maxDate = isTodayMax ? today : new Date(3000, 0, 1);
  const calculatedMinDate = minDate
    ? new Date(today.getTime() - minDate * 24 * 60 * 60 * 1000)
    : new Date(1000, 0, 1);

  const handleConfirm = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    // onDateChange(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View>
      {/* <Text style={styles.label}>{label}</Text> */}
      <W500Text title={label} fontSize={16} color={CustomColors.blackColor} />

      <VerticalSpacer height={9} />
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text
          style={
            selectedDate
              ? [
                  customTextStyles.regular,
                  { fontSize: 15, color: CustomColors.blackColor },
                ]
              : [
                  customTextStyles.regular,
                  { fontSize: 15, color: CustomColors.formHintColor },
                ]
          }
        >
          {selectedDate ? selectedDate : description}
        </Text>

        <DateIcon width={22} height={22} fill={CustomColors.formHintColor} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={maxDate}
        minimumDate={calculatedMinDate}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <VerticalSpacer height={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 46,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: CustomColors.backBorderColor,
  },

  placeholderText: {
    color: '#999',
    fontSize: 15,
  },
  selectedText: {
    color: '#333',
    fontSize: 15,
  },
  icon: {
    fontSize: 20,
    color: '#999',
  },
});

export default CustomMiniDatePicker;
