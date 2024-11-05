// // import Toast from 'react-native-toast-message';
// // import {ToastStatus} from '../utils/enums';

// import React from 'react';
// import Toast, {
//   BaseToast,
//   BaseToastProps,
//   ToastConfig,
// } from 'react-native-toast-message';
// import {customTextStyles} from './CustomText';
// import {CustomColors} from '../constants/CustomColors';
// import {ToastStatus} from '../utils/enums';

// // const toastProps: BaseToastProps = {
// //   text1Style: {
// //     fontSize: 14,
// //   },
// //   text2Style: {
// //     fontSize: 14,
// //   },
// //   text1NumberOfLines: 0,
// //   text2NumberOfLines: 0,
// //   style: {
// //     height: 'auto',
// //     paddingVertical: 10,
// //     paddingHorizontal: 0,
// //   },
// // };

// const toastProps: BaseToastProps = {
//   text1Style: {
//     fontSize: 14,
//     flexWrap: 'wrap',
//   },
//   text2Style: {
//     fontSize: 14,
//     flexWrap: 'wrap',
//   },
//   text1NumberOfLines: 0, // Unlimited lines
//   text2NumberOfLines: 0, // Unlimited lines
//   style: {
//     height: 'auto',
//     paddingVertical: 10,
//     paddingHorizontal: 0,
//   },
// };

// export const toastConfig: ToastConfig = {
//   success: props => (
//     <BaseToast
//       {...props}
//       {...toastProps}
//       style={[
//         customTextStyles.regular,
//         toastProps.style,
//         {borderLeftColor: '#69C779'},
//       ]}
//       text1Style={[
//         customTextStyles.regular,
//         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
//       ]}
//     />
//   ),
//   error: props => (
//     <BaseToast
//       {...props}
//       {...toastProps}
//       style={[
//         customTextStyles.regular,
//         toastProps.style,
//         {borderLeftColor: '#FE6301'},
//       ]}
//       text1Style={[
//         customTextStyles.regular,
//         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
//       ]}
//     />
//   ),
// };

// // export const toastConfig: ToastConfig = {
// //   success: props => (
// //     <BaseToast
// //       {...props}
// //       {...toastProps}
// //       style={[
// //         customTextStyles.regular,
// //         toastProps.style,
// //         {
// //           borderLeftColor: '#69C779',
// //         },
// //       ]}
// //       text1Style={[
// //         customTextStyles.regular,
// //         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
// //       ]}
// //     />
// //   ),

// //   error: (props: BaseToastProps) => (
// //     <BaseToast
// //       {...props}
// //       {...toastProps}
// //       style={[
// //         customTextStyles.regular,
// //         toastProps.style,
// //         {
// //           borderLeftColor: '#FE6301',
// //         },
// //       ]}
// //       text1Style={[
// //         customTextStyles.regular,
// //         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
// //       ]}
// //     />
// //   ),
// //   failed: (props: BaseToastProps) => (
// //     <BaseToast
// //       {...props}
// //       {...toastProps}
// //       style={[
// //         customTextStyles.regular,
// //         toastProps.style,
// //         {
// //           borderLeftColor: '#FE6301',
// //         },
// //       ]}
// //       text1Style={[
// //         customTextStyles.regular,
// //         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
// //       ]}
// //     />
// //   ),
// //   warning: props => (
// //     <BaseToast
// //       {...props}
// //       {...toastProps}
// //       style={[
// //         customTextStyles.regular,
// //         toastProps.style,
// //         {
// //           borderLeftColor: '#FFC107',
// //         },
// //       ]}
// //       text1Style={[
// //         customTextStyles.regular,
// //         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
// //       ]}
// //     />
// //   ),

// //   pending: props => (
// //     <BaseToast
// //       {...props}
// //       {...toastProps}
// //       style={[
// //         customTextStyles.regular,
// //         toastProps.style,
// //         {
// //           borderLeftColor: '#FFC107',
// //         },
// //       ]}
// //       text1Style={[
// //         customTextStyles.regular,
// //         {fontSize: 14, color: CustomColors.blackTextColor, marginBottom: 8},
// //       ]}
// //     />
// //   ),
// // };

// {
//   /* <Toast config={toastConfig} />; */
// }

// const showToast = (
//   status: ToastStatus = ToastStatus.failed, // Default is 'failed'
//   title: string = 'Oops!', // Default title if none provided
// ) => {
//   let toastType: 'success' | 'error' | 'info' | 'default';

//   // Map the status to the appropriate toast type
//   switch (status) {
//     case ToastStatus.success:
//       toastType = 'success';
//       break;
//     case ToastStatus.pending:
//       toastType = 'info'; // Assuming 'pending' will show as 'info' toast
//       break;
//     case ToastStatus.failed:
//     default:
//       toastType = 'error';
//       break;
//   }

//   // Show the toast
//   Toast.show({
//     type: toastType,
//     text1: title,
//     visibilityTime: 4000, // 4000ms = 4 seconds (default duration)
//     autoHide: true, // Ensures the toast will hide automatically
//   });
// };

// export default showToast;
