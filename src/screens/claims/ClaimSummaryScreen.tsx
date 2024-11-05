import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VerticalSpacer } from '../../components/Spacer';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClaimViewModel } from './ClaimViewModel';
import { type LoadStore, useLoadStore } from '../../store/loadStore';
import globalObject from '../../store/globalObject';
import InfoRowComponent from './components/InfoRowComponent';
import { SemiBoldText } from '../../components/CustomText';
import { DynamicColors } from '../../constants/CustomColors';
import CustomAppBar from '../../components/CustomAppBar';

interface ClaimSummaryScreenProps {
  incidentType: string;
  incidentDate: string;
  incidentTime: string;
  lossType: string[];
  incidentLocation: string;
  isThirdParty: boolean;
  description: string;
  thirdPartyLossType: string[];
  thirdPartyPhoneNumber: string;
  claimType: string;
}

type ClaimSummaryScreenRouteProps = RouteProp<
  RootStackParamList,
  'ClaimSummaryScreen'
>;

const ClaimSummaryScreen: React.FC<ClaimSummaryScreenProps> = () => {
  const route = useRoute<ClaimSummaryScreenRouteProps>();
  const {
    incidentType,
    incidentDate,
    incidentTime,
    lossType,
    incidentLocation,
    isThirdParty,
    description,
    claimType,
  } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  // const [isLoading, setIsLoading] = useState(false);
  // const claimVm = useStore(claimStore);
  const loadingState = useLoadStore((state: LoadStore) => state);

  const claimVm = ClaimViewModel();

  const handleSubmit = async () => {
    // setIsLoading(true);
    // const veh = Vehicl
    await claimVm.submitVehicleClaim(
      {
        policyId: globalObject.policyId ?? '',
        claimType: claimType,
        description: description,
        incidentDate: incidentDate,
        incidentTime: incidentTime,
        incidentLocation: incidentLocation,
        incidentType: incidentType,
        isThirdParty: isThirdParty,
        lossType: lossType,
      },

      loadingState
    );

    // setIsLoading(false);
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
            subtitle2={incidentDate}
          />

          <InfoRowComponent
            title1="Damage Type"
            subtitle1={lossType
              .map(
                (type, index) =>
                  `● ${type}${index !== lossType.length - 1 ? '\n' : ''}`
              )
              .join('')}
            // {lossType.map((type, index) => `● ${type}\n`)}
            title2="Location"
            subtitle2={incidentLocation}
          />

          <InfoRowComponent
            title1="Time"
            subtitle1={incidentTime}
            title2="3rd-party Involvement"
            subtitle2={isThirdParty ? 'Yes' : 'No'}
          />
        </View>

        <VerticalSpacer height={30} />
        <View style={{ flex: 1 }}></View>

        <CustomButton
          title="Submit"
          isLoading={loadingState.claimVmLoading}
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

export default ClaimSummaryScreen;
