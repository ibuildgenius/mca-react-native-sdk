// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SpinKitFadingCircle } from 'react-native-spinkit';
// import globalObject from 'store/globalObject';
// import CustomButton from 'components/CustomButton';
// import { VerticalSpacer } from 'components/Spacer';
// import PoweredByFooter from 'components/PoweredByFooter';

// interface ClaimInitScreenProps {}

// const ClaimInitScreen: React.FC<ClaimInitScreenProps> = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const navigation = useNavigation();

//   const handleContinue = () => {
//     if (isChecked) {
//       navigation.navigate('ConfirmPolicyScreen');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <VerticalSpacer height={20} />
//         <CustomText
//           text={
//             globalObject.businessDetails?.sdkWelcomeScreenHeaderPreClaim ||
//             'Welcome to the Claim Portal'
//           }
//           style={styles.headerText}
//         />

//         <VerticalSpacer height={20} />
//         <CustomText
//           text={
//             globalObject.businessDetails?.sdkWelcomeScreenBodyPreClaim ||
//             "We're here to assist you through the claim process."
//           }
//           style={styles.bodyText}
//           textAlign="center"
//         />

//         <VerticalSpacer height={30} />
//         <View style={styles.imageContainer}>
//           {globalObject.businessDetails?.sdkBannerPurchase ? (
//             <CachedImage
//               source={{ uri: globalObject.businessDetails.sdkBannerPurchase }}
//               style={styles.image}
//               placeholder={<SpinKitFadingCircle color="#0000ff" size={35} />}
//             />
//           ) : (
//             <Image
//               source={require('../assets/inspectionWelcome.png')} // Replace with actual path
//               style={styles.image}
//             />
//           )}
//         </View>

//         <VerticalSpacer height={30} />

//         <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
//           <View style={styles.checkboxContainer}>
//             <CheckBox value={isChecked} onValueChange={setIsChecked} />
//             <Text style={styles.checkboxText}>
//               I have read and understand this Privacy Policy.
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <VerticalSpacer height={30} />

//         <CustomButton
//           title="Continue"
//           onPress={!isChecked ? undefined : handleContinue}
//         />

//         <VerticalSpacer height={25} />

//         <PoweredByFooter />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   bodyText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   imageContainer: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginVertical: 20,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkboxText: {
//     fontSize: 14,
//     marginLeft: 10,
//     color: '#333',
//   },
// });

// export default ClaimInitScreen;
