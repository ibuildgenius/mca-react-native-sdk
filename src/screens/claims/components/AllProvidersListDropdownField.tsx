import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProviderModel {
  id: number | null;
  companyName: string | null;
}

interface AllProvidersListDropdownFieldProps {
  fieldName: string;
  label: string;
  description: string;
  items: ProviderModel[];
  selectedItem: ProviderModel | null;
  onItemSelected: (item: ProviderModel | null) => void;
}

const AllProvidersListDropdownField: React.FC<
  AllProvidersListDropdownFieldProps
> = ({ label, description, items, selectedItem, onItemSelected }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, _setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    (item.companyName ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#4A90E2' }]} // Add focused border color
        data={filteredItems.map((item) => ({
          label: item.companyName ?? 'Unnamed Provider',
          value: item, // Passing the full ProviderModel as the value
        }))}
        search // Enables search functionality
        searchPlaceholder="Search..."
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus && selectedItem
            ? (selectedItem.companyName ?? description)
            : description
        }
        value={
          selectedItem
            ? {
                label: selectedItem.companyName ?? 'Unnamed Provider',
                value: selectedItem,
              }
            : null
        } // Wrap selectedItem as object
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onItemSelected(item.value); // item.value is the selected ProviderModel
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon
            style={styles.icon}
            name="keyboard-arrow-down"
            size={20}
            color={isFocus ? '#4A90E2' : '#999'}
          />
        )}
        renderItem={(item: { label: string; value: ProviderModel }) => (
          <View style={styles.dropdownItem}>
            <Text style={styles.itemText}>{item.label}</Text>
          </View>
        )}
        // searchQuery={searchQuery}
        // onChangeSearchText={(text) => setSearchQuery(text)} // Handles search input
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    height: 46,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
});

export default AllProvidersListDropdownField;
