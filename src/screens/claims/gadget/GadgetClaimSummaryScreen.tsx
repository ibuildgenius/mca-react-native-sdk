import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomAppBar from '../../../components/CustomAppBar';
import CustomButton from '../../../components/CustomButton';
import { SemiBoldText } from '../../../components/CustomText';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { VerticalSpacer } from '../../../components/Spacer';
import { DynamicColors } from '../../../constants/CustomColors';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { ClaimViewModel } from '../ClaimViewModel';
import InfoRowComponent from '../components/InfoRowComponent';
import type { FileData } from '../../purchase/form/components/CustomImagePicker';
import { CustomDateUtils } from '../../../utils/CustomDateUtils';

interface GadgetClaimSummaryScreenProps {
  incidentType: string;
  incidentDate: string;
  incidentTime: string;

  incidentLocation: string;
  description: string;
  // claimType: string;

  policyNumber: string;
  paymentReceipt: FileData;
}

type GadgetClaimSummaryScreenRouteProps = RouteProp<
  RootStackParamList,
  'GadgetClaimSummaryScreen'
>;

const GadgetClaimSummaryScreen: React.FC<
  GadgetClaimSummaryScreenProps
> = () => {
  const route = useRoute<GadgetClaimSummaryScreenRouteProps>();
  const {
    incidentType,
    incidentDate,
    incidentTime,
    incidentLocation,
    description,
    // claimType,
    policyNumber,
    paymentReceipt,
  } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [isLoading, setIsLoading] = useState(false);
  // const claimVm = useStore(claimStore);

  const claimVm = ClaimViewModel();

  const handleSubmit = async () => {
    // setIsLoading(true);
    // const veh = Vehicl
    setIsLoading(true);
    await claimVm.submitGadgetClaim({
      // policyId: globalObject.policyId ?? '',
      // claimType: claimType,
      description: description,
      incidentDate: incidentDate,
      incidentTime: incidentTime,
      incidentLocation: incidentLocation,
      incidentType: incidentType,
      paymentReceipt: paymentReceipt,
      policyNumber: policyNumber,
    });

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={() => navigation.goBack()}
      />
      <View style={styles.paddingContainer}>
        <SemiBoldText
          title="Confirm the following"
          fontSize={21}
          textAlign="center"
        />

        <VerticalSpacer height={30} />

        <View style={styles.summaryContainer}>
          <SemiBoldText
            title="Claim Summary"
            fontSize={17}
            color={DynamicColors().primaryBrandColor}
          />

          <VerticalSpacer height={20} />

          <InfoRowComponent
            title1="Incident Type"
            subtitle1={incidentType}
            title2="Date"
            subtitle2={CustomDateUtils.convertStringDate(incidentDate)}
          />
          {/* 
          <InfoRowComponent
            title1="Date"
            subtitle1={CustomDateUtils.convertStringDate(incidentDate)}
            // {lossType.map((type, index) => `● ${type}\n`)}
            title2="Location"
            subtitle2={incidentLocation}
          /> */}

          <InfoRowComponent
            title1="Time"
            subtitle1={incidentTime}
            title2="Location"
            subtitle2={incidentLocation}
          />
        </View>

        <VerticalSpacer height={30} />
        <View style={{ flex: 1 }}></View>

        <CustomButton
          title="Submit"
          isLoading={isLoading}
          onPress={handleSubmit}
        />

        <PoweredByFooter />
        <VerticalSpacer height={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paddingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    paddingTop: 25,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
  },
});

export default GadgetClaimSummaryScreen;
