import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import CustomAppBar from '../../../components/CustomAppBar';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { VerticalSpacer } from '../../../components/Spacer';
import { SemiBoldText, RegularText } from '../../../components/CustomText';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { ClaimModel } from '../../../models/ClaimModel';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import MedicalExpenseDocumentScreen from './components/MedicalExpenseDocumentScreen';
import TravelDocumentBaggageDelayScreen from './components/TravelDocumentBaggageDelayScreen';
import TravelDocumentBaggageLossScreen from './components/TravelDocumentBaggageLossScreen';
import TravelDocumentFlightDelayScreen from './components/TravelDocumentFlightDelayScreen';
import TravelDocumentLegalExpenseScreen from './components/TravelDocumentLegalExpenseScreen';
import TravelDocumentLossScreen from './components/TravelDocumentLossScreen';
import TravelDocumentMissedDepartureScreen from './components/TravelDocumentMissedDepartureScreen';
import TravelDocumentPersonalMoneyLossScreen from './components/TravelDocumentPersonalMoneyLossScreen';

type TravelDocumentationScreenRouteProps = RouteProp<
  RootStackParamList,
  'TravelDocumentationScreen'
>;

interface TravelDocumentationScreenProps {
  claim: ClaimModel;
}

const TravelDocumentationScreen: React.FC<
  TravelDocumentationScreenProps
> = () => {
  const route = useRoute<TravelDocumentationScreenRouteProps>();
  const { claim } = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { control } = useForm();

  const renderDocumentScreen = () => {
    switch (claim.travelClaimMeta['incident_type'].toLowerCase()) {
      case 'medical expenses':
        return <MedicalExpenseDocumentScreen formKey={control} />;
      case 'loss of travel document':
        return <TravelDocumentLossScreen formKey={control} />;
      case 'baggage loss':
        return <TravelDocumentBaggageLossScreen formKey={control} />;
      case 'baggage delay':
        return <TravelDocumentBaggageDelayScreen formKey={control} />;
      case 'personal money loss':
        return <TravelDocumentPersonalMoneyLossScreen formKey={control} />;
      case 'missed departure or connection':
        return <TravelDocumentMissedDepartureScreen formKey={control} />;
      case 'travel delay':
        return <TravelDocumentFlightDelayScreen formKey={control} />;
      case 'legal expenses and bail bond':
        return <TravelDocumentLegalExpenseScreen formKey={control} />;
      default:
        return <MedicalExpenseDocumentScreen formKey={control} />;
    }
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.paddingContainer}>
          <SemiBoldText
            title="Incident Details"
            fontSize={20}
            textAlign="center"
          />
          <VerticalSpacer height={20} />

          <View style={styles.infoContainer}>
            <View style={styles.infoTextContainer}>
              <RegularText
                title="Customer name"
                fontSize={13}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={2} />
              <SemiBoldText
                title={`${claim.claimOwnerFirstName} ${claim.claimOwnerLastName}`}
                fontSize={14}
                color={DynamicColors().primaryBrandColor}
              />
              <VerticalSpacer height={13} />
              <RegularText
                title="Policy number"
                fontSize={13}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={2} />
              <SemiBoldText
                title={claim.travelClaimMeta['policy_number'] ?? ''}
                fontSize={14}
                color={DynamicColors().primaryBrandColor}
              />
            </View>
            <Image
              source={require('../../../assets/images/travel_img.webp')}
              style={styles.travelImage}
            />
          </View>

          <VerticalSpacer height={30} />
          {/* <View style={{backgroundColor: CustomColors.redColor}}> */}
          {renderDocumentScreen()}
          {/* </View> */}

          {/* <VerticalSpacer height={25} /> */}

          <PoweredByFooter />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  paddingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoContainer: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 8,
    position: 'relative',
  },
  infoTextContainer: {
    flex: 1,
  },
  travelImage: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
  },
});

export default TravelDocumentationScreen;
