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
  BackHandler,
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
import {
  getClaimStatusDescription,
  ClaimStatus,
  ClaimType,
  getGadgetType,
  ProductCategory,
} from '../../../utils/enums';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { StringUtils } from '../../../utils/StringUtils';
import { ColorUtils } from '../../../utils/colorUtils';

interface TrackGadgetClaimsScreenProps {
  claim: ClaimModel;
}

type TrackGadgetClaimsScreenRouteProps = RouteProp<
  RootStackParamList,
  'TrackGadgetClaimsScreen'
>;

const TrackGadgetClaimsScreen: React.FC<TrackGadgetClaimsScreenProps> = () => {
  const route = useRoute<TrackGadgetClaimsScreenRouteProps>();
  const { claim } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [updatedClaims, setUpdatedClaims] = useState(claim);

  const fetchClaimData = async () => {
    // const newClaims = await claimVM.getClaimsById(claim.policyId);
    // if (newClaims) {
    //   setUpdatedClaims(newClaims);
    // }
  };

  useEffect(() => {
    // Disable back button functionality
    const backAction = () => {
      // Returning true disables the back button
      return true;
    };

    // Add the back button event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Cleanup event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);

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
              "Your claim payment has been processed. We're pleased to inform you that your gadget claim has been successfully paid. Please find the claim details below."
            }
          </Text>
          <Image
            source={require('../../../assets/images/claim_paid_img.webp')}
            style={styles.claimImage}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.vehicleInfoContainer}>
          <RegularText
            title="Gadget details"
            fontSize={14.5}
            color={CustomColors.backTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={`${updatedClaims.policy?.meta.payload.device_make} ${updatedClaims.policy?.meta.payload.device_model}`}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />
          <VerticalSpacer height={12} />
          <RegularText
            title="Serial number"
            fontSize={14.5}
            color={CustomColors.backTextColor}
          />
          <VerticalSpacer height={5} />
          <SemiBoldText
            title={updatedClaims.policy?.meta.payload.device_serial_number}
            fontSize={15.5}
            color={DynamicColors().primaryBrandColor}
          />

          <Image
            source={require('../../../assets/images/gadget_img.webp')}
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
                  updatedClaims.gadgetClaimMeta.bank_name?.toString() ?? ''
                ).toUpperCase()} | ${(
                  updatedClaims.gadgetClaimMeta.account_name?.toString() ?? ''
                ).toUpperCase()} | ${
                  updatedClaims.gadgetClaimMeta.account_number?.toString() ?? ''
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
                  ? claim.policy?.product?.routeName
                      ?.toLowerCase()
                      .includes('third-party')
                    ? ConstantString.uploadDocument
                    : updatedClaims.gadgetClaimMeta.incident_type
                          .toString()
                          .toLowerCase() == 'theft' ||
                        updatedClaims.gadgetClaimMeta.incident_type
                          .toString()
                          .toLowerCase() == 'burglary'
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
                } else if (
                  claim.policy?.product?.routeName
                    ?.toLowerCase()
                    .includes('third-party')
                ) {
                  navigation.navigate('UploadThirdPartyDocumentScreen', {
                    claim,
                  });
                } else if (
                  updatedClaims.gadgetClaimMeta.incident_type
                    .toString()
                    .toLowerCase() == 'theft' ||
                  updatedClaims.gadgetClaimMeta.incident_type
                    .toString()
                    .toLowerCase() == 'burglary'
                ) {
                  const claimType = ClaimType.gadget;
                  navigation.navigate('SubmitPoliceReportScreen', {
                    claim,
                    claimType,
                  });
                } else {
                  globalObject.gadgetType = getGadgetType(
                    updatedClaims.policy?.meta.payload.device_type
                      .toString()
                      .toLowerCase() ?? ''
                  );
                  globalObject.policyNumber =
                    updatedClaims.gadgetClaimMeta.policy_number ??
                    globalObject.policyNumber;

                  navigation.navigate('InspectionInitScreen', {
                    // claim: updatedClaims,
                    productCategory: ProductCategory.gadget,
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
                          : updatedClaims.gadgetClaimMeta.incident_type
                                .toString()
                                .toLowerCase() == 'theft' ||
                              updatedClaims.gadgetClaimMeta.incident_type
                                .toString()
                                .toLowerCase() == 'burglary'
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
      <TouchableOpacity onPress={() => {}}>
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

export default TrackGadgetClaimsScreen;
