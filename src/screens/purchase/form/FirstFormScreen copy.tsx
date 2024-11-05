// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   StyleSheet,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   FlatList,
//   Keyboard,
// } from 'react-native';
// import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useMiscStore} from '../../../store/miscStore';
// import {ProductDetailsModel} from '../../../models/ProductDetailsModel';
// import {RootStackParamList} from '../../../utils/navigatorStackList';
// import CustomButton from '../../../components/CustomButton';
// import CustomAppBar from '../../../components/CustomAppBar';
// import { FormFieldModel } from '../../../models/FormFieldModel';
// import log from '../../../utils/logger';
// import PoweredByFooter from '../../../components/PoweredByFooter';
// import BuildFormFieldWidget from './components/BuildFormFieldWidget';
// import { ProductPriceContainer } from './components/ProductPriceContainer';
// import { useFormStore } from '../../../store/formStore';
// // import { useMiscStore } from '../store/miscStore';
// // import CustomButton from '../components/CustomButton'; // Replace with your custom button
// // import CustomAppbar from '../components/CustomAppbar'; // Replace with your custom appbar
// // import { RootStackParamList } from '../navigation/types'; // Import your navigation types
// // import { ProductDetailsModel } from '../models/ProductDetailsModel'; // Import your product model

// // Props interface for this screen
// interface FirstFormScreenProps {
//   productDetails: ProductDetailsModel;
// }

// // Type for route
// // type FirstFormScreenRouteProp = RouteProp<RootStackParamList, 'FirstFormScreen'>;

// // // Type for navigation
// // type FirstFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FirstFormScreen'>;

// // export const GridViewProviderListScreen: React.FC<GridViewProviderListScreenProps> = ({ categoryId, productCategory }) => {
// type FirstFormScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'FirstFormScreen'
// >;

// export const FirstFormScreen: React.FC<FirstFormScreenProps> = () => {
//   //         ..
//   const globalForm = useFormStore((state: any) => state);
//   // const FirstFormScreen: React.FC<FirstFormScreenProps> = ({ route, navigation }) => {

//     const navigation = useNavigation();
//     const route = useRoute<FirstFormScreenRouteProp>();

//   const {productDetails} = route.params; // Typed route params
//   const miscGlobal = useMiscStore();
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: {errors},
// //     setValue,
// //   } = useForm<ProductDetailsModel>();
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   // Ensure that the formFields type is correctly typed based on ProductDetailsModel
// //   const formFields = productDetails?.formFields || [];
// // Assuming productDetails.formFields is available from the component's props
// const formFields = productDetails?.formFields || [];

// // Filter the fields where showFirst is true
// const filteredFields = formFields.filter((field: FormFieldModel) => field.showFirst === true);

// // Sort the filtered fields by position
// filteredFields.sort((a: FormFieldModel, b: FormFieldModel) => (a.position || 0) - (b.position || 0));

// // Assuming you are managing `currentPage` state with useState
// const itemsPerPage = currentPage === 0 ? 4 : 3;

// // Calculate the start and end index for pagination
// const startIndex = currentPage === 0 ? 0 : 4 + (currentPage - 1) * 3;
// const endIndex = startIndex + itemsPerPage;

// // Slice the filtered fields to get only the current page's fields
// const currentFields = filteredFields.slice(
//   startIndex,
//   endIndex > filteredFields.length ? filteredFields.length : endIndex
// );

// // Determine if the current page is the last page
// const isLastPage = endIndex >= filteredFields.length;

//   // Initialize controllers for form fields
//   useEffect(() => {
//     // formFields.forEach((field: {name: string}) => {
//     //   if (field.name) {
//     //     setValue(field.name, miscGlobal.getInitialValue(field.name)); // Set initial values from store
//     //   }
//     // });
//     log.error(productDetails)

//     setIsLoading(false);
//   }, []);

//   // Handle form submission
//   // const onSubmit = (data: ProductDetailsModel) => {
//   //   console.log('Form Data:', data);
//   //   if (currentPage < formFields.length - 1) {
//   //     setCurrentPage(currentPage + 1);
//   //   } else {
//   //     // Correctly navigate to PaymentMethodScreen with formData
//   //     //   navigation.navigate('PaymentMethodScreen', { formData: data });
//   //   }
//   // };

//   const onSubmit = () => {
//     // console.log('Form Data:', data);
//     if (currentPage < formFields.length - 1) {
//       setCurrentPage(currentPage + 1);
//     } else {
//       // Correctly navigate to PaymentMethodScreen with formData
//       //   navigation.navigate('PaymentMethodScreen', { formData: data });
//     }
//   };

