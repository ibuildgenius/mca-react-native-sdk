// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   StyleSheet,
// //   GestureResponderEvent,
// // } from 'react-native';
// // import {Controller} from 'react-hook-form';
// // import {TextInputMask} from 'react-native-masked-text'; // For thousands separator formatting
// // import ManageIcon from '../assets/icons/manage_icon.svg';

// // interface CustomFormTextFieldProps {
// //   name: string;
// //   title?: string;
// //   hintText?: string;
// //   labelText?: string;
// //   prefixIcon?: React.ReactNode;
// //   suffixIcon?: React.ReactNode;
// //   prefix?: React.ReactNode;
// //   initialValue?: string;
// //   isCurrency?: boolean;
// //   isNumber?: boolean;
// //   obscureText?: boolean;
// //   readOnly?: boolean;
// //   maxLines?: number;
// //   maxLength?: number;
// //   suffix?: React.ReactNode;
// //   helperText?: string;
// //   validator?: (value: string) => string | undefined;
// //   control: any; // React Hook Form control object
// //   onSuffixTap?: (event: GestureResponderEvent) => void;
// //   onTap?: (event: GestureResponderEvent) => void;
// //   onChanged?: (text: string) => void;
// // }

// // const CustomFormTextField: React.FC<CustomFormTextFieldProps> = ({
// //   name,
// //   title,
// //   hintText,
// //   labelText,
// //   prefixIcon,
// //   suffixIcon,
// //   prefix,
// //   initialValue,
// //   isCurrency = false,
// //   isNumber = false,
// //   obscureText = false,
// //   readOnly = false,
// //   maxLines = 1,
// //   maxLength,
// //   suffix,
// //   helperText,
// //   validator,
// //   control,
// //   onSuffixTap,
// //   onTap,
// //   onChanged,
// // }) => {
// //   return (
// //     <View style={styles.container}>
// //       {title && <Text style={styles.title}>{title}</Text>}

// //       <Controller
// //         control={control}
// //         name={name}
// //         defaultValue={initialValue}
// //         rules={{validate: validator}}
// //         render={({field: {onChange, value}}) => (
// //           <View style={styles.inputContainer}>
// //             {prefixIcon && (
// //               <View style={styles.iconContainer}>{prefixIcon}</View>
// //             )}
// //             <TextInput
// //               style={styles.input}
// //               onChangeText={text => {
// //                 onChange(text);
// //                 if (onChanged) onChanged(text);
// //               }}
// //               value={value}
// //               placeholder={hintText}
// //               secureTextEntry={obscureText}
// //               keyboardType={isNumber ? 'numeric' : 'default'}
// //               editable={!readOnly}
// //               maxLength={maxLength}
// //               multiline={maxLines > 1}
// //               numberOfLines={maxLines}
// //               //   onFocus={onTap}
// //               placeholderTextColor="#999"
// //             />
// //             {suffixIcon && (
// //               <ManageIcon width={22} height={22} />
// //               //   <IconButton
// //               //     icon={suffixIcon}
// //               //     size={16}
// //               //     color="#000"
// //               //     onPress={onSuffixTap}
// //               //   />
// //             )}
// //             {isCurrency && (
// //               <TextInputMask
// //                 type={'money'}
// //                 options={{
// //                   precision: 2,
// //                   separator: '.',
// //                   delimiter: ',',
// //                   unit: '₦',
// //                   suffixUnit: '',
// //                 }}
// //                 value={value}
// //                 onChangeText={maskedValue => {
// //                   onChange(maskedValue);
// //                   if (onChanged) onChanged(maskedValue);
// //                 }}
// //                 style={styles.input}
// //               />
// //             )}
// //             {suffix && <View>{suffix}</View>}
// //           </View>
// //         )}
// //       />

// //       {helperText && <Text style={styles.helperText}>{helperText}</Text>}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     marginBottom: 25,
// //   },
// //   title: {
// //     fontSize: 14,
// //     fontWeight: '500',
// //     color: '#333',
// //     marginBottom: 8,
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#f9f9f9',
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     paddingHorizontal: 10,
// //     height: 50,
// //   },
// //   input: {
// //     flex: 1,
// //     fontSize: 15,
// //     color: '#333',
// //   },
// //   iconContainer: {
// //     justifyContent: 'center',
// //     marginRight: 8,
// //   },
// //   helperText: {
// //     fontSize: 12,
// //     color: '#999',
// //     marginTop: 5,
// //   },
// // });

// // export default CustomFormTextField;

// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   GestureResponderEvent,
// } from 'react-native';
// import {Controller} from 'react-hook-form';
// import {TextInputMask} from 'react-native-masked-text'; // For thousands separator formatting

