// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Svg, {Path} from 'react-native-svg';
// import create from 'zustand';
// import {useFormStore} from '../../../../store/formStore';
// import {LoadStore, useLoadStore} from '../../../../store/loadStore';

// interface CustomBooleanDropdownFieldProps {
//   fieldName: string;
//   label: string;
//   description: string;
//   filteredFieldsLength?: number;
//   formKey?: any;
//   formVM?: any;
//   isLastPage?: boolean;
// }

// const CustomBooleanDropdownField: React.FC<CustomBooleanDropdownFieldProps> = ({
//   fieldName,
//   label,
//   description,
//   filteredFieldsLength,
//   formKey,
//   formVM,
//   isLastPage = false,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'Apple', value: 'apple'},
//     {label: 'Banana', value: 'banana'},
//   ]);

//   const global = useFormStore((state: any) => state);
//   const loadingState = useLoadStore((state: LoadStore) => state);

//   const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);
//   const yesNoOptions = [
//     {label: 'Yes', value: true},
//     {label: 'No', value: false},
//   ];

//   const handleDropdownChange = (value: boolean | null) => {
//     global.setFormData(fieldName, value);
//     global.removeFormError(fieldName);

//     if (filteredFieldsLength !== undefined && formVM && formKey && isLastPage) {
//       if (debounce) clearTimeout(debounce);
//       setDebounce(
//         setTimeout(() => {
//           const formDataCount = Object.keys(global.formData).length;
//           if (
//             filteredFieldsLength + 2 === formDataCount &&
//             formKey.current?.validate()
//           ) {
//             formVM.fetchProductPrice(loadingState);
//           }
//         }, 1000),
//       );
//     }
//   };

//   return (
//     <View>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.dropdownContainer}>
//         <DropDownPicker
//           open={open}
//           value={global.formData[fieldName]}
//           items={yesNoOptions}
//           setOpen={setOpen}
//           setValue={setValue}
//           setItems={setItems}
//         />

//         <Svg style={styles.dropdownIcon} viewBox="0 0 24 24">
//           <Path fill="#000" d="M7 10l5 5 5-5z" />
//         </Svg>
//       </View>
//       {global.formErrors[fieldName] ? (
//         <Text style={styles.errorText}>{global.formErrors[fieldName]}</Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   dropdownContainer: {
//     width: '100%',
//     height: 46,
//     borderWidth: 0.8,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     paddingHorizontal: 10,
//   },
//   dropdown: {
//     backgroundColor: '#f9f9f9',
//   },
//   dropDownStyle: {
//     backgroundColor: '#fff',
//   },
//   dropdownIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 12,
//     width: 24,
//     height: 24,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default CustomBooleanDropdownField;

import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormStore } from '../../../../store/formStore';
import { customTextStyles } from '../../../../components/CustomText';

interface CustomBooleanDropdownFieldProps {
  label: string;
  placeholder: string;
  fieldName: string;
  onSelect: (value: boolean) => void; // New prop for handling value selection
  // value?: boolean; // Pass the current value
}

type DropdownItem = {
  label: string;
  value: boolean;
};

const CustomBooleanDropdownField: React.FC<CustomBooleanDropdownFieldProps> = ({
  label,
  placeholder,
  fieldName,
  onSelect,
  // value, // passed from Controller
}) => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const formGlobal = useFormStore();

  // Boolean options for Yes/No
  const data: DropdownItem[] = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  // Function to update form data with boolean value
  const updateFormData = (value: boolean) => {
    formGlobal.setFormData(fieldName, value);
  };

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={100}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        placeholderStyle={customTextStyles.regular}
        value={selectedItem} // Pass selected item directly
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DropdownItem) => {
          setSelectedItem(item);
          updateFormData(item.value); // Store boolean value in form state
          onSelect(item.value);
          setIsFocus(false);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
  },
  placeholderText: {
    color: '#333',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    height: 50,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CustomBooleanDropdownField;
