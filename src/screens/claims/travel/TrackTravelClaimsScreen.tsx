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
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CheckRoundIcon from '../../../assets/icons/check_round.svg';
import CloseRoundIcon from '../../../assets/icons/close_round_icon.svg';
import CustomAppBar from '../../../components/CustomAppBar';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
  W500Text,
} from '../../../components/CustomText';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { VerticalSpacer } from '../../../components/Spacer';
import { ConstantString } from '../../../constants/ConstantString';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { ClaimModel } from '../../../models/ClaimModel';
import globalObject from '../../../store/globalObject';
import { getClaimStatusDescription, ClaimStatus } from '../../../utils/enums';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { StringUtils } from '../../../utils/StringUtils';
import { ColorUtils } from '../../../utils/colorUtils';

interface TrackTravelClaimsScreenProps {
  claim: ClaimModel;
}

type TrackTravelClaimsScreenRouteProps = RouteProp<
  RootStackParamList,
  'TrackTravelClaimsScreen'
>;

const TrackTravelClaimsScreen: React.FC<TrackTravelClaimsScreenProps> = () => {
  const route = useRoute<TrackTravelClaimsScreenRouteProps>();
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
              "Your claim payment has been processed. We're pleased to inform you that your travel claim has been successfully paid. Please find the claim details below."
            }
          </Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Image
              source={require('../../../assets/images/claim_paid_img.webp')}
              style={styles.claimImage}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.vehicleInfoContainer}>
          <RegularText
            title="Customer name"
            fontSize={14.5}
            color={CustomColors.backTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={`${updatedClaims.claimOwnerFirstName} ${updatedClaims.claimOwnerLastName}`}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />
          <VerticalSpacer height={12} />
          <RegularText
            title="Policy number"
            fontSize={14.5}
            color={CustomColors.backTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={updatedClaims.policy?.meta['policy_number'].toString() ?? ''}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />
          <View style={styles.container}>
            <Image
              source={require('../../../assets/images/travel_img.webp')}
              style={styles.carImage}
              resizeMode="contain"
            />
          </View>
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

          {updatedClaims.claimStatus?.toLowerCase() ===
          getClaimStatusDescription(ClaimStatus.paid).toLowerCase() ? (
            <View>
              <RegularText
                title={
                  'Your claim is under review. Once approved, you will be notified via email.'
                }
                fontSize={13.5}
                color={CustomColors.blackTextColor}
                lineHeight={20}
              />
              <VerticalSpacer height={4} />
              <SemiBoldText
                title={
                  StringUtils.formatPriceWithComma(
                    updatedClaims.claimAmount ?? ''
                  ) ?? ''
                }
                fontSize={16}
                color={CustomColors.blackColor}
                //   lineHeight={20}
              />
              <VerticalSpacer height={20} />

              <View style={styles.paidContainer}>
                <SemiBoldText
                  title={'Paid to'}
                  fontSize={13}
                  color={CustomColors.purple500Color}
                  //   lineHeight={20}
                />
              </View>

              <VerticalSpacer height={6} />
              <W500Text
                title={`${(
                  updatedClaims.travelClaimMeta.bank_name?.toString() ?? ''
                ).toUpperCase()} | ${(
                  updatedClaims.travelClaimMeta.account_name?.toString() ?? ''
                ).toUpperCase()} | ${
                  updatedClaims.travelClaimMeta.account_number?.toString() ?? ''
                }`}
                fontSize={16}
                color={CustomColors.blackColor}
                //   lineHeight={20}
              />
            </View>
          ) : (
            <RegularText
              title={
                claim.claimStatus?.toLowerCase() ===
                getClaimStatusDescription(ClaimStatus.pending).toLowerCase()
                  ? ConstantString.provideTravelClaimsDocument
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
          )}

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
                } else {
                  globalObject.policyNumber =
                    updatedClaims.travelClaimMeta.policy_number ??
                    globalObject.policyNumber;

                  navigation.navigate('TravelDocumentationScreen', {
                    claim: updatedClaims,
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
                        : 'Provide details'
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
      updatedClaims.travelClaimMeta?.status_time_line ||
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
    <ScrollView
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
      <TouchableOpacity onPress={() => {}}>
        <PoweredByFooter />
        <VerticalSpacer height={20} />
      </TouchableOpacity>
    </ScrollView>
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
  paidContainer: {
    padding: 4,
    backgroundColor: ColorUtils.hexToRgba(
      `${CustomColors.purple500Color}`,
      0.04
    ),
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

    // alignSelf: 'flex-end',
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
  // carImage: {
  //   width: 80,
  //   height: 70,
  //   position: 'absolute',
  //   right: 0,
  //   bottom: 0,
  // },
  carImage: {
    width: 80,
    height: 70,
  },
  carImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
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

export default TrackTravelClaimsScreen;