// interface CustomFormTextFieldProps {
//   name: string;
//   title?: string;
//   hintText?: string;
//   labelText?: string;
//   prefixIcon?: React.ReactNode;
//   suffixIcon?: React.ReactNode;
//   prefix?: React.ReactNode;
//   initialValue?: string;
//   isCurrency?: boolean;
//   isNumber?: boolean;
//   obscureText?: boolean;
//   readOnly?: boolean;
//   maxLines?: number;
//   maxLength?: number;
//   suffix?: React.ReactNode;
//   helperText?: string;
//   validator?: (value: string) => string | undefined;
//   control: any; // React Hook Form control object
//   onSuffixTap?: (event: GestureResponderEvent) => void;
//   onTap?: (event: GestureResponderEvent) => void;
//   onChanged?: (text: string) => void;
//   value?: string; // ADD THIS LINE
// }

// const CustomFormTextField: React.FC<CustomFormTextFieldProps> = ({
//   name,
//   title,
//   hintText,
//   prefixIcon,
//   suffixIcon,
//   initialValue,
//   isCurrency = false,
//   isNumber = false,
//   obscureText = false,
//   readOnly = false,
//   maxLines = 1,
//   maxLength,
//   suffix,
//   helperText,
//   validator,
//   control,
//   onSuffixTap,
//   onChanged,
// }) => {
//   return (
//     <View style={styles.container}>
//       {title && <Text style={styles.title}>{title}</Text>}

//       <Controller
//         control={control}
//         name={name}
//         defaultValue={initialValue}
//         rules={{validate: validator}}
//         render={({field: {onChange, value}}) => (
//           <View style={styles.inputContainer}>
//             {prefixIcon && (
//               <View style={styles.iconContainer}>{prefixIcon}</View>
//             )}

//             {/* Conditionally render either TextInput or TextInputMask based on isCurrency */}
//             {isCurrency ? (
//               <TextInputMask
//                 type={'money'}
//                 options={{
//                   precision: 2,
//                   separator: '.',
//                   delimiter: ',',
//                   unit: '₦', // You can customize the currency symbol here
//                   suffixUnit: '',
//                 }}
//                 value={value}
//                 onChangeText={maskedValue => {
//                   onChange(maskedValue);
//                   if (onChanged) onChanged(maskedValue);
//                 }}
//                 style={styles.input}
//                 placeholder={hintText}
//                 editable={!readOnly}
//               />
//             ) : (
//               <TextInput
//                 style={styles.input}
//                 onChangeText={text => {
//                   onChange(text);
//                   if (onChanged) onChanged(text);
//                 }}
//                 value={value}
//                 placeholder={hintText}
//                 secureTextEntry={obscureText}
//                 keyboardType={isNumber ? 'numeric' : 'default'}
//                 editable={!readOnly}
//                 maxLength={maxLength}
//                 multiline={maxLines > 1}
//                 numberOfLines={maxLines}
//                 placeholderTextColor="#999"
//               />
//             )}

//             {/* Dynamically render suffixIcon if provided */}
//             {suffixIcon && (
//               <View onTouchEnd={onSuffixTap} style={styles.iconContainer}>
//                 {suffixIcon}
//               </View>
//             )}

//             {suffix && <View>{suffix}</View>}
//           </View>
//         )}
//       />

//       {helperText && <Text style={styles.helperText}>{helperText}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 25,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     height: 50,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: '#333',
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   helperText: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 5,
//   },
// });

// export default CustomFormTextField;

// @ts-nocheck

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type GestureResponderEvent,
  TextInput,
} from 'react-native';
// import { TextInputMask } from 'react-native-masked-text'; // For thousands separator formatting
import { CustomColors, DynamicColors } from '../constants/CustomColors';
import { W500Text } from './CustomText';
import { VerticalSpacer } from './Spacer';

interface CustomFormTextFieldProps {
  name: string;
  title?: string;
  hintText?: string;
  labelText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  initialValue?: string;
  isCurrency?: boolean;
  isNumber?: boolean;
  obscureText?: boolean;
  readOnly?: boolean;
  maxLines?: number;
  maxLength?: number;
  suffix?: React.ReactNode;
  helperText?: string;
  validator?: (value: string) => string | undefined;
  onSuffixTap?: (event: GestureResponderEvent) => void;
  onTap?: (event: GestureResponderEvent) => void;
  onChanged?: (text: string) => void;
  value?: string; // To keep track of field value
}

