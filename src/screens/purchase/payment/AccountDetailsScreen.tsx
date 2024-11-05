import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  Pusher,
  type PusherAuthorizerResult,
  PusherChannel,
  PusherMember,
} from '@pusher/pusher-websocket-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomButton from '../../../components/CustomButton';
import PoweredByFooter from '../../../components/PoweredByFooter';
import PaymentDetailsContainer from '../../../components/PaymentDetailsContainer';
import { PaymentViewModel } from './PaymentViewModel';
import { customTextStyles, SemiBoldText } from '../../../components/CustomText';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { type LoadStore, useLoadStore } from '../../../store/loadStore';
import { PurchaseinitializationModel } from '../../../models/PurchaseinitializationModel';
import { PaymentMethod, ToastStatus } from '../../../utils/enums';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { type FormStore, useFormStore } from '../../../store/formStore';
import CustomAppBar from '../../../components/CustomAppBar';
import { StringUtils } from '../../../utils/StringUtils';
import { VerticalSpacer } from '../../../components/Spacer';
import CopyIcon from '../../../assets/icons/copy_icon.svg';
import { showToast } from '../../../components/CustomToast';

interface AccountDetailsScreenProps {
  purchaseDetails: PurchaseinitializationModel; // Replace 'any' with the correct type of PurchaseinitializationModel
  paymentMethod: PaymentMethod; // Replace 'string' with a more specific type if available
}

type AccountDetailsScreenRouteProps = RouteProp<
  RootStackParamList,
  'AccountDetailsScreen'
>;

