import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { customTextStyles, W500Text } from '../../../components/CustomText';
import { VerticalSpacer } from '../../../components/Spacer';

interface CustomListDropdownFieldProps {
  label: string;
  items: string[];
  selectedItem: string | null;
  showSearch?: boolean | null;
  onValueChange: (value: string) => void;
}

const CustomListDropdownField: React.FC<CustomListDropdownFieldProps> = ({
  // fieldName,
  label,

  items,
  selectedItem,
  showSearch,
  onValueChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      setFilteredItems(
        items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setFilteredItems(items);
    }
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
        data={filteredItems.map((item) => ({
          label: item,
          value: item,
        }))}
        search={showSearch ?? true}
        searchPlaceholder="Search..."
        labelField="label"
        valueField="value"
        iconStyle={styles.iconStyle}
        placeholder={label}
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
        value={selectedItem}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          onValueChange(item.value);
        }}
        renderInputSearch={() => (
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            placeholder="Search..."
            onChangeText={handleSearch}
          />
        )}
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

  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: '#f2f2f2',
  },
  icon: {
    marginRight: 10,
    height: 30,
  },
  iconStyle: {
    // marginRight: 10,
    height: 28,
  },

  // iconStyle: {
  //   width: '12px',
  //   height: '12px'
  // }
});

export default CustomListDropdownField;
