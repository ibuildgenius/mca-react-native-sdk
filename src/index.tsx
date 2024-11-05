// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'react-native-svg';
import InputForm from './screens/IntroScreen';
import StartupScreen from './screens/initialization/StartupScreen';
import WelcomeScreen from './screens/initialization/WelcomeScreen';
import React, { useEffect } from 'react';
import AcceptOfferScreen from './screens/claims/AcceptOfferScreen';
import ClaimFirstFormScreen from './screens/claims/ClaimFirstFormScreen';
import ClaimSubmittedScreen from './screens/claims/ClaimSubmittedScreen';
import ClaimSummaryScreen from './screens/claims/ClaimSummaryScreen';
import ConfirmPolicyInfoScreen from './screens/claims/ConfirmPolicyInfoScreen';
import OfferSettlementScreen from './screens/claims/OfferSettlementScreen';
import RepairEstimateScreen from './screens/claims/RepairEstimateScreen';
import SubmitPoliceReportScreen from './screens/claims/SubmitPoliceReportScreen';
import ThirdPartyClaimFormScreen from './screens/claims/ThirdPartyClaimFormScreen';
import TrackClaimsScreen from './screens/claims/TrackClaimsScreen';
import GadgetClaimFirstFormScreen from './screens/claims/gadget/GadgetClaimFirstFormScreen';
import GadgetClaimSubmittedScreen from './screens/claims/gadget/GadgetClaimSubmittedScreen';
import GadgetClaimSummaryScreen from './screens/claims/gadget/GadgetClaimSummaryScreen';
import TrackGadgetClaimsScreen from './screens/claims/gadget/TrackGadgetClaimsScreen';
import TrackTravelClaimsScreen from './screens/claims/travel/TrackTravelClaimsScreen';
import TravelClaimFirstFormScreen from './screens/claims/travel/TravelClaimFirstFormScreen';
import TravelClaimSubmittedScreen from './screens/claims/travel/TravelClaimSubmittedScreen';
import TravelClaimSummaryScreen from './screens/claims/travel/TravelClaimSummaryScreen';
import TravelDocumentationScreen from './screens/claims/travel/TravelDocumentationScreen';
import GridSdkOptionsScreen from './screens/initialization/GridSdkOptionsScreen';
import ListSdkOptionsScreen from './screens/initialization/ListSdkOptionsScreen';
import SDKErrorScreen from './screens/initialization/SDKErrorScreen';
import CarInspectionPageView from './screens/inspection/CarInspectionPageView';
import InspectionInitScreen from './screens/inspection/InspectionInitScreen';
import InspectionSuccessScreen from './screens/inspection/InspectionSuccessScreen';
import GadgetInspectionPageView from './screens/inspection/gadget/GadgetInspectionPageView';
import GadgetInspectionSummaryScreen from './screens/inspection/gadget/GadgetInspectionSummaryScreen';
import GadgetVerificationScreen from './screens/inspection/gadget/GadgetVerificationScreen';
import VehicleInspectionSummaryScreen from './screens/inspection/vehicle/VehicleInspectionSummaryScreen';
import VehicleVerificationScreen from './screens/inspection/vehicle/VehicleVerificationScreen';
import FirstFormScreen from './screens/purchase/form/FirstFormScreen';
import PurchaseSuccessScreen from './screens/purchase/form/PurchaseSuccessScreen';
import SecondFormScreen from './screens/purchase/form/SecondFormScreen';
import CustomItemPairWidget from './screens/purchase/form/components/CustomItemPair';
import AccountDetailsScreen from './screens/purchase/payment/AccountDetailsScreen';
import PaymentMethodScreen from './screens/purchase/payment/PaymentMethodScreen';
import PaymentProcessingScreen from './screens/purchase/payment/PaymentProcessingScreen';
import PaymentSuccessScreen from './screens/purchase/payment/PaymentSuccessScreen';
import PlanDetailsScreen from './screens/purchase/payment/PlanDetailsScreen';
import { ProductDetailsScreen } from './screens/purchase/product_details/ProductDetailsScreen';
import GridViewProductListScreen from './screens/purchase/product_list/gridview_product_list/GridViewProductListScreen';
import { GridViewProviderListScreen } from './screens/purchase/product_list/gridview_product_list/GridViewProviderListScreen';
import ListViewProductListScreen from './screens/purchase/product_list/listview_product_list/ListViewProductListScreen';
import ListViewProviderListScreen from './screens/purchase/product_list/listview_product_list/ListViewProviderListScreen';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../src/components/CustomToast';
import globalObject from '../src/store/globalObject';
import { PaymentOption, TransactionType } from '../src/utils/enums';
import SetSdkPropScreen from './screens/initialization/SetSdkPropScreen';