const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = () => {
  const paymentVM = PaymentViewModel();
  const route = useRoute<AccountDetailsScreenRouteProps>();
  const { purchaseDetails, paymentMethod } = route.params;
  const [displayText, setDisplayText] = useState(
    paymentMethod === PaymentMethod.transfer ? 'Copy details' : 'Copy USSD code'
  );
  const navigation = useNavigation();

  const loadingState = useLoadStore((state: LoadStore) => state);
  const globalForm = useFormStore((state: FormStore) => state);
  const pusher = Pusher.getInstance();

  const channelName = `cache-${purchaseDetails.reference}`;

  // const pusher = Pusher.getInstance();

  // const [apiKey, onChangeApiKey] = React.useState('');
  // const [cluster, onChangeCluster] = React.useState('');
  // const [channelName, onChangeChannelName] = React.useState('');

  const [_members, onChangeMembers] = React.useState<PusherMember[]>([]);

  const handleCopyPrice = async () => {
    Clipboard.setString(globalForm.productPrice.toString());

    // Toast.show({
    //   type: 'success',
    //   text1: 'Price copied!',
    //   text2: 'Price successfully copied to clipboard.',
    // });
    showToast(ToastStatus.success, 'Price successfully copied to clipboard.');

    // showToastMessage('Pending! Please wait.', ToastStatus.pending);
  };

  ///HERE

  // const log = async (line: string) => {
  //   logLines.push(line);
  //   setLog(logLines.join('\n'));
  // };
  // useEffect(() => {
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   log(`cache-${purchaseDetails.reference}`);
  //   connect();
  // }, []);

  // useEffect(() => {
  //   console.log('Page loaded');

  //   // You can run any initialization code here, such as fetching data
  //   connect();

  //   // Optional cleanup function (runs when the component unmounts)
  //   return () => {
  //     console.log('Page is unmounting');
  //   };
  // }, []); // The empty array ensures this runs only when the component is first loaded

  ////

  // useEffect(() => {
  //   log.error(`cache-${purchaseDetails.reference}`);
  //   log.info(`cache-${purchaseDetails.reference}`);
  //   pusher.subscribe({
  //     channelName: channelName,
  //     onEvent: (event: PusherEvent) => {
  //       console.log(`onEvent: ${event}`);

  //       paymentVM.verifyPayment(
  //         purchaseDetails.reference ?? '',
  //         paymentMethod,
  //         purchaseDetails,
  //       );

  //       pusher.unsubscribe({channelName: channelName});
  //     },
  //   });
  // }, [pusher, channelName]);

  ///////HEREEE

  const apiKey = 'e1c1f089656c77fe14b2';
  const cluster = 'us2';

  const connect = async () => {
    try {
      await pusher.init({
        apiKey,
        cluster,
        // authEndpoint
        // ============
        // You can let the pusher library call an endpoint URL,
        // Please look here to implement a server side authorizer:
        // https://pusher.com/docs/channels/server_api/authenticating-users/
        //
        // authEndpoint: '<Add your Auth Endpoint URL here>',
        //
        // onAuthorizer
        // ============
        // Or you can implement your own authorizer callback.
        // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/
        // for the format of this object, you need your key and secret from your Pusher
        // Account.
        onAuthorizer,
        onConnectionStateChange,
        onError,
        onEvent,
        onSubscriptionSucceeded,
        onSubscriptionError,
        onSubscriptionCount,
        onDecryptionFailure,
        onMemberAdded,
        onMemberRemoved,
      });

      await pusher.connect();

      await pusher.subscribe({ channelName });
    } catch (e) {
      console.log(e);
      console.log('ERROR: ' + e);
    }
  };

  useEffect(() => {
    console.log('Page loaded');

    // You can run any initialization code here, such as fetching data
    connect();

    // Optional cleanup function (runs when the component unmounts)
    return () => {
      console.log('Page is unmounting');
    };
  }, []);

  const onConnectionStateChange = (
    currentState: string,
    previousState: string
  ) => {
    console.log(
      `onConnectionStateChange. previousState=${previousState} newState=${currentState}`
    );
  };

  const onError = (message: string, code: Number, error: any) => {
    console.log(`onError: ${message} code: ${code} exception: ${error}`);
  };

  const onEvent = async (event: any) => {
    console.log(`onEvent: ${event}`);

    if (event.eventName == 'transaction_successful') {
      handlePaymentVerification();
      await pusher.disconnect();
    }
  };

  const onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
    );
    const channel: PusherChannel | undefined = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    const me = channel.me;
    onChangeMembers([...channel.members.values()]);
    console.log(`Me: ${me}`);
  };

  const onSubscriptionCount = (
    channelName: string,
    subscriptionCount: Number
  ) => {
    console.log(
      `onSubscriptionCount: ${subscriptionCount}, channelName: ${channelName}`
    );
  };

  const onSubscriptionError = (
    channelName: string,
    message: string,
    e: any
  ) => {
    console.log(
      `onSubscriptionError: ${message}, channelName: ${channelName} e: ${e}`
    );
  };

  const onDecryptionFailure = (eventName: string, reason: string) => {
    console.log(`onDecryptionFailure: ${eventName} reason: ${reason}`);
  };

  const onMemberAdded = (channelName: string, member: PusherMember) => {
    console.log(`onMemberAdded: ${channelName} user: ${member}`);
    const channel: PusherChannel | undefined = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    onChangeMembers([...channel.members.values()]);
  };

  const onMemberRemoved = (channelName: string, member: PusherMember) => {
    console.log(`onMemberRemoved: ${channelName} user: ${member}`);
    const channel: PusherChannel | undefined = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    onChangeMembers([...channel.members.values()]);
  };

  // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/ for the format of this object.
  const onAuthorizer = async (channelName: string, socketId: string) => {
    console.log(
      `calling onAuthorizer. channelName=${channelName}, socketId=${socketId}`
    );

    const response = await fetch('some_url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socket_id: socketId,
        channel_name: channelName,
      }),
    });

    const body = (await response.json()) as PusherAuthorizerResult;

    console.log(`response: ${JSON.stringify(body)}`);
    return body;
  };

  // const trigger = async () => {
  //   try {
  //     await pusher.trigger(
  //       new PusherEvent({ channelName, eventName, data: eventData })
  //     );
  //   } catch (e) {
  //     console.log('ERROR: ' + e);
  //   }
  // };

  const handleCopyDetails = async () => {
    const textToCopy =
      paymentMethod === 'transfer'
        ? purchaseDetails.accountNumber || ''
        : purchaseDetails.paymentCode || '';
    await Clipboard.setString(textToCopy);
    setDisplayText(
      paymentMethod === 'transfer'
        ? 'Account number copied to clipboard'
        : 'USSD code copied to clipboard'
    );
    setTimeout(() => {
      setDisplayText(
        paymentMethod === 'transfer' ? 'Copy details' : 'Copy USSD code'
      );
    }, 2000);
  };

  const handlePaymentVerification = () => {
    paymentVM.verifyPayment(
      purchaseDetails.reference ?? '',
      paymentMethod,
      purchaseDetails,
      loadingState
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <CustomAppBar onBackTap={() => navigation.goBack()} />
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
        <PaymentDetailsContainer />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.paymentContainer,
            { backgroundColor: DynamicColors().lightPrimaryColor },
          ]}
        >
          <TouchableOpacity onPress={handleCopyPrice}>
            <Text
              style={[
                customTextStyles.regular,
                { color: CustomColors.blackTextColor, fontSize: 15 },
              ]}
            >
              Transfer{'  '}
              <Text
                style={[
                  customTextStyles.semiBold,
                  { color: DynamicColors().primaryBrandColor, fontSize: 19 },
                ]}
              >
                NGN{' '}
                {StringUtils.formatPriceWithComma(
                  `${purchaseDetails.amount ?? ''}`
                ) ?? ''}
                {/* {purchaseDetails.amount ??
                ''.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
              </Text>
              {'  '}
              <CopyIcon
                width={15}
                height={15}
                color={DynamicColors().primaryBrandColor}
              />
              {'  '}
              to
            </Text>
          </TouchableOpacity>
          <VerticalSpacer height={30} />

          <SemiBoldText
            title={
              paymentMethod === 'transfer'
                ? (purchaseDetails.bank ?? '')
                : globalForm.selectedBank?.bankName || ''
            }
            fontSize={23}
            textAlign="center"
          />
          <VerticalSpacer height={10} />
          <SemiBoldText
            title={
              paymentMethod === 'transfer'
                ? (purchaseDetails.accountNumber ?? '')
                : (purchaseDetails.paymentCode ?? '')
            }
            fontSize={23}
            color={
              paymentMethod === 'transfer'
                ? CustomColors.blackTextColor
                : DynamicColors().primaryBrandColor
            }
            textAlign="center"
          />
          <VerticalSpacer height={30} />
          <TouchableOpacity
            style={[
              styles.copyButton,
              { backgroundColor: DynamicColors().lightPrimaryColor },
            ]}
            onPress={handleCopyDetails}
          >
            <SemiBoldText
              title={displayText}
              fontSize={14}
              color={DynamicColors().primaryBrandColor}
              textAlign="center"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonArea}>
        <SemiBoldText
          title="Click the button after making payment"
          fontSize={14}
          textAlign="center"
          color={CustomColors.greyTextColor}
        />
        <VerticalSpacer height={10} />
        <CustomButton
          title="I have sent the money"
          isLoading={loadingState.paymentVmLoading}
          onPress={handlePaymentVerification}
        />
        <PoweredByFooter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    color: DynamicColors().primaryBrandColor,
  },
  content: {
    flex: 1, // Ensures the container takes the full height of the screen or parent container
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center',
    // width: '100%',
    paddingHorizontal: 20,
  },
  paymentContainer: {
    padding: 5,
    backgroundColor: DynamicColors().lightPrimaryColor,
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: 40,
    alignItems: 'center',
    width: '100%',
  },
  transferText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 18,
    color: DynamicColors().primaryBrandColor,
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  copyButton: {
    backgroundColor: DynamicColors().lightPrimaryColor,
    padding: 5,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default AccountDetailsScreen;
