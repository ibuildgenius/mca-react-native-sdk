import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  BackHandler,
} from 'react-native';
import {
  type RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { StringUtils } from '../../../utils/StringUtils';
import ProductDetailsContainer from '../../../components/ProductDetailsContainer';
import { CustomColors } from '../../../constants/CustomColors';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import { format } from 'date-fns';
import { PurchaseDetailsResponseModel } from '../../../models/PurchaseDetailsResponseModel';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type FormStore, useFormStore } from '../../../store/formStore';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import CustomAppBar from '../../../components/CustomAppBar';
import ExpandableContainer from '../../../components/ExpandableContainer';
import { VerticalSpacer } from '../../../components/Spacer';
import customLog from '../../../utils/logger';
import { FormFieldModel } from '../../../models/FormFieldModel';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface PlanDetailsScreenProps {
  purchaseDetails: PurchaseDetailsResponseModel;
}

export interface ProcessFieldsProps {
  fields: FormFieldModel[];
}

type PlanDetailsScreenRouteProps = RouteProp<
  RootStackParamList,
  'PlanDetailsScreen'
>;

const PlanDetailsScreen: React.FC<PlanDetailsScreenProps> = () => {
  const route = useRoute<PlanDetailsScreenRouteProps>();
  // const formVM = FormViewModel();
  const { purchaseDetails } = route.params;
  const [_isLoading, setIsLoading] = useState(true);
  const formGlobal = useFormStore((state: FormStore) => state);
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const [isPlanDetailsExpanded, setIsPlanDetailsExpanded] = useState(true);
  const [isPurchaseDetailsExpanded, setIsPurchaseDetailsExpanded] =
    useState(false);
  const parentScrollRef = useRef<ScrollView>(null); // Define the ref for the parent ScrollView
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   // Check if the formData is empty
  //   if (Object.keys(formGlobal.formData).length === 0) {
  //     // If formData is empty, update it with purchaseDetails.payload.data
  //     formGlobal.updateFormData(purchaseDetails?.payload?.data ?? {});
  //   }
  //   // This effect will only run once when the component is mounted
  // }, []);

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
    if (isFocused) {
      if (
        formGlobal.formData &&
        Object.keys(formGlobal.formData).length === 0
      ) {
        // If formData is empty, update it with purchaseDetails.payload.data
        formGlobal.updateFormData(purchaseDetails?.payload?.data ?? {});
        formGlobal.setFormData(
          'product_id',
          purchaseDetails.payload?.productId
        );
      }
    }
  }, [isFocused]);

  // BUY-PSK-KIRWWD1729682395043
  const collapseOthers = () => {
    setIsPlanDetailsExpanded(false);
    setIsPurchaseDetailsExpanded(false);
  };

  // const processFields = async ({ fields }: ProcessFieldsProps) => {
  //   for (const field of fields) {
  //     if (field.dataUrl) {
  //       if (field.dataType === 'array') {
  //         await formVM.getMapData(field.dataUrl ?? '', field.name ?? '');
  //       } else {
  //         await formVM.getListData(field.dataUrl ?? '', field.name ?? '');
  //       }
  //     }
  //   }
  // };

  // const processFieldsWithDependsOn = async ({ fields }: ProcessFieldsProps) => {
  //   for (const field of fields) {
  //     if (field.dataUrl && field.dependsOn) {
  //       formGlobal.setUrlDependents(field.dependsOn, field);
  //     }
  //   }
  // };

  useEffect(() => {
    const handleFilteredFields = async () => {
      // Simulate processing the form fields
      setTimeout(() => setIsLoading(false), 1000); // Simulated delay
    };
    handleFilteredFields();
  }, []);

  return (
    <View style={styles.container}>
      <VerticalSpacer height={10} />
      <CustomAppBar showBackButton={false} />
      <ScrollView contentContainerStyle={styles.content} ref={parentScrollRef}>
        <VerticalSpacer height={20} />
        <TouchableOpacity
          onPress={() => {
            customLog.error(JSON.stringify(purchaseDetails, null, 2));
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log(111111111);
              console.log(formGlobal.formData);
              // console.log(purchaseDetails);
              // console.log(purchaseDetails);
              // console.log(purchaseDetails);
              // console.log(purchaseDetails);
            }}
          >
            <SemiBoldText
              title="Your purchase summary"
              fontSize={20}
              color={CustomColors.darkTextColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <VerticalSpacer height={25} />
        <ProductDetailsContainer />
        <VerticalSpacer height={20} />

        <ExpandableContainer
          title="Plan Details"
          subTitle=""
          isExpanded={isPlanDetailsExpanded}
          setIsExpanded={setIsPlanDetailsExpanded}
          collapseOthers={collapseOthers}
        >
          <View style={styles.detailRow}>
            <View>
              <RegularText
                title="Plan status"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <View style={styles.statusBadge}>
                <RegularText
                  title="Pending"
                  fontSize={14.5}
                  color={CustomColors.orangeColor}
                />
              </View>
            </View>
            <View style={styles.detailColumn}>
              <RegularText
                title="Plan name"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={
                  formGlobal.selectedProductDetails?.name ??
                  purchaseDetails.payload?.route ??
                  ''
                }
                fontSize={14}
                color={CustomColors.blackColor}
              />
            </View>
          </View>
          <View style={styles.detailRow}>
            <View>
              <RegularText
                title="Purchase date"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={format(
                  purchaseDetails.createdAt ?? new Date(),
                  'do MMMM yyyy'
                )}
                fontSize={14}
                color={CustomColors.blackColor}
              />
            </View>
            <View style={styles.detailColumn}>
              <RegularText
                title="Premium"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={`₦ ${StringUtils.formatPriceWithComma(
                  purchaseDetails.payload?.amount !== null &&
                    purchaseDetails.payload?.amount !== undefined
                    ? String(purchaseDetails.payload.amount)
                    : '0' // Fallback in case amount is null or undefined
                )}`}
                fontSize={14.5}
                color={CustomColors.blackColor}
              />
            </View>
          </View>
        </ExpandableContainer>
        <ExpandableContainer
          title="Purchase Details"
          subTitle=""
          isExpanded={isPurchaseDetailsExpanded}
          setIsExpanded={setIsPurchaseDetailsExpanded}
          collapseOthers={collapseOthers}
        >
          <VerticalSpacer height={10} />
          <View style={styles.detailRow}>
            <View>
              <RegularText
                title="Email"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={purchaseDetails.payload?.data?.email ?? ''}
                fontSize={15}
                color={CustomColors.blackColor}
              />
            </View>
            <View style={styles.detailColumn}>
              <RegularText
                title="Phone number"
                fontSize={15}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={
                  purchaseDetails.payload?.data?.phone_number ??
                  purchaseDetails.payload?.data?.phone ??
                  ''
                }
                fontSize={14}
                color={CustomColors.blackColor}
              />
            </View>
          </View>
          <View style={styles.detailRow}>
            <View>
              <RegularText
                title="Last name"
                fontSize={14.5}
                color={CustomColors.greyTextColor}
              />

              <SemiBoldText
                title={purchaseDetails.payload?.data?.last_name ?? ''}
                fontSize={14.5}
                color={CustomColors.blackColor}
              />
            </View>
            <View style={styles.detailColumn}>
              <RegularText
                title="First name"
                fontSize={14}
                color={CustomColors.greyTextColor}
              />

              <SemiBoldText
                title={purchaseDetails.payload?.data?.first_name ?? ''}
                fontSize={14}
                color={CustomColors.blackColor}
              />
            </View>
          </View>
        </ExpandableContainer>
      </ScrollView>
      <View style={styles.buttonArea}>
        <CustomButton
          title="Continue"
          onPress={() =>
            navigation.navigate('SecondFormScreen', {
              productDetails:
                formGlobal.selectedProductDetails ??
                new ProductDetailsModel(''),
            })
          }
        />
        <PoweredByFooter />
      </View>
    </View>
  );
};

// interface PlanExpandableContainerProps {
//   title: string;
//   children: ReactNode;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  expandableContainer: {
    backgroundColor: CustomColors.lightGrayTextColor,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expandedContent: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailColumn: {
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  statusBadge: {
    backgroundColor: CustomColors.lightOrangeColor,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default PlanDetailsScreen;
