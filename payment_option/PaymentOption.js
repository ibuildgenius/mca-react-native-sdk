import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MCALayout from '../components/MCALayout';
import {useState} from 'react';
import SuccessScreen from '../components/SuccessScreen';
import { colorBlack, colorGreyOverlay } from "../style/colors";
import {useApiKeyStore} from '../store/urlApiKeyStore';
import { currencify } from "../api/constants";

export default function PaymentOption({navigation, route}) {
  let product = route.params.data.product;
  let formData = route.params.data.form;
  let [loading, setLoading] = useState(false);
  let [buttonText, setButtonText] = useState('Get Covered');
  let [paymentDetails, setPaymentDetails] = useState({});
  let [paymentResponse, setPaymentResponse] = useState({});
  let [paymentVerified, setPaymentVerified] = useState(false);
  let [message, setMessage] = useState('Sending request...');
  let {apiKey, baseUrl} = useApiKeyStore();

  const [paymentString, setPaymentString] = useState('bank transfer');

  function failedDialog(message) {
    Alert.alert('Transaction Failed', message);
  }

  function initiatePurchase() {
    formData.product_id = product.id;

    let payload = {
      instance_id: global.instanceId,
      payment_channel: {
        channel: paymentString,
      },
      payload: formData,
    };

    setLoading(true);

    let url = baseUrl + '/v1/sdk/initiate-purchase';

    const headers = {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    };

    let jsonBody = JSON.stringify(payload);

    fetch(url, {method: 'POST', headers: headers, body: jsonBody})
      .then(response => response.json())
      .then(json => {
        if (json.responseCode == 1) {
          setButtonText('I have sent the money');
          setPaymentDetails(json);
        } else {
          failedDialog(json.responseText);
        }
      })
      .catch(error => {})
      .finally(() => setLoading(false));
  }
  function verifyPayment() {
    setMessage('Verifying transaction...');
    setLoading(true);

    let url = baseUrl + '/v1/sdk/verify-transaction';

    let body = JSON.stringify({
      transaction_reference: paymentDetails.data.reference,
    });

    let headers = {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    };

    fetch(url, {method: 'POST', headers: headers, body: body})
      .then(response => response.json())
      .then(json => {
        if (json.responseCode == 1) {
          setPaymentResponse(json.data);
          setPaymentVerified(true);
        } else {
          Alert.alert('Unable to Verify', json.responseText);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function navigateToNext() {
    navigation.navigate('ProductForm', {
      data: product,
      formData: formData,
      transactionRef: paymentResponse.reference,
    });
  }

  var hasSubmitted = paymentDetails.responseCode == 1;
  function renderLayout() {
    if (paymentDetails.responseCode == 1) {
      let bankDetails = paymentDetails.data;
      return (
        <View style={{flex: 1, marginVertical: 8, backgroundColor: '#F9FAFB'}}>
          <View
            style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'metropolis_regular',
                marginVertical: 12,
                color: colorGreyOverlay,
              }}>
              {bankDetails.message}
            </Text>
            <View
              style={{
                width: '80%',
                marginVertical: 12,
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={{
                fontFamily: 'metropolis_bold',
                textAlign: 'center',
                fontSize: 25,
                fontWeight: '600',
                marginVertical: 12,
                color: colorBlack,
              }}>
              {bankDetails.bank + '\n' + bankDetails.account_number}
            </Text>
            <View
              style={{
                width: '80%',
                marginVertical: 12,
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View style={{flex: 3}} />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Text
          style={{marginTop: 18, fontSize: 18, fontFamily: 'metropolis_bold',color: colorBlack}}>
          Select Payment Method
        </Text>
        <Text
          style={{
            color: '#667085',
            marginTop: 5,
            marginBottom: 15,
            fontSize: 14,
            fontFamily: 'metropolis_regular',
          }}>
          Choose an option to proceed
        </Text>

        <PaymentOptionCard
          imagePath={require('../assets/transfer.png')}
          selected={paymentString == 'bank transfer'}
          title="Transfer"
          sub="Send to bank account"
        />
        <View style={{opacity: 0.2}}>
          <PaymentOptionCard
            imagePath={require('../assets/ussd.png')}
            selected={paymentString == 'ussd'}
            title="USSD"
            sub="Select any bank to generate USSD"
          />
        </View>
      </View>
    );
  }

  function handleButtonBehavior() {
    if (!hasSubmitted) {
      initiatePurchase();
    } else {
      verifyPayment();
    }
  }

  // function nextScreen() {
  //     if (paymentResponse["responseCode"] == 1) {

  //     }
  // }

  if (paymentVerified) {
    return (
      <SuccessScreen
        message={'Payment Verified,\nplease fill out the remaining fields'}
        onDonePressed={navigateToNext}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <MCALayout>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1}}>
            <View style={style.bio}>
              <Text style={{fontSize: 16, fontFamily: 'metropolis_medium',color: colorBlack}}>
                {hasSubmitted ? formData.email : product.name}
              </Text>
              <Text
                style={{fontFamily: 'metropolis_regular', color: colorBlack}}>
                {hasSubmitted
                  ? '₦' + currencify(paymentDetails.data.amount)
                  : formData.email}
              </Text>
            </View>
            {renderLayout()}
          </View>
          <Button
            title={buttonText}
            onPress={handleButtonBehavior}
            color="#3BAA90"
          />
        </View>
      </MCALayout>
      {loading ? (
        <View
          style={{
            zIndex: 2,
            flex: 1,
            height: '100%',
            width: '100%',
            marginTop: '6%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorGreyOverlay,
          }}>
          <ActivityIndicator
            style={{margin: 12, color: '#3BAA90'}}
            animating={true}
          />
          <Text
            style={{
              fontFamily: 'metropolis_medium',
              margin: 12,
              fontSize: 16,
              color: 'white',
            }}>
            {message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  bio: {
    padding: 8,
    marginVertical: 8,
    alignItems: 'flex-end',
    backgroundColor: '#F6FEF9',
    borderRadius: 5,
  },
});

export function PaymentOptionCard(props) {
  let style = StyleSheet.create({
    card: {
      marginVertical: 8,
      flexDirection: 'row',
      paddingVertical: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      borderColor: '#667085',
      borderRadius: 5,
    },
    cardSelected: {
      marginVertical: 8,
      flexDirection: 'row',
      paddingVertical: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      borderColor: '#3BAA90',
      borderRadius: 5,
    },
  });
  const selected = props.selected;
  return (
    <View style={selected ? style.cardSelected : style.card}>
      <Image source={props.imagePath} />
      <View style={{marginHorizontal: 12}}>
        <Text
          style={{
            fontWeight: '600',
            fontFamily: 'metropolis_medium',
            fontSize: 15,
            color: colorBlack,
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 12,
            fontFamily: 'metropolis_regular',
            color: colorBlack,
          }}>
          {props.sub}
        </Text>
      </View>
    </View>
  );
}
