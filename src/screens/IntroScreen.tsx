import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import globalObject from '../store/globalObject';
import { PaymentOption, TransactionType } from '../utils/enums';
import { useNavigation } from '@react-navigation/native';
import ProviderUtils from '../utils/ProviderUtils';
import CustomListDropdownField from './claims/components/CustomListDropdownField';
// import showToast from '../components/CustomToast';
import axios from 'axios';
import { CustomColors } from '../constants/CustomColors';
import { Circle } from 'react-native-animated-spinkit';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/navigatorStackList';
// import type { RootStackParamList } from 'utils/navigatorStackList';

// 'MCAPUBK_TEST|49303c8b-4fb4-4d8b-a4d3-c2f6f6d0fb62',
//  'MCAPUBK_TEST|1acf339a-d36f-47e7-8e1b-fd0b76b61b0c',

const InputForm: React.FC = () => {
  const [apikey, setApikey] = useState(
    // 'MCAPUBK_TEST|49303c8b-4fb4-4d8b-a4d3-c2f6f6d0fb62',
    'MCAPUBK_TEST|1acf339a-d36f-47e7-8e1b-fd0b76b61b0c'
  );
  const [policyId, setPolicyId] = useState(
    // '5aae3551-4d25-4eb0-9d50-aff05b4c89a1',
    // 'ed23eefa-ebdd-45d6-8945-3c866ceb54d8',
    // '29a4edf6-6c7b-44b0-852f-5ed8c5bc34c1',
    // '91948903-dd25-41e9-a5a0-09f683dd31bc',
    // '191f9fd6-e212-4629-9131-16705999cbc4', --->preport
    // 'a083b408-bc30-49d8-a5d1-9f75bfb34cc9'...,
    // '438b30d5-a32f-4323-9042-ed8888aeec60', ---?Pais Gadget
    '91948903-dd25-41e9-a5a0-09f683dd31bc'

    // '7926c51c-0a69-4e2b-af5d-0d5d6d085b18',
  );
  const [policyNumber, setPolicyNumber] = useState(
    // '110105102401277',
    '110105102401619'
    // 'ACC/AR/10/2024/HQ/2659',
  );
  const [referenceNumber, setReferenceNumber] = useState('');
  // 'ACC/AR/10/2024/HQ/3121',----Paid gadget
  // '110105102401619',
  // '110105102401624',
  // '110105102401963',
  const [email, setEmail] = useState('fuhad@mycovergenius.com');

  const [transactionType, setTransactionType] = useState('claim');
  const [paymentOption, setPaymentOption] = useState('gateway');
  const [isLoading, setIsLoading] = useState(false);
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const items = ['purchase', 'inspection', 'claim', 'continue purchase'];
  const paymentOptions = ['gateway', 'wallet'];

  const handleSubmit = async () => {
    if (!apikey) {
      Alert.alert('Error', 'API Key is required!');
      return;
    }

    const formData = {
      apikey,
      policyId,
      policyNumber,
      email,
      transactionType,
    };

    console.log(formData);
    ProviderUtils.resetAllProviders();
    globalObject.setPublicKey(apikey);
    globalObject.setPolicyId(policyId);
    globalObject.setPolicyNumber(policyNumber);
    globalObject.setEmail(email);
    globalObject.setInspectionEmail(email);
    globalObject.setReference(referenceNumber);

    globalObject.setTransactionType(
      transactionType == 'claim'
        ? TransactionType.claim
        : transactionType == 'inspection'
          ? TransactionType.inspection
          : transactionType == 'continue purchase'
            ? TransactionType.continuePurchase
            : TransactionType.purchase
    );

    globalObject.setPaymentOption(
      paymentOption == 'wallet' ? PaymentOption.wallet : PaymentOption.gateway
    );
    globalObject.setPublicKey(apikey);

    if (paymentOption == 'wallet') {
      setIsLoading(true);
      const response = await fetchData();
      globalObject.reference = response.data;
      setIsLoading(false);
    }

    // Alert.alert('Success', 'Form submitted successfully!');

    // showToast(ToastStatus.failed, 'errorMessage');

    // const showLoadingText = true;

    navigation.navigate('StartupScreen');
  };

  const fetchData = async (): Promise<Record<string, any>> => {
    const url =
      'https://staging.api.mycover.ai/v1/distributors/create-debit-wallet-reference';

    const headers = {
      'Authorization':
        'Bearer MCASECK_TEST|5a571e24-f938-4f14-945c-40ea3cfbc468',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, {}, { headers });
      if (response.status >= 200 && response.status < 300) {
        const { responseCode, responseText, data } = response.data;
        return {
          responseCode,
          responseText,
          data,
        };
      } else {
        throw new Error('Failed to load data');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.responseText || 'Unknown error';
      throw new Error(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>Policy Form</Text>

        <Text style={styles.label}>
          API Key <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter API Key"
          value={apikey}
          onChangeText={setApikey}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Policy ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Policy ID"
          value={policyId}
          onChangeText={setPolicyId}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Policy Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Policy Number"
          value={policyNumber}
          onChangeText={setPolicyNumber}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />

        {/* <Text style={styles.label}>Transaction Type</Text> */}
        {/* <TextInput
        style={styles.input}
        placeholder="Enter Transaction Type"
        value={transactionType}
        onChangeText={setTransactionType}
        placeholderTextColor="#888"
      /> */}

        <CustomListDropdownField
          label="Select Transaction Type"
          showSearch={false}
          items={items} //    {['Accidental damage', 'Theft']}
          selectedItem={transactionType}
          onValueChange={(value: string) => setTransactionType(value)}
        />

        <CustomListDropdownField
          label="Select Payment Option"
          showSearch={false}
          items={paymentOptions} //    {['Accidental damage', 'Theft']}
          selectedItem={paymentOption}
          onValueChange={(value: string) => setPaymentOption(value)}
        />

        <Text style={styles.label}>Reference Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Reference Number"
          value={referenceNumber}
          onChangeText={setReferenceNumber}
          placeholderTextColor="#888"
        />

        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {isLoading ? (
            <Circle size={28} color={CustomColors.whiteColor} />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity> */}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => {
        //   showToast(
        //     ToastStatus.success,
        //     'errorMessageerrorMessageerrorMessageerrorMessageerrorMessageerrorMessageerrorMessage',
        //   );
        // }}
        onPress={handleSubmit}

        // onPress={() => {
        //   setIsLoading(true);
        //   Geolocation.getCurrentPosition(
        //     async position => {
        //       console.log(22222);
        //       setIsLoading(false);
        //       const latitude = position.coords.latitude;
        //       console.log(latitude);
        //       const longitude = position.coords.longitude;
        //       console.log(longitude);
        //       // getAddressFromLatLng(latitude, longitude);
        //       // navigation.navigate('VehicleVerification', {position});

        //       globalObject.inspectionLatitude = latitude.toString();
        //       globalObject.inspectionLongitude = longitude.toString();
        //       console.log('response');

        //       try {
        //         // const response = await axios.get(
        //         //   // `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        //         //   'https://nominatim.openstreetmap.org/reverse?lat=37.421998333333335&lon=-122.084&format=json',
        //         //   // {
        //         //   //   params: {
        //         //   //     lat: latitude,
        //         //   //     lon: longitude,
        //         //   //     format: 'json',
        //         //   //   },
        //         //   // },
        //         // );

        //         const response = await fetch(
        //           'https://nominatim.openstreetmap.org/reverse?lat=37.421998333333335&lon=-122.084&format=json',
        //           {
        //             method: 'GET',
        //             headers: {
        //               'Content-Type': 'application/json',
        //             },
        //           },
        //         );
        //         if (response.ok) {
        //           const data = await response.json();
        //           const address = data.address;

        //           // Log or access specific parts of the address
        //           console.log(address); // Entire address object
        //           console.log(address.road); // "Amphitheatre Parkway"
        //           console.log(address.city); // "Mountain View"
        //           console.log(address.state); // "California"
        //           console.log(address.country); // "United States"
        //         } else {
        //           console.log(response);
        //         }
        //       } catch (error) {
        //         console.log(error);
        //       }

        //       // if (response.data && response.data.address) {
        //       // const {road, city, state, postcode, country} =
        //       //   response.data.address;
        //       // globalObject.inspectionAddress = `${road}, ${city}, ${state}, ${postcode}, ${country}`;
        //       //   console.log('Address:', globalObject.inspectionAddress);
        //       // }
        //     },
        //     error => {
        //       setIsLoading(false);
        //       Alert.alert('Error', 'Failed to get current position');
        //       console.error('Geolocation Error:', error);
        //     },
        //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        //   );
        //   setIsLoading(false);
        // }}
      >
        {isLoading ? (
          <Circle size={28} color={CustomColors.whiteColor} />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputForm;
