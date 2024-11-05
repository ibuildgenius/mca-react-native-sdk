import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import { customTextStyles, W500Text } from '../../../components/CustomText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Define the type of dropdown item
interface DropdownItem {
  label: string;
  value: string;
}

interface CustomListDropdownMultiSelectFieldProps {
  label: string;
  description: string;
  items: string[];
  selectedItems: string[];
  onValueChange: (selectedItems: string[]) => void;
}

const CustomListDropdownMultiSelectField: React.FC<
  CustomListDropdownMultiSelectFieldProps
> = ({ label, description, items, selectedItems, onValueChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(selectedItems);

  const handleItemSelection = (item: string) => {
    let updatedSelectedValues = [...selectedValues];
    if (updatedSelectedValues.includes(item)) {
      updatedSelectedValues = updatedSelectedValues.filter(
        (val) => val !== item
      );
    } else {
      updatedSelectedValues.push(item);
    }
    setSelectedValues(updatedSelectedValues);
    onValueChange(updatedSelectedValues);
  };

  return (
    <View>
      <W500Text title={label} fontSize={16} color={CustomColors.blackColor} />

      <VerticalSpacer height={9} />
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: DynamicColors().primaryBrandColor },
        ]}
        data={items.map((item) => ({
          label: item,
          value: item,
        }))}
        search={false}
        labelField="label"
        valueField="value"
        placeholder={
          selectedValues.length > 0 ? selectedValues.join(', ') : description
        }
        iconStyle={styles.iconStyle}
        placeholderStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.greyTextColor },
        ]}
        selectedTextStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.blackTextColor },
        ]}
        itemTextStyle={[
          customTextStyles.regular,
          { fontSize: 15.5, color: CustomColors.blackTextColor },
        ]}
        // placeholder={label}
        value={
          selectedValues.length > 0 ? `${selectedValues.join(', ')}` : null
        }
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => handleItemSelection(item.value)}
        renderItem={(item: DropdownItem) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleItemSelection(item.value)}
          >
            {/* <Icon
              name={
                selectedValues.includes(item.value)
                  ? 'check-box'
                  : 'check-box-outline-blank'
              }
              size={20}
              color={
                selectedValues.includes(item.value)
                  ? DynamicColors().primaryBrandColor
                  : CustomColors.greyTextColor
              }
            /> */}

            <BouncyCheckbox
              isChecked={selectedValues.includes(item.value)}
              disableText
              fillColor={DynamicColors().primaryBrandColor}
              size={18}
              useBuiltInState={false}
              innerIconStyle={{
                borderRadius: 0,
                borderColor: CustomColors.checkBoxBorderColor,
              }}
              iconImageStyle={{
                width: 12,
                height: 12,
                borderRadius: 0, // Force square for inner icon
              }}
              // iconStyle={{ borderColor: 'green' }}
              iconStyle={{
                borderColor: DynamicColors().primaryBrandColor,
                borderRadius: 0,
              }}
              style={{
                borderRadius: 0,
              }}
              onPress={() => {}}
            />
            <HorizontalSpacer width={5} />
            <Text style={styles.itemText}>{item.value}</Text>
          </TouchableOpacity>
        )}
        // renderLeftIcon={() => (
        //   <Icon
        //     style={styles.icon}
        //     name="keyboard-arrow-down"
        //     size={20}
        //     color={
        //       isFocus
        //         ? DynamicColors().primaryBrandColor
        //         : CustomColors.formHintColor
        //     }
        //   />
        // )}
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
  dropdown: {
    height: 46,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: CustomColors.backBorderColor,
  },
  // dropdown: {
  //   height: 46,
  //   borderColor: '#ddd',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   backgroundColor: '#f9f9f9',
  // },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  iconStyle: {
    // marginRight: 10,
    height: 28,
  },
});

export default CustomListDropdownMultiSelectField;
