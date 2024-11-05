import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import CustomAppBar from '../../components/CustomAppBar';
import PoweredByFooter from '../../components/PoweredByFooter';
import CustomButton from '../../components/CustomButton';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import ExpandableContainer from '../../components/ExpandableContainer';
import { CustomDateUtils } from '../../utils/CustomDateUtils';
import globalObject from '../../store/globalObject';
import { StringUtils } from '../../utils/StringUtils';
import type { RootStackParamList } from '../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VerticalSpacer } from '../../components/Spacer';
import { RegularText, SemiBoldText } from '../../components/CustomText';
import InfoRowComponent from './components/InfoRowComponent';
import { ClaimViewModel } from './ClaimViewModel';
import { type ClaimStore, useClaimStore } from '../../store/claimStore';
import { getGadgetType } from '../../utils/enums';

interface ConfirmPolicyInfoScreenProps {
  policy: PolicyModel;
  productDetails: ProductDetailsModel;
}

type ConfirmPolicyInfoScreenRouteProps = RouteProp<
  RootStackParamList,
  'ConfirmPolicyInfoScreen'
>;

const ConfirmPolicyInfoScreen: React.FC<ConfirmPolicyInfoScreenProps> = () => {
  const route = useRoute<ConfirmPolicyInfoScreenRouteProps>();
  const { policy, productDetails } = route.params;

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  useForm();
  const claimVM = ClaimViewModel();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  const [isPolicyHolderExpanded, setIsPolicyHolderExpanded] = useState(true);
  const [isTransactionDetailsExpanded, setIsTransactionDetailsExpanded] =
    useState(false);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] =
    useState(false);
  const parentScrollRef = useRef<ScrollView>(null); // Define the ref for the parent ScrollView

  const collapseOthers = () => {
    setIsPolicyHolderExpanded(false);
    setIsTransactionDetailsExpanded(false);
    setIsProductDetailsExpanded(false);
  };

  useEffect(() => {
    // Equivalent to useEffect or componentDidMount
    // Fetch all incident types on component mount
    getAllIncidentTypes();
  }, []);

  const getAllIncidentTypes = async () => {
    await claimVM.getAllIncidentTypes(productDetails, claimStore);
    // Your async call to get incident types
  };

  const handleContinue = () => {
    const productCategory = (
      productDetails.productCategory?.name ?? ''
    ).toLowerCase();

    if (productCategory === 'travel') {
      navigation.navigate('TravelClaimFirstFormScreen', { policy });
    } else if (productCategory === 'gadget') {
      globalObject.gadgetType = getGadgetType(
        (policy.meta['payload']['device_type'] ?? '').toLowerCase()
      );
      navigation.navigate('GadgetClaimFirstFormScreen', { policy: policy });
    } else if (
      (policy.product?.routeName ?? '').toLowerCase().includes('comprehensive')
    ) {
      // policy.meta['vehicle_make']
      navigation.navigate('ClaimFirstFormScreen', { policy: policy });
    } else {
      //ThirdPartyClaimForm

      navigation.navigate('ThirdPartyClaimFormScreen', { policy: policy });
    }
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={true}
        showLogo={false}
        onBackTap={() => navigation.goBack()}
      />

      <VerticalSpacer height={15} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        ref={parentScrollRef}
      >
        <SemiBoldText
          title="Confirm policy info"
          fontSize={21}
          textAlign="center"
        />
        <VerticalSpacer height={25} />

        <ExpandableContainer
          title="Policy Holder info."
          subTitle=""
          titleColor={DynamicColors().primaryBrandColor}
          isExpanded={isPolicyHolderExpanded}
          setIsExpanded={setIsPolicyHolderExpanded}
          collapseOthers={collapseOthers}
        >
          <View style={[styles.infoRow, { paddingTop: 10 }]}>
            <View style={styles.infoColumn}>
              <RegularText
                title="Name"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={4} />
              <SemiBoldText
                title={`${policy.firstName ?? ''} ${policy.lastName ?? ''}`}
                fontSize={15.5}
                color={CustomColors.blackTextColor}
              />
            </View>
            <View style={styles.infoRightColumn}>
              <RegularText
                title="Email"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />

              <VerticalSpacer height={4} />
              <SemiBoldText
                title={policy.email ?? ''}
                fontSize={15.5}
                color={CustomColors.blackTextColor}
              />
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <RegularText
                title="Phone number"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />

              <VerticalSpacer height={4} />
              <SemiBoldText
                title={policy.phone ?? ''}
                fontSize={15.5}
                color={CustomColors.blackTextColor}
              />
            </View>
            <View style={styles.infoRightColumn}>
              <RegularText
                title="Date of birth"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />

              <VerticalSpacer height={4} />
              <SemiBoldText
                title={CustomDateUtils.convertStringDate(
                  policy.dob ?? '2024-25-07'
                )}
                fontSize={15.5}
                color={CustomColors.blackTextColor}
              />
            </View>
          </View>
        </ExpandableContainer>

        <ExpandableContainer
          title="Transaction details"
          subTitle=""
          titleColor={DynamicColors().primaryBrandColor}
          isExpanded={isTransactionDetailsExpanded}
          setIsExpanded={setIsTransactionDetailsExpanded}
          collapseOthers={collapseOthers}
        >
          <InfoRowComponent
            title1="Plan"
            subtitle1={policy.product?.name ?? ''}
            title2="Policy number"
            subtitle2={policy.meta['policy_number'] ?? ''}
          />

          <InfoRowComponent
            title1="Purchase date"
            subtitle1={CustomDateUtils.convertDate(
              policy.startDate ?? new Date()
            )}
            title2="Expiry date"
            subtitle2={CustomDateUtils.convertDate(
              policy.expirationDate ?? new Date()
            )}
          />
          <InfoRowComponent
            title1="Period of Cover"
            subtitle1={CustomDateUtils.differenceInTime(
              policy.startDate ?? new Date(),
              policy.expirationDate ?? new Date()
            )}
            title2={'Premium'}
            subtitle2={`₦ ${
              policy.meta['payload']['premiumAmount'] == null
                ? policy.marketPrice == null
                  ? 'N/A'
                  : StringUtils.formatPriceWithComma(
                      policy.marketPrice?.toString()
                    )
                : StringUtils.formatPriceWithComma(
                    policy.meta['payload']['premiumAmount'].toString()
                  )
            }`}
          />
        </ExpandableContainer>
        {(productDetails.productCategory?.name ?? '').toLowerCase() ==
        'travel' ? (
          <></>
        ) : (productDetails.productCategory?.name ?? '').toLowerCase() ==
          'gadget' ? (
          <ExpandableContainer
            title="Gadget details"
            subTitle=""
            titleColor={DynamicColors().primaryBrandColor}
            isExpanded={isProductDetailsExpanded}
            setIsExpanded={setIsProductDetailsExpanded}
            collapseOthers={collapseOthers}
          >
            <InfoRowComponent
              title1="Gadget type"
              subtitle1={policy.meta['payload']['device_type'].toString()}
              title2="Gadget brand"
              subtitle2={policy.meta['payload']['device_make'].toString()}
            />

            <InfoRowComponent
              title1="Gadget model"
              subtitle1={policy.meta['payload']['device_model'].toString()}
              title2="Serial number"
              subtitle2={policy.meta['payload'][
                'device_serial_number'
              ].toString()}
            />
          </ExpandableContainer>
        ) : (
          <ExpandableContainer
            title="Vehicle details"
            subTitle=""
            titleColor={DynamicColors().primaryBrandColor}
            isExpanded={isProductDetailsExpanded}
            setIsExpanded={setIsProductDetailsExpanded}
            collapseOthers={collapseOthers}
          >
            <InfoRowComponent
              title1="Vehicle name"
              subtitle1={
                (policy.meta['vehicle_make'] ?? '') +
                ' ' +
                (policy.meta['vehicle_model'] ?? '') +
                ' ' +
                (policy.meta['year_of_manufacture'] ?? '')
              }
              title2="Policy number"
              subtitle2={policy.meta['policy_number'] ?? ''}
            />

            <InfoRowComponent
              title1="Plate number"
              subtitle1={policy.meta['registration_number'] ?? ''}
              title2="Chassis number"
              subtitle2={policy.meta['chassis_number'] ?? ''}
            />
            <InfoRowComponent
              title1="Engine number"
              subtitle1={policy.meta['engine_number'] ?? ''}
              title2={''}
              subtitle2={``}
            />
          </ExpandableContainer>
        )}

        {/* More containers for Gadget, Vehicle, etc. */}
      </ScrollView>
      <View style={styles.footerPadding}>
        <CustomButton title="Continue" onPress={handleContinue} />
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
  footerPadding: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoColumn: {
    flex: 1,
  },
  infoRightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 14,
    color: CustomColors.greyTextColor,
  },
  value: {
    fontSize: 14,
    paddingTop: 3,
    fontWeight: '600',
    color: CustomColors.blackTextColor,
  },
});

export default ConfirmPolicyInfoScreen;
