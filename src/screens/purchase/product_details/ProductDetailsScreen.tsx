import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import CustomButton from '../../../components/CustomButton';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import CustomAppBar from '../../../components/CustomAppBar';
import { SemiBoldText } from '../../../components/CustomText';
import { VerticalSpacer } from '../../../components/Spacer';
import ExpandableContainer from '../../../components/ExpandableContainer';
import ProductDetailsContainer from '../../../components/ProductDetailsContainer';
import PoweredByFooter from '../../../components/PoweredByFooter';
import { FormViewModel } from '../form/FormViewModel';
import { type FormStore, useFormStore } from '../../../store/formStore';
import type { ProcessFieldsProps } from '../payment/PlanDetailsScreen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProductDetailsScreenProps {
  productDetails: ProductDetailsModel;
}

type ProductDetailsScreenRouteProps = RouteProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const route = useRoute<ProductDetailsScreenRouteProps>();
  const formVM = FormViewModel();
  const { productDetails } = route.params;

  const [_isLoading, setIsLoading] = useState(true);
  const formGlobal = useFormStore((state: FormStore) => state);
  const [isAboutProductExpanded, setIsAboutProductExpanded] = useState(false);
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(false);
  const [isBenefitsExpanded, setIsBenefitsExpanded] = useState(false);
  const [isHowToClaimExpanded, setIsHowToClaimExpanded] = useState(false);
  const parentScrollRef = useRef<ScrollView>(null); // Define the ref for the parent ScrollView

  const collapseOthers = () => {
    setIsAboutProductExpanded(false);
    setIsHowItWorksExpanded(false);
    setIsBenefitsExpanded(false);
    setIsHowToClaimExpanded(false);
  };

  // const handleFilteredFields = async () => {
  //   setIsLoading(false);
  // };
  const processFields = async ({ fields }: ProcessFieldsProps) => {
    for (const field of fields) {
      if (field.dataUrl) {
        if (field.dataType === 'array') {
          await formVM.getMapData(field.dataUrl ?? '', field.name ?? '');
        } else {
          // log.debug(field.dataUrl);
          // log.debug(field.dataType);
          await formVM.getListData(field.dataUrl ?? '', field.name ?? '');
        }
      }
    }
  };

  const processFieldsWithDependsOn = async ({ fields }: ProcessFieldsProps) => {
    for (const field of fields) {
      if (field.dataUrl && field.dependsOn) {
        // formGlobal.setUrlDependents(field.dependsOn, field);
      }
    }
  };

  const handleFilteredFields = async () => {
    const selectedProductDetails = formGlobal.selectedProductDetails;

    const filteredFields =
      selectedProductDetails?.formFields?.filter(
        (field) => field.showFirst && field.dataUrl && !field.dependsOn
      ) ?? [];

    const filteredFieldsWithDependsOn =
      selectedProductDetails?.formFields?.filter(
        (field) => field.showFirst && field.dataUrl && field.dependsOn
      ) ?? [];

    await processFields({ fields: filteredFields });

    await processFieldsWithDependsOn({ fields: filteredFieldsWithDependsOn });

    setIsLoading(false); // Assuming you are managing loading state
  };

  useEffect(() => {
    // log.debug(productDetails);
    // log.debug(productDetails?.keyBenefits);
    handleFilteredFields();
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.statusBar}>
      <CustomAppBar
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />
      <ScrollView style={styles.container} ref={parentScrollRef}>
        <SemiBoldText
          title={'Product details'}
          fontSize={22}
          color={CustomColors.darkTextColor}
        />
        <VerticalSpacer height={30} />

        <ProductDetailsContainer />
        <VerticalSpacer height={30} />
        <View style={styles.contentContainer}>
          {/* Product Details Section */}
          {productDetails?.keyBenefits && (
            <ExpandableContainer
              title="About product"
              subTitle={productDetails.keyBenefits}
              isExpanded={isAboutProductExpanded}
              setIsExpanded={setIsAboutProductExpanded}
              collapseOthers={collapseOthers}
            />
          )}

          {productDetails?.howItWorks && (
            <ExpandableContainer
              title="How it works"
              subTitle={productDetails.howItWorks}
              isExpanded={isHowItWorksExpanded}
              setIsExpanded={setIsHowItWorksExpanded}
              collapseOthers={collapseOthers}
            />
          )}
          {productDetails?.fullBenefits && (
            <ExpandableContainer
              title="Benefits"
              subTitle={productDetails.fullBenefits}
              isExpanded={isBenefitsExpanded}
              setIsExpanded={setIsBenefitsExpanded}
              collapseOthers={collapseOthers}
            />
          )}
          {productDetails?.howToClaim && (
            <ExpandableContainer
              title="How to claim"
              subTitle={productDetails.howToClaim}
              isExpanded={isHowToClaimExpanded}
              setIsExpanded={setIsHowToClaimExpanded}
              collapseOthers={collapseOthers}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonArea}>
        <CustomButton
          title="Continue"
          onPress={() => {
            navigation.navigate('FirstFormScreen', {
              productDetails: productDetails,
            });
          }}
        />
        <PoweredByFooter />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
    // padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
    padding: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    color: DynamicColors().primaryBrandColor,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: CustomColors.darkTextColor,
  },
  contentContainer: {
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    color: CustomColors.blackColor,
  },

  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
