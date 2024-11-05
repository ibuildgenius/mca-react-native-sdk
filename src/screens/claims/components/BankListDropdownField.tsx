import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { BankModel } from '../../../models/BankModel';
import { VerticalSpacer } from '../../../components/Spacer';
// import { CustomColors } from './CustomColors'; // Adjust the path for your custom colors

interface BankListDropdownFieldProps {
  fieldName: string;
  label: string;
  description: string;
  items: BankModel[];
  selectedItem: BankModel | null;
  onItemSelected: (item: BankModel | null) => void;
}

const BankListDropdownField: React.FC<BankListDropdownFieldProps> = ({
  label,
  description,
  items,
  selectedItem,
  onItemSelected,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, _setSearchQuery] = useState('');

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    (item.name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: DynamicColors().primaryBrandColor },
        ]}
        data={filteredItems.map((item) => ({
          label: item.name ?? 'Unnamed Bank', // Ensure label is always a string
          value: item, // Passing the full BankModel as the value
        }))}
        search // Enable search functionality
        searchPlaceholder="Search..."
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus && selectedItem
            ? (selectedItem.name ?? description)
            : description
        }
        value={
          selectedItem
            ? {
                label: selectedItem.name ?? 'Unnamed Bank',
                value: selectedItem,
              }
            : null
        } // Wrap selectedItem as an object
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onItemSelected(item.value); // item.value is the selected BankModel
          setIsFocus(false);
        }}
        //CHECK
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
        renderItem={(item: { label: string; value: BankModel }) => (
          <View style={styles.dropdownItem}>
            <Text style={styles.itemText}>{item.label}</Text>
          </View>
        )}
        // searchQuery={searchQuery}
        // onChangeSearchText={(text: string) => setSearchQuery(text)} // Handle search query input
      />
      <VerticalSpacer height={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: CustomColors.formTitleColor,
    marginBottom: 8,
  },
  dropdown: {
    height: 46,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: CustomColors.backBorderColor,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 14,
    color: CustomColors.blackTextColor,
  },
  icon: {
    marginRight: 10,
  },
});

export default BankListDropdownField;