const CustomFormTextField: React.FC<CustomFormTextFieldProps> = ({
  name,
  title,
  hintText,
  prefixIcon,
  suffixIcon,
  initialValue,
  isCurrency = false,
  isNumber = false,
  obscureText = false,
  readOnly = false,
  maxLines = 1,
  maxLength,
  suffix,
  helperText,
  onSuffixTap,
  onChanged,
  value,
}) => {
  const handleNumberInput = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, ''); // Only allow numbers
    if (onChanged) onChanged(!text ? '' : numericValue); // Trigger the change event
  };

  // const formatNumberWithCommas = (numberString: string) => {
  //   if (!numberString) {
  //     return ''; // Return an empty string if the input is empty
  //   }
  //   const number = numberString.replace(/,/g, ''); // Remove existing commas
  //   if (!isNaN(Number(number))) {
  //     return new Intl.NumberFormat().format(Number(number)); // Add commas
  //   }
  //   return numberString; // Return as-is if it's not a valid number
  // };

  const formatNumberWithCommas = (numberString: string) => {
    // Check if numberString is empty, null, or undefined and return an empty string in such cases
    if (!numberString || isNaN(Number(numberString.replace(/,/g, '')))) {
      return ''; // Avoid NaN by returning an empty string for invalid inputs
    }
    const number = Number(numberString.replace(/,/g, '')); // Remove existing commas and parse as a number
    return new Intl.NumberFormat().format(number); // Add commas to the valid number
  };

  // const formatNumberWithCommas = (numberString?: string) => {
  //   if (typeof numberString !== 'string' || numberString.trim() === '') {
  //     console.log(typeof numberString);
  //     console.log(numberString);
  //     console.log(numberString);
  //     console.log(numberString);
  //     console.log(numberString);
  //     console.log(numberString);
  //     console.log(numberString);
  //     return ''; // Return an empty string if the input is empty or undefined
  //   }

  //   const number = numberString.replace(/,/g, ''); // Remove existing commas
  //   if (!isNaN(Number(number))) {
  //     return new Intl.NumberFormat().format(Number(number)); // Add commas
  //   }
  //   return numberString; // Return as-is if it's not a valid number
  // };

  const handleTextChange = (text: string) => {
    let formattedText = text;
    if (isNumber) {
      formattedText = formatNumberWithCommas(text);
      handleNumberInput && handleNumberInput(formattedText.replace(/,/g, '')); // Pass the unformatted value
    } else {
      onChanged && onChanged(text);
    }
    // setInputValue(formattedText); // Set the formatted value in the state
  };

  return (
    <View style={styles.container}>
      {title && (
        <W500Text
          title={title}
          fontSize={16}
          // color={CustomColors.formTitleColor}
          color={CustomColors.blackColor}
        />
      )}
      <VerticalSpacer height={10} />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: CustomColors.backBorderColor },
        ]}
      >
        {prefixIcon && <View style={styles.iconContainer}>{prefixIcon}</View>}

        {/* Conditionally render TextInput or TextInputMask based on isCurrency */}
        {
          // isCurrency ?
          // (
          //   <TextInputMask
          //     // type={'money'}
          //     options={{
          //       // precision: 2,
          //       separator: '.',
          //       delimiter: ',',
          //       // unit: '₦', // Customize currency symbol
          //       suffixUnit: '',
          //     }}
          //     value={value}
          //     onChangeText={maskedValue => {
          //       onChanged && onChanged(maskedValue);
          //     }}
          //     style={styles.input}
          //     placeholder={hintText}
          //     editable={!readOnly}
          //   />
          // ) :
          <TextInput
            style={
              maxLines > 1
                ? [styles.input, { textAlignVertical: 'top' }]
                : styles.input
            }
            onChangeText={handleTextChange}
            // onChangeText={text => {
            //   isNumber ? handleNumberInput(text) : onChanged && onChanged(text);
            // }}
            // value={value}
            value={
              isNumber ? formatNumberWithCommas(`${value ?? ''}`) : value || ''
            }
            placeholder={hintText}
            secureTextEntry={obscureText}
            keyboardType={isNumber ? 'numeric' : 'default'}
            editable={!readOnly}
            maxLength={maxLength}
            multiline={maxLines > 1}
            numberOfLines={maxLines}
            placeholderTextColor={CustomColors.checkBoxBorderColor}
            selectionColor={DynamicColors().primaryBrandColor}
          />
        }

        {suffixIcon && (
          <View onTouchEnd={onSuffixTap} style={styles.iconContainer}>
            {suffixIcon}
          </View>
        )}
        {suffix}
        {/* {suffix && <View>{suffix}</View>} */}
      </View>

      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingVertical: 2,

    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    borderRadius: 5,
    // paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: CustomColors.backBorderColor,

    // height: 50,
    // textAlignVertical: 'top',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default CustomFormTextField;