//   const renderFormField = (field:any, index:any) => {
//     return (
//       <BuildFormFieldWidget
//         key={index}
//         field={field}
//         isLastPage={isLastPage}
//         // controller={globalForm.controllers[field.name]}
//         filteredFieldsLength={filteredFields.length}
//         // formVM={formVM}
//         onClearFocus={() => {
//           if (Keyboard.isVisible()) {
//             Keyboard.dismiss();
//           }
//         }}
//       />
//     );
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <View style={styles.container}>
//         <CustomAppBar
//           onBackTap={
//             navigation.canGoBack() ? () => navigation.goBack() : undefined
//           }
//         />
//         <ScrollView contentContainerStyle={styles.formContainer}>
//           <Text style={styles.title}>Provide Plan Owner Details</Text>

//           {isLoading ? (
//             <ActivityIndicator size="large" color="#0000ff" />
//           ) :

//           (
//             filteredFields
//               .slice(currentPage, currentPage + 3)
//               .map((field, index) => (
//                 <View key={index} style={styles.fieldContainer}>
//                   {/* <Text>{field.label || 'Unnamed Field'}</Text> */}

//     <ScrollView>
//       <View style={{ marginVertical: 10 }} />
//       <View style={{ marginVertical: 25 }} />

//       {currentPage === 0 ? (
//         <>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             {filteredFields.slice(0, 2).map((field, index) => (
//               <View key={index} style={{ flex: 1, marginHorizontal: 10 }}>
//                 {renderFormField(field, index)}
//               </View>
//             ))}
//           </View>

//           <FlatList
//             data={currentFields.slice(2)}
//             // keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => renderFormField(item, index)}
//             scrollEnabled={false}
//           />
//         </>
//       ) : (
//         <FlatList
//           data={currentFields}
//           // keyExtractor={(item) => item.id}
//           renderItem={({ item, index }) => renderFormField(item, index)}
//           scrollEnabled={false}
//         />
//       )}

//       <View style={{ marginVertical: 80 }} />

//       {/* Conditional Visibility */}
//       {/* {Keyboard.isVisible() ? (
//         <View>
//           {isLastPage && <ProductPriceContainer title="Premium" isLoading={formVM.isLoading} />}
//           <CustomButton
//             title={paymentVM.price === 0 ? 'Continue' : 'Proceed to payment'}
//             isLoading={paymentVM.isLoading}
//             onPress={() => {
//               if (!formVM.isLoading) {
//                 if (currentPageIndex < filteredFields.length) {
//                   setCurrentPageIndex(currentPageIndex + 1);
//                 } else {
//                   // Handle payment logic
//                 }
//               }
//             }}
//           />
//         </View>
//       ) :  */}
//       {/* (
//         <View>
//           {isLastPage && <ProductPriceContainer title="Premium" isLoading={false} />}
//           <CustomButton
//             // title={paymentVM.price === 0 ? 'Continue' : 'Proceed to payment'}
//             title={'Continue'}
//             isLoading={false}
//             onPress={() => {
//               // if (!formVM.isLoading) {
//                 if (currentPage < filteredFields.length) {
//                   setCurrentPage(currentPage + 1);
//                 } else {
//                   // Handle payment logic
//                 }
//               // }
//             }}
//           />
//           <View style={{ marginVertical: 25 }} />
//           <PoweredByFooter />
//         </View>
//       ) */}
//     </ScrollView>

//                   {/* <Controller
//                     control={control}
//                     name={field.name}
//                     render={({
//                       field: {onChange, value},
//                     }: {
//                       field: {onChange: (value: string) => void; value: string};
//                     }) => (
//                       <TextInput
//                         style={styles.input}
//                         value={value}
//                         onChangeText={onChange}
//                         placeholder={field.label}
//                       />
//                     )}
//                     rules={{required: field.isRequired}}
//                   /> */}
//                   {/* {errors[field.name] && (
//                     <Text style={styles.errorText}>This field is required</Text>
//                   )} */}
//                 </View>
//               ))
//           )

//           }

//           <CustomButton
//             title={
//               currentPage < formFields.length - 1
//                 ? 'Continue'
//                 : 'Proceed to Payment'
//             }
//             onPress={onSubmit}
//           />
//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   fieldContainer: {
//     marginBottom: 15,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//   },
// });

// export default FirstFormScreen;
