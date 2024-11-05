import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomColors } from '../../../constants/CustomColors';
import { customTextStyles, W500Text } from '../../../components/CustomText';
import { VerticalSpacer } from '../../../components/Spacer';
import TimeIcon from '../../../assets/icons/time_icon.svg';

interface CustomMiniTimePickerProps {
  label: string;
  description: string;
  selectedTime: Date | null;
  setSelectedTime: (data: Date | null) => void;
  // onTimeChange: (time: string) => void;
}

const CustomMiniTimePicker: React.FC<CustomMiniTimePickerProps> = ({
  label,
  description,
  selectedTime,
  setSelectedTime,

  // onTimeChange,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  // const [currentSelectedTime, setCurrentSelectedTime] = useState<Date | null>(
  //   selectedTime ? new Date(selectedTime) : null,
  // );

  const showTimePicker = () => {
    setPickerVisible(true);
  };

  const handleTimeChange = (_event: any, selectedDate?: Date) => {
    setPickerVisible(Platform.OS === 'ios'); // Keep picker open on iOS
    if (selectedDate) {
      setSelectedTime(selectedDate);
      // onTimeChange(selectedTimeString);
    }
  };

  return (
    <TouchableOpacity onPress={showTimePicker}>
      <View style={styles.container}>
        <W500Text title={label} fontSize={16} color={CustomColors.blackColor} />

        <VerticalSpacer height={9} />
        <View style={styles.timePickerContainer}>
          <Text
            style={
              selectedTime
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
            {/* {selectedTime
              ? selectedTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })

              : description} */}
            {selectedTime instanceof Date
              ? selectedTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : description}
          </Text>
          <TimeIcon width={22} height={22} fill={CustomColors.formHintColor} />
        </View>

        {isPickerVisible && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <VerticalSpacer height={25} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  timePickerContainer: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: CustomColors.dividerGreyColor,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 15,
    color: CustomColors.blackColor,
  },
});

export default CustomMiniTimePicker;