// export function multiply(a: number, b: number): Promise<number> {
//   return Promise.resolve(a * b);

// }
type MyCoverAIProps = {
  apikey: string;
  policyId?: string;
  policyNumber?: string;
  referenceNumber?: string;
  email?: string;
  transactionType?: TransactionType;
  paymentOption?: PaymentOption;
};

export default function MyCoverAI({
  apikey,
  policyId,
  policyNumber,
  referenceNumber,
  email,
  transactionType = TransactionType.purchase,
  paymentOption = PaymentOption.gateway,
}: MyCoverAIProps) {
  useEffect(() => {
    globalObject.setPublicKey(apikey);
    globalObject.setPolicyId(policyId ?? null);
    globalObject.setPolicyNumber(policyNumber ?? null);
    globalObject.setEmail(email ?? null);
    globalObject.setInspectionEmail(email ?? null);
    globalObject.setReference(referenceNumber ?? null);
    globalObject.setTransactionType(transactionType);
    globalObject.setPaymentOption(paymentOption);
  }, [
    apikey,
    policyId,
    policyNumber,
    referenceNumber,
    email,
    transactionType,
    paymentOption,
  ]);

  // const Stack = createNativeStackNavigator<RootStackParamList>();
  const Stack = createNativeStackNavigator();
  return (
    // <View style={{ backgroundColor: 'red', flex: 1 }}>
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{ title: '', headerShown: false }}
          //   initialRouteName="InspectionSuccessScreen">
          initialRouteName="SetSdkPropScreen"
        >
          <Stack.Screen name="InputForm" component={InputForm} />
          <Stack.Screen
            name="SetSdkPropScreen"
            component={SetSdkPropScreen}
            initialParams={{
              showLoadingText: true,
              apikey,
              policyId,
              policyNumber,
              referenceNumber,
              email,
              transactionType,
              paymentOption,
            }}
          />
          <Stack.Screen
            name="CustomItemPairWidget"
            component={CustomItemPairWidget}
          />

          <Stack.Screen
            name="StartupScreen"
            component={StartupScreen}
            initialParams={{ showLoadingText: true }}
          />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="GridSdkOptionsScreen"
            component={GridSdkOptionsScreen}
          />
          <Stack.Screen
            name="GridViewProductListScreen"
            component={GridViewProductListScreen}
          />
          <Stack.Screen
            name="GridViewProviderListScreen"
            component={GridViewProviderListScreen} // Add your screen here
          />
          <Stack.Screen
            name="ListViewProviderListScreen"
            component={ListViewProviderListScreen} // Add your screen here
          />

          <Stack.Screen
            name="ListViewProductListScreen"
            component={ListViewProductListScreen}
          />

          <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
          />
          <Stack.Screen
            name="PaymentSuccessScreen"
            component={PaymentSuccessScreen}
          />
          <Stack.Screen name="SecondFormScreen" component={SecondFormScreen} />

          <Stack.Screen name="FirstFormScreen" component={FirstFormScreen} />

          <Stack.Screen
            name="PaymentMethodScreen"
            component={PaymentMethodScreen}
          />

          <Stack.Screen
            name="AccountDetailsScreen"
            component={AccountDetailsScreen}
          />

          <Stack.Screen
            name="PaymentProcessingScreen"
            component={PaymentProcessingScreen}
          />

          <Stack.Screen
            name="PurchaseSuccessScreen"
            component={PurchaseSuccessScreen}
          />

          <Stack.Screen
            name="PlanDetailsScreen"
            component={PlanDetailsScreen}
          />

          <Stack.Screen
            name="InspectionInitScreen"
            component={InspectionInitScreen}
          />

          <Stack.Screen
            name="CarInspectionPageView"
            component={CarInspectionPageView}
          />

          <Stack.Screen
            name="VehicleVerificationScreen"
            component={VehicleVerificationScreen}
          />

          <Stack.Screen
            name="VehicleInspectionSummaryScreen"
            component={VehicleInspectionSummaryScreen}
          />
          <Stack.Screen
            name="GadgetInspectionSummaryScreen"
            component={GadgetInspectionSummaryScreen}
          />

          <Stack.Screen
            name="InspectionSuccessScreen"
            component={InspectionSuccessScreen}
          />

          <Stack.Screen
            name="GadgetVerificationScreen"
            component={GadgetVerificationScreen}
          />

          <Stack.Screen
            name="GadgetInspectionPageView"
            component={GadgetInspectionPageView}
          />

          <Stack.Screen
            name="ListSdkOptionsScreen"
            component={ListSdkOptionsScreen}
          />
          <Stack.Screen
            name="ConfirmPolicyInfoScreen"
            component={ConfirmPolicyInfoScreen}
          />

          <Stack.Screen
            name="ClaimFirstFormScreen"
            component={ClaimFirstFormScreen}
          />

          <Stack.Screen
            name="ClaimSummaryScreen"
            component={ClaimSummaryScreen}
          />

          <Stack.Screen
            name="ClaimSubmittedScreen"
            component={ClaimSubmittedScreen}
          />

          <Stack.Screen
            name="TrackClaimsScreen"
            component={TrackClaimsScreen}
          />
          <Stack.Screen
            name="SubmitPoliceReportScreen"
            component={SubmitPoliceReportScreen}
          />

          <Stack.Screen
            name="RepairEstimateScreen"
            component={RepairEstimateScreen}
          />
          <Stack.Screen
            name="OfferSettlementScreen"
            component={OfferSettlementScreen}
          />

          <Stack.Screen
            name="AcceptOfferScreen"
            component={AcceptOfferScreen}
          />

          <Stack.Screen
            name="ThirdPartyClaimFormScreen"
            component={ThirdPartyClaimFormScreen}
          />

          <Stack.Screen
            name="GadgetClaimFirstFormScreen"
            component={GadgetClaimFirstFormScreen}
          />
          <Stack.Screen
            name="GadgetClaimSummaryScreen"
            component={GadgetClaimSummaryScreen}
          />

          <Stack.Screen
            name="GadgetClaimSubmittedScreen"
            component={GadgetClaimSubmittedScreen}
          />

          <Stack.Screen
            name="TrackGadgetClaimsScreen"
            component={TrackGadgetClaimsScreen}
          />

          <Stack.Screen
            name="TravelClaimFirstFormScreen"
            component={TravelClaimFirstFormScreen}
          />

          <Stack.Screen
            name="TravelClaimSummaryScreen"
            component={TravelClaimSummaryScreen}
          />
          <Stack.Screen
            name="TravelClaimSubmittedScreen"
            component={TravelClaimSubmittedScreen}
          />
          <Stack.Screen
            name="TravelDocumentationScreen"
            component={TravelDocumentationScreen}
          />
          <Stack.Screen
            name="TravelTrackClaimsScreen"
            component={TrackTravelClaimsScreen}
          />

          <Stack.Screen name="SDKErrorScreen" component={SDKErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>

    // <MyCoverAI></MyCoverAI>
  );
}

export { TransactionType, PaymentOption, PaymentMethod } from './utils/enums';

// @ts-nocheck
// import { View } from 'react-native';

// export default function MyCoverAI() {
//   return (
//     <View style={{backgroundColor:'red', flex:1}}>
//     </View>
//     // <MyCoverAI></MyCoverAI>
//   );
// }

// import { Text, View } from 'react-native'

// export default function App() {
//   return (
//     <View style= {{backgroundColor:'red', flex:1}}>
//       <Text>MyCoverAI</Text>
//     </View>
//   );
// }

// registerRootComponent(App);

// const styles = StyleSheet.create({})
