// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import Dash from 'react-native-dash-2';
import CustomAppBar from '../../components/CustomAppBar';
import PoweredByFooter from '../../components/PoweredByFooter';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ClaimModel } from '../../models/ClaimModel';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ClaimStatus,
  ClaimType,
  getClaimStatusDescription,
} from '../../utils/enums';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../components/CustomText';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { VerticalSpacer } from '../../components/Spacer';
import CheckRoundIcon from '../../assets/icons/check_round.svg';
import CloseRoundIcon from '../../assets/icons/close_round_icon.svg';
import { ConstantString } from '../../constants/ConstantString';
import globalObject from '../../store/globalObject';

interface TrackClaimsScreenProps {
  claim: ClaimModel;
}

type TrackClaimsScreenRouteProps = RouteProp<
  RootStackParamList,
  'TrackClaimsScreen'
>;

const TrackClaimsScreen: React.FC<TrackClaimsScreenProps> = () => {
  const route = useRoute<TrackClaimsScreenRouteProps>();
  const { claim } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [updatedClaims, setUpdatedClaims] = useState(claim);
  // const claimVM = ClaimViewModel();

  const fetchClaimData = async () => {
    // const newClaims = await claimVM.getClaimsById(claim.policyId);
    // if (newClaims) {
    //   setUpdatedClaims(newClaims);
    // }
  };

  useEffect(() => {
    setUpdatedClaims(claim); // Set initial claim data
  }, [claim]);

  const renderClaimStatus = () => {
    // const status = claim.claimStatus.toLowerCase();

    if (
      claim.claimStatus?.toLowerCase() ==
      getClaimStatusDescription(ClaimStatus.paid).toLowerCase()
    ) {
      return (
        <View style={styles.claimContainer}>
          <Text style={[customTextStyles.regular, styles.congratulationsText]}>
            <Text
              style={[customTextStyles.semiBold, styles.congratulationsText]}
            >
              {'Congratulations! '}
            </Text>
            {
              "Your claim payment has been processed. We're pleased to inform you that your vehicle claim has been successfully paid. Please find the claim details below."
            }
          </Text>
          <VerticalSpacer height={10} />
          <Image
            source={require('../../assets/images/claim_paid_img.webp')}
            style={styles.claimImage}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.vehicleInfoContainer}>
          <RegularText
            title="Vehicle name"
            fontSize={14.5}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={`${updatedClaims.policy?.meta.vehicle_make} ${updatedClaims.policy?.meta.vehicle_model} ${updatedClaims.policy?.meta.year_of_manufacture}`}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />
          <VerticalSpacer height={12} />
          <RegularText
            title="Plate number"
            fontSize={14.5}
            color={CustomColors.greyTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={updatedClaims.policy?.meta.registration_number}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />

          <Image
            source={require('../../assets/images/car_image.webp')}
            style={styles.carImage}
          />
        </View>
      );
    }
  };

  const renderClaimDetails = () => {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.claimContainer}>
          {claim.claimStatus?.toLowerCase() ===
          getClaimStatusDescription(ClaimStatus.declined).toLowerCase() ? (
            <SemiBoldText
              title="Claim Declined"
              color={CustomColors.redColor}
            />
          ) : claim.claimStatus?.toLowerCase() ===
            getClaimStatusDescription(ClaimStatus.settled).toLowerCase() ? (
            <SemiBoldText title="Claim Paid" color={CustomColors.greenColor} />
          ) : null}

          <RegularText
            title={
              claim.claimStatus?.toLowerCase() ===
              getClaimStatusDescription(ClaimStatus.pending).toLowerCase()
                ? claim.policy?.product?.routeName
                    ?.toLowerCase()
                    .includes('third-party')
                  ? ConstantString.uploadDocument
                  : claim.vehicleClaimMeta.incident_type?.toLowerCase() ===
                      'theft'
                    ? ConstantString.uploadPoliceReportClaim
                    : ConstantString.conductInspectionClaim
                : claim.claimStatus?.toLowerCase() ===
                    getClaimStatusDescription(
                      ClaimStatus.approved
                    ).toLowerCase()
                  ? ConstantString.estimateClaimRepairs
                  : claim.claimStatus?.toLowerCase() ===
                      getClaimStatusDescription(
                        ClaimStatus.offerSent
                      ).toLowerCase()
                    ? ConstantString.respondToOffer
                    : claim.claimStatus?.toLowerCase() ===
                        getClaimStatusDescription(
                          ClaimStatus.declined
                        ).toLowerCase()
                      ? ConstantString.inspectionDeclinedText
                      : claim.claimStatus?.toLowerCase() ===
                          getClaimStatusDescription(
                            ClaimStatus.offerAccepted
                          ).toLowerCase()
                        ? ConstantString.offerAcceptanceText
                        : 'Your claim is under review. Once approved, you will be notified via email.'
            }
            fontSize={13.5}
            color={CustomColors.blackTextColor}
            lineHeight={20}
          />

          {['pending', 'approved', 'offer sent', 'declined'].includes(
            claim.claimStatus?.toLowerCase() || ''
          ) && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                globalObject.policyId =
                  updatedClaims.policyId ?? globalObject.policyId;
                globalObject.claimId = updatedClaims.id ?? '';
                globalObject.claim = updatedClaims;

                // Implement navigation to appropriate screen based on claim status
                if (
                  claim.claimStatus?.toLowerCase() ===
                  getClaimStatusDescription(ClaimStatus.approved).toLowerCase()
                ) {
                  navigation.navigate('RepairEstimateScreen', { claim });
                } else if (
                  claim.claimStatus?.toLowerCase() ===
                  getClaimStatusDescription(ClaimStatus.offerSent).toLowerCase()
                ) {
                  navigation.navigate('OfferSettlementScreen', { claim });
                } else if (
                  claim.policy?.product?.routeName
                    ?.toLowerCase()
                    .includes('third-party')
                ) {
                  navigation.navigate('UploadThirdPartyDocumentScreen', {
                    claim,
                  });
                } else if (
                  claim.vehicleClaimMeta.incident_type?.toLowerCase() ===
                  'theft'
                ) {
                  const claimType = ClaimType.auto;
                  navigation.navigate('SubmitPoliceReportScreen', {
                    claim,
                    claimType,
                  });
                } else {
                  const productCategory = null;
                  navigation.navigate('InspectionInitScreen', {
                    // claim,
                    productCategory,
                  });
                }
              }}
            >
              <RegularText
                title={
                  claim.claimStatus?.toLowerCase() ===
                  getClaimStatusDescription(ClaimStatus.approved).toLowerCase()
                    ? 'Estimate repair'
                    : claim.claimStatus?.toLowerCase() ===
                        getClaimStatusDescription(
                          ClaimStatus.offerSent
                        ).toLowerCase()
                      ? 'Respond to offer'
                      : claim.claimStatus?.toLowerCase() ===
                          getClaimStatusDescription(
                            ClaimStatus.declined
                          ).toLowerCase()
                        ? 'Re-lodge Claim'
                        : claim.policy?.product?.routeName
                              ?.toLowerCase()
                              .includes('third-party')
                          ? 'Upload Document'
                          : claim.vehicleClaimMeta.incident_type?.toLowerCase() ===
                              'theft'
                            ? 'Upload police report'
                            : 'Conduct Inspection'
                }
                fontSize={14}
                color={CustomColors.whiteColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderTimeline = () => {
    const statusTimeline =
      updatedClaims.gadgetClaimMeta?.status_time_line ||
      updatedClaims.vehicleClaimMeta?.status_time_line ||
      [];

    return (
      <FlatList
        data={statusTimeline}
        renderItem={({ item, index }) => (
          <View>
            {index !== 0 && (
              <View style={styles.dashContainer}>
                <Dash
                  // direction="vertical"
                  // length={40}
                  style={{
                    width: 1,
                    height: 50,
                    flexDirection: 'column',
                    paddingLeft: 10,
                  }}
                  dashLength={4}
                  dashThickness={2}
                  dashGap={2}
                  dashColor={DynamicColors().primaryBrandColor}
                />
              </View>
            )}
            {/* <View style={{height: 200}}></View> */}
            <View style={styles.timelineRow}>
              {/* <Icon
                name={
                  ['Offer rejected', 'Declined'].includes(item.name)
                    ? 'cancel'
                    : 'check_circle'
                }
                size={22}
                color={
                  ['Offer rejected', 'Declined'].includes(item.name)
                    ? CustomColors.redColor
                    : DynamicColors().primaryBrandColor
                }
              /> */}
              {['Offer rejected', 'Declined'].includes(item.name) ? (
                <CloseRoundIcon
                  width={22}
                  height={22}
                  fill={CustomColors.redColor}
                />
              ) : (
                <CheckRoundIcon
                  width={22}
                  height={22}
                  fill={DynamicColors().primaryBrandColor}
                />
              )}
              <View style={styles.timelineTextContainer}>
                <RegularText title={item.name} fontSize={13.5} />
                <VerticalSpacer height={5} />
                <RegularText title={item.time_stamp} fontSize={12} />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={styles.timelineList}
      />
    );
  };

  return (
    <View
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={fetchClaimData} />
      }
    >
      <CustomAppBar
        showBackButton={false}
        showLogo={false}
        onBackTap={navigation.goBack}

        ///SHowExitDIalog
      />
      <VerticalSpacer height={25} />
      <SemiBoldText title="Track Claim" fontSize={21.5} textAlign="center" />
      <VerticalSpacer height={10} />

      {
        // claim.claimStatus?.toLowerCase() ==
        // getClaimStatusDescription(ClaimStatus.paid).toLowerCase()
        //   ? renderClaimStatus()
        //   :
        renderClaimStatus()
      }
      {renderClaimDetails()}

      <ScrollView>
        {/* <VerticalSpacer height={30} /> */}
        {renderTimeline()}

        <VerticalSpacer height={5} />
      </ScrollView>

      {/* <View style={{flex: 1}}></View> */}

      {/* More claim details here... */}
      <TouchableOpacity
        onPress={() => {
          console.log(claim.claimStatus?.toLowerCase());
          // console.log(claim.vehicleClaimMeta);
          // console.log(claim.claimStatus);
          // console.log(
          //   getClaimStatusDescription(ClaimStatus.pending).toLowerCase(),
          // );
        }}
      >
        <PoweredByFooter />
        <VerticalSpacer height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  detailsContainer: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  claimContainer: {
    padding: 20,

    backgroundColor: CustomColors.lightOrangeColor,
    borderWidth: 0.4,
    borderColor: CustomColors.orangeColor,
    // borderRadius: 10,
    margin: 20,
  },
  congratulationsText: {
    fontSize: 14,
    color: CustomColors.backTextColor,
  },
  claimImage: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end' as const,
  },
  vehicleInfoContainer: {
    padding: 20,
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 10,
    margin: 20,
    marginBottom: 0,
  },
  vehicleInfoTitle: {
    fontSize: 13,
    color: '#999',
  },
  vehicleInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  carImage: {
    width: 80,
    height: 70,
    position: 'absolute' as const,
    right: 0,
    bottom: 0,
    resizeMode: 'contain' as const,
  },
  button: {
    backgroundColor: DynamicColors().primaryBrandColor,
    borderRadius: 22,
    height: 44,
    alignSelf: 'flex-start' as const,
    paddingHorizontal: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 14,

    color: CustomColors.whiteColor,
  },
  dashContainer: {
    paddingHorizontal: 10,
  },
  timelineRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 10,
  },
  timelineTextContainer: {
    marginLeft: 10,
  },
  timelineList: {
    paddingHorizontal: 30,
  },
};

export default TrackClaimsScreen;
