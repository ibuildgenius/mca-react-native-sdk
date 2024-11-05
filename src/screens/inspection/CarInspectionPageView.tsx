import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoding';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import CameraRoll from '@react-native-camera-roll/camera-roll';
// import { Camera } from 'react-native-camera';
// import { useInspectionStore } from './zustandStore'; // Use Zustand for state management if necessary
// import CustomButton from './components/CustomButton';
// import CustomText from './components/CustomText';
// import PoweredByFooter from './components/PoweredByFooter';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import {
  customTextStyles,
  SemiBoldText,
  W500Text,
} from '../../components/CustomText';
import AutoInspectionStep1 from '../../components/AutoInspectionStep';
import { PageViewContent, ToastStatus } from '../../utils/enums';
import { CustomColors } from '../../constants/CustomColors';
import CustomAppBar from '../../components/CustomAppBar';
import { HorizontalSpacer, VerticalSpacer } from '../../components/Spacer';
import globalObject from '../../store/globalObject';
import { showToast } from '../../components/CustomToast';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/navigatorStackList';
import React from 'react';
// import type { RootStackParamList } from 'utils/navigatorStackList';

const screenWidth = Dimensions.get('window').width;

const CarInspectionPageView = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to request permissions
  const requestPermissions = async () => {
    try {
      const cameraPermission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.CAMERA)
          : await request(PERMISSIONS.ANDROID.CAMERA);
      const locationPermission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // const microphonePermission = await request(
      //   PERMISSIONS.ANDROID.RECORD_AUDIO,
      // );

      if (
        cameraPermission === RESULTS.GRANTED &&
        locationPermission === RESULTS.GRANTED
      ) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permissions required',
          'Please accept all permissions to proceed.'
        );
      }
    } catch (error) {
      console.error('Error requesting permissions', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);

      Geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          const latitude = position.coords.latitude;
          console.log(latitude);
          const longitude = position.coords.longitude;
          console.log(longitude);
          getAddressFromLatLng(latitude, longitude);
        },
        (error) => {
          setIsLoading(false);

          showToast(
            ToastStatus.failed,
            error?.toString() ?? 'Failed to get current position'
          );
          console.error('Geolocation Error:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      setIsLoading(false);
      showToast(
        ToastStatus.failed,
        error?.toString() ?? 'Failed to get current position'
      );
    }
  };

  const getAddressFromLatLng = async (latitude: number, longitude: number) => {
    // Update global coordinates
    globalObject.inspectionLatitude = latitude.toString();
    globalObject.inspectionLongitude = longitude.toString();

    // Make a request to Nominatim API
    // const response = await axios.get(
    //   `https://nominatim.openstreetmap.org/reverse`,
    //   {
    //     params: {
    //       lat: latitude,
    //       lon: longitude,
    //       format: 'json',
    //     },
    //   },
    // );

    // Parse the response
    // if (response.data && response.data.address) {
    //   const {road, city, state, postcode, country} = response.data.address;
    //   globalObject.inspectionAddress = `${road}, ${city}, ${state}, ${postcode}, ${country}`;
    //   console.log('Address:', globalObject.inspectionAddress);
    // }

    const response = await fetch(
      'https://nominatim.openstreetmap.org/reverse?lat=37.421998333333335&lon=-122.084&format=json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const address = data.address;

      console.log(address);
      console.log(address.road);
      console.log(address.city);
      console.log(address.state);
      console.log(address.country);

      globalObject.inspectionAddress = `${address.road}, ${address.city}, ${address.state}, ${address.country}`;
      console.log('Address:', globalObject.inspectionAddress);
    } else {
      console.log(response);
    }
    navigation.navigate('VehicleVerificationScreen');
  };

  return (
    <View style={styles.container}>
      <CustomAppBar showLogo={false} showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <VerticalSpacer height={30} />
        <SemiBoldText
          title={'Step on how to inspect'}
          fontSize={21}
          color={CustomColors.blackTextColor}
          textAlign="center"
        />
        <VerticalSpacer height={15} />
        <Text
          style={[
            customTextStyles.regular,
            {
              fontSize: 16.5,
              color: CustomColors.blackColor,
              paddingHorizontal: 20,
              textAlign: 'center',
            },
          ]}
        >
          It is important to note all these{' '}
          <Text
            style={[
              customTextStyles.regular,
              { fontSize: 16.5, color: CustomColors.purple500Color },
            ]}
          >
            STEP
          </Text>{' '}
          before starting your Inspection
        </Text>
        <VerticalSpacer height={25} />

        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            {[0, 1, 2, 3].map((index) => (
              <TouchableOpacity onPress={() => setCurrentPage(index)}>
                <Animated.View
                  key={index}
                  style={[
                    index === currentPage
                      ? styles.activeStepContainer
                      : styles.inactiveStepContainer,
                    index === currentPage && styles.activeStepCircle,
                  ]}
                >
                  {index === currentPage ? (
                    <Text
                      style={[
                        customTextStyles.regular,
                        {
                          fontSize: 16.5,
                          color: CustomColors.blackTextColor,
                        },
                      ]}
                    >
                      STEP{' '}
                      <Text
                        style={[
                          customTextStyles.regular,
                          {
                            fontSize: 16.5,
                            color: CustomColors.purple500Color,
                          },
                        ]}
                      >
                        {`${index + 1}`}
                      </Text>
                    </Text>
                  ) : (
                    <W500Text
                      title={`${index + 1}`}
                      fontSize={16.5}
                      color={CustomColors.checkBoxBorderColor}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.pageContent}>
            {currentPage === 0 && (
              <AutoInspectionStep1
                content={PageViewContent.firstAutoPage}
                section1Text="Park your Vehicle in a "
                section2Text="well-lit, shaded, "
                section3Text="and "
                section4Text="spacious area"
                section5Text=", ensuring there are "
                section6Text="no obstructions."
              />
            )}
            {currentPage === 1 && (
              <AutoInspectionStep1
                content={PageViewContent.secondAutoPage}
                section3Text="front view"
                imageTitle=""
              />
            )}
            {currentPage === 2 && (
              <AutoInspectionStep1
                content={PageViewContent.thirdAutoPage}
                section3Text="Left view"
                imageTitle=""
              />
            )}
            {currentPage === 3 && (
              <AutoInspectionStep1
                content={PageViewContent.fourthAutoPage}
                section3Text="Back view"
                imageTitle=""
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {currentPage !== 3 && (
          <View style={{ flex: 1 }}>
            <CustomButton
              title="Skip"
              fontSize={14.5}
              buttonColor={CustomColors.dividerGreyColor}
              textColor={CustomColors.backTextColor}
              onPress={() => setCurrentPage(3)}
            />
          </View>
        )}
        <HorizontalSpacer width={10} />
        <View style={{ flex: 2 }}>
          <CustomButton
            title={currentPage === 3 ? 'Start Inspection' : 'Next'}
            onPress={
              currentPage === 3
                ? requestPermissions
                : () => setCurrentPage(currentPage + 1)
            }
            isLoading={isLoading}
          />
        </View>
      </View>
      {/* Footer Component */}
      {/* Footer Buttons */}
      <View style={styles.poweredByFooterContainer}>
        <PoweredByFooter />
      </View>
    </View>
  );
};

export default CarInspectionPageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContent: {
    paddingBottom: 120, // To ensure scrolling behind footer
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activeStepContainer: {
    width: 80,
    height: 30,
    borderRadius: 15,
    backgroundColor: CustomColors.backBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  inactiveStepContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: CustomColors.backBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeStepCircle: {
    backgroundColor: CustomColors.backBorderColor,
    width: 70,
  },
  pageContent: {
    width: screenWidth - 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  poweredByFooterContainer: {
    // marginTop: 20, // Adds space between the buttons and footer
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  skipButton: {
    backgroundColor: '#EAEAEA',
  },
});

// const CarInspectionPageView = () => {
//   const navigation = useNavigation();
//   const [currentPage, setCurrentPage] = useState(0);
//   //   const [currentPosition, setCurrentPosition] = useState<Geolocation.GeoPosition | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to request permissions
//   const requestPermissions = async () => {
//     try {
//       const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
//       const locationPermission = await request(
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );
//       const microphonePermission = await request(
//         PERMISSIONS.ANDROID.RECORD_AUDIO,
//       );

//       if (
//         cameraPermission === RESULTS.GRANTED &&
//         locationPermission === RESULTS.GRANTED &&
//         microphonePermission === RESULTS.GRANTED
//       ) {
//         getCurrentLocation();
//       } else {
//         Alert.alert(
//           'Permissions required',
//           'Please accept all permissions to proceed.',
//         );
//       }
//     } catch (error) {
//       console.error('Error requesting permissions', error);
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       setIsLoading(true);
//       Geolocation.getCurrentPosition(
//         position => {
//           //   setCurrentPosition(position);
//           setIsLoading(false);
//           // Navigate to Camera Screen or continue inspection
//           navigation.navigate('VehicleVerification', {position});
//         },
//         error => {
//           setIsLoading(false);
//           Alert.alert('Error', 'Failed to get current position');
//           console.error('Geolocation Error:', error);
//         },
//         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//       );
//     } catch (error) {
//       setIsLoading(false);
//       Alert.alert('Error', 'Failed to get current position');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <CustomAppBar showLogo={false} showBackButton={true} />
//         <VerticalSpacer height={30} />
//         <SemiBoldText
//           title={'Step on how to inspect'}
//           fontSize={21}
//           color={CustomColors.blackTextColor}
//           textAlign="center"
//         />
//         <VerticalSpacer height={15} />
//         <Text
//           style={[
//             customTextStyles.regular,
//             {
//               fontSize: 16.5,
//               color: CustomColors.blackColor,
//               paddingHorizontal: 20,
//               textAlign: 'center',
//             },
//           ]}>
//           It is important to note all these{' '}
//           <Text
//             style={[
//               customTextStyles.regular,
//               {fontSize: 16.5, color: CustomColors.purple500Color},
//             ]}>
//             STEP
//           </Text>{' '}
//           before starting your Inspection
//         </Text>
//         <VerticalSpacer height={25} />
//         <View style={styles.stepContainer}>
//           {/* PageView for Step Indicators */}
//           <View style={styles.stepIndicator}>
//             {[0, 1, 2, 3].map(index => (
//               <Animated.View
//                 key={index}
//                 style={[
//                   index === currentPage
//                     ? styles.activeStepContainer
//                     : styles.inactiveStepContainer,
//                   index === currentPage && styles.activeStepCircle,
//                 ]}>
//                 {index === currentPage ? (
//                   <Text
//                     style={[
//                       customTextStyles.regular,
//                       {
//                         fontSize: 16.5,
//                         color: CustomColors.blackTextColor,
//                       },
//                     ]}>
//                     STEP{' '}
//                     <Text
//                       style={[
//                         customTextStyles.regular,
//                         {fontSize: 16.5, color: CustomColors.purple500Color},
//                       ]}>
//                       {`${index + 1}`}
//                     </Text>
//                   </Text>
//                 ) : (
//                   <W500Text
//                     title={`${index + 1}`}
//                     fontSize={16.5}
//                     color={CustomColors.checkBoxBorderColor}
//                   />
//                 )}
//               </Animated.View>
//             ))}
//           </View>

//           {/* Step Content - dynamically render based on currentPage */}
//           <View style={styles.pageContent}>
//             {currentPage === 0 && (
//               //   <RegularText title="Park your Vehicle in a well-lit, shaded, and spacious area." />

//               <AutoInspectionStep1
//                 content={PageViewContent.firstAutoPage}
//                 section1Text="Park your Vehicle in a "
//                 section2Text="well-lit, shaded, "
//                 section3Text="and "
//                 section4Text="spacious area"
//                 section5Text=", ensuring there are "
//                 section6Text="no obstructions."
//               />
//             )}
//             {currentPage === 1 && (
//               <AutoInspectionStep1
//                 content={PageViewContent.secondAutoPage}
//                 section3Text="front view"
//                 imageTitle="Front View"
//               />
//             )}
//             {currentPage === 2 && (
//               <AutoInspectionStep1
//                 content={PageViewContent.thirdAutoPage}
//                 section3Text="Left view"
//                 imageTitle="Left View ( Driver Side )"
//               />
//             )}
//             {currentPage === 3 && (
//               <AutoInspectionStep1
//                 content={PageViewContent.fourthAutoPage}
//                 section3Text="Back view"
//                 imageTitle="Back View"
//               />
//             )}
//           </View>
//         </View>
//         {/* Footer Buttons */}
//         <View style={styles.footer}>
//           {currentPage !== 3 && (
//             <CustomButton
//               title="Skip"
//               onPress={() => setCurrentPage(3)}
//               //   style={styles.skipButton}
//             />
//           )}
//           <CustomButton
//             title={currentPage === 3 ? 'Start Inspection' : 'Next'}
//             onPress={
//               currentPage === 3
//                 ? requestPermissions
//                 : () => setCurrentPage(currentPage + 1)
//             }
//             isLoading={isLoading}
//           />
//         </View>
//         {/* Footer Info */}
//         <PoweredByFooter />
//       </ScrollView>
//     </View>
//   );
// };

// export default CarInspectionPageView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginVertical: 10,
//     textAlign: 'center',
//   },
//   stepContainer: {
//     alignItems: 'center',
//   },
//   stepIndicator: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   activeStepContainer: {
//     width: 80,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: CustomColors.backBorderColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   inactiveStepContainer: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: CustomColors.backBorderColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   activeStepCircle: {
//     backgroundColor: CustomColors.backBorderColor,
//     width: 70,
//   },
//   stepText: {
//     color: '#FFF',
//     fontWeight: '600',
//   },
//   pageContent: {
//     width: screenWidth - 40,
//     // padding: 20,
//     // backgroundColor: '#F8F8F8',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//     paddingHorizontal: 20,
//   },
//   skipButton: {
//     backgroundColor: '#EAEAEA',
//   },
// });
