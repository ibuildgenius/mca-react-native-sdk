// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  CustomColors,
  DynamicColors,
} from '../../../../constants/CustomColors';
import CustomAppBar from '../../../../components/CustomAppBar';
import IconContainer from '../../../../components/IconContainer';
import {
  VerticalSpacer,
  HorizontalSpacer,
} from '../../../../components/Spacer';
import {
  SemiBoldText,
  RegularText,
  W500Text,
} from '../../../../components/CustomText';
import IconUtils from '../../../../utils/iconUtils';
import type { RootStackParamList } from '../../../../utils/navigatorStackList';
import { ProviderModel } from '../../../../models/ProviderModel';
import { useFormStore } from '../../../../store/formStore';
import { useMiscStore, type MiscStore } from '../../../../store/miscStore';
import { ProductViewModel } from '../ProductListViewModel';
import Skeleton from '@thevsstech/react-native-skeleton';
import PlanDetailsBottomSheet from '../../../../bottom_sheets/PlanDetailsBottomSheet';
import { ProductDetailsModel } from '../../../../models/ProductDetailsModel';
import customLog from '../../../../utils/logger';
import StabilityIndicator from '../../../../components/StabilityIndicator';
import globalObject from '../../../../store/globalObject';
import { ColorUtils } from '../../../../utils/colorUtils';
import { StringUtils } from '../../../../utils/StringUtils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ListViewProviderListScreenProps {
  categoryId: string;
  productCategory: any;
}

type ListViewProviderListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ListViewProviderListScreen'
>;

export const ListViewProviderListScreen: React.FC<
  ListViewProviderListScreenProps
> = () => {
  const route = useRoute<ListViewProviderListScreenRouteProp>();
  const { categoryId, productCategory } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [_isLoading, setIsLoading] = useState<boolean>(true);
  const viewModel = ProductViewModel();

  // const ListViewProviderListScreen = ({categoryid, productCategory}) => {

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const [selectedProvider, setSelectedProvider] = useState(0);
  //   const [filteredProviders, setFilteredProviders] = useState([]);

  const formGlobal = useFormStore((state: any) => state);

  const miscGlobal = useMiscStore((state: MiscStore) => state);

  const productDetails = formGlobal.selectedProductDetails;

  const handleContinue = () => {
    navigation.navigate('ProductDetailsScreen', {
      productDetails,
    });
    setModalVisible(false);
  };

  const filteredProviders =
    miscGlobal.selectedproductProviderList.length === 0
      ? miscGlobal.productProviderList
      : miscGlobal.productProviderList?.filter((provider: ProviderModel) =>
          miscGlobal.selectedproductProviderList.includes(provider.id ?? '')
        );

  useEffect(() => {
    const initialise = async () => {
      await viewModel.getInsuranceProviders(categoryId);
      setIsLoading(false);
    };

    initialise();
  }, []);

  const handleProviderSelect = async (index: number, providerId?: string) => {
    miscGlobal.setProductList(null);
    setSelectedProvider(index);
    setIsLoading(true);
    await viewModel.getInsuranceProviders(categoryId, [providerId ?? '']);
    setIsLoading(false);
  };
  const handleAllSelect = async (index: number) => {
    miscGlobal.setProductList(null);
    setSelectedProvider(index);
    setIsLoading(true);
    await viewModel.getInsuranceProviders(categoryId);
    setIsLoading(false);
  };

  const openBottomSheet = (product: any) => {
    formGlobal.setSelectedProductDetails(product);
    formGlobal.setSelectedProductCategory(productCategory);

    setModalVisible(true);
  };

  const renderProviderItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={
        item.id === 'all'
          ? () => handleAllSelect(index)
          : () => handleProviderSelect(index, item.id)
      }
      style={[
        styles.providerContainer,
        selectedProvider === index && styles.selectedProvider,
      ]}
    >
      {item.id === 'all' ? <></> : <VerticalSpacer height={10} />}

      {item.id === 'all' ? (
        <></>
      ) : (
        <View style={styles.iconContainer}>
          {item.icon ? (
            <Image source={{ uri: item.icon }} style={styles.providerIcon} />
          ) : (
            <SemiBoldText title={item.companyName[0]} fontSize={17} />
          )}
        </View>
      )}
      {item.id === 'all' ? <></> : <VerticalSpacer height={5} />}
      {item.id === 'all' ? (
        <W500Text title={item.companyName} fontSize={15} />
      ) : (
        <RegularText title={item.companyName} fontSize={13} />
      )}
    </TouchableOpacity>
  );

  const renderProviderShimmer = () => (
    // <View
    //   style={[
    //     styles.providerContainer,
    //     selectedProvider === index && styles.selectedProvider,
    //   ]}>
    //   <ShimmerLoader height={80} color={DynamicColors().primaryBrandColor} />
    // </View>

    <Skeleton
      speed={1000}
      backgroundColor={DynamicColors().lightPrimaryColor}
      highlightColor={CustomColors.shimmerHighlightColor}
    >
      <View style={styles.providerContainer}></View>
    </Skeleton>
  );

  return (
    <View style={styles.container}>
      <CustomAppBar
        onBackTap={
          navigation.canGoBack()
            ? () => {
                miscGlobal.setSelectedAllProviders(true);
                miscGlobal.setProductProviderList(null);
                miscGlobal.setProductList(null);
                miscGlobal.setSelectedproductProviderList([]);

                return navigation.goBack();
              }
            : undefined
        }
      />
      <View style={styles.contentContainer}>
        <VerticalSpacer height={10} />
        <SemiBoldText title="Select product" fontSize={20} />
        <VerticalSpacer height={20} />

        <View style={styles.providerList}>
          <FlatList
            horizontal
            // data={
            //   filteredProviders
            //     ? filteredProviders.length > 0
            //       ? filteredProviders
            //       : miscGlobal.productProviderList
            //     : null
            // }
            // data={
            //   filteredProviders
            //     ? [{ id: 'all', companyName: 'ALL', icon: null }, ...(filteredProviders.length > 0 ? filteredProviders : miscGlobal.productProviderList)]
            //     : [{ id: 'all', companyName: 'ALL', icon: null }]
            // }
            data={
              filteredProviders === null
                ? ['', '', '']
                : filteredProviders
                  ? [
                      { id: 'all', companyName: 'ALL', icon: null },
                      ...(filteredProviders.length > 0
                        ? filteredProviders
                        : miscGlobal.productProviderList),
                    ]
                  : [{ id: 'all', companyName: 'ALL', icon: null }]
            }
            keyExtractor={(_item, index) => index.toString()}
            renderItem={
              filteredProviders === null
                ? renderProviderShimmer
                : // renderProviderShimmer

                  renderProviderItem
            }
          />
        </View>
        <VerticalSpacer height={25} />
        <View style={styles.categoryInfo}>
          <IconContainer
            icon={IconUtils.getIcon(productCategory.name)}
            size={43}
          />
          <HorizontalSpacer width={12} />
          <View>
            <SemiBoldText
              title={`${productCategory.name} Insurance`}
              fontSize={16}
              color={DynamicColors().primaryBrandColor}
            />
            <VerticalSpacer height={3} />
            <RegularText
              title={`${
                miscGlobal.productList ? miscGlobal.productList?.length : 0
              } products`}
              fontSize={15}
              color={CustomColors.greyTextColor}
            />
          </View>
        </View>
        <VerticalSpacer height={35} />
        {/* <FlatList
          data={global.productList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListProviderContainer
              productDetails={item}
              title={item.name}
              provider={item.provider}
              price={item.price}
              formattedPrice={item.formattedPrice}
              periodOfCover={item.coverPeriod}
              isDynamicPrice={item.isDynamicPricing}
              hasDiscount={false}
            />
          )}
        /> */}

        <FlatList
          data={
            miscGlobal.productList === null
              ? [
                  new ProductDetailsModel(''),
                  new ProductDetailsModel(''),
                  new ProductDetailsModel(''),
                ]
              : miscGlobal.productList
          }
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          numColumns={2}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={function ({ item }) {
            const brandColor = ColorUtils.hexToRgba(
              item?.provider?.brandColorPrimary ??
                item?.provider?.settings?.brandColorPrimary ??
                '3BAA90',
              0.5 // Default color
            );

            return miscGlobal.productList === null ? (
              // View
              // <View >
              <View
                style={[
                  styles.shimmerProductCard, // Your custom styles
                  // Takes available width, with spacing between columns
                ]}
              >
                <VerticalSpacer height={5} />
                <Skeleton
                  speed={1000}
                  backgroundColor={CustomColors.shimmeBaseColor}
                  highlightColor={CustomColors.shimmerHighlightColor}
                >
                  <View
                    style={[
                      styles.firstShimmerProductContainer, // Your custom styles
                      // Takes available width, with spacing between columns
                    ]}
                  />
                </Skeleton>

                <Skeleton
                  speed={1000}
                  backgroundColor={CustomColors.shimmeBaseColor}
                  highlightColor={CustomColors.shimmerHighlightColor}
                >
                  <View
                    style={[
                      styles.secondShimmerProductContainer, // Your custom styles
                      // Takes available width, with spacing between columns
                    ]}
                  />
                </Skeleton>
                <View style={{ flex: 1 }} />
                <Skeleton
                  speed={1000}
                  backgroundColor={CustomColors.shimmeBaseColor}
                  highlightColor={CustomColors.shimmerHighlightColor}
                >
                  <View
                    style={[
                      styles.thirdShimmerProductContainer, // Your custom styles
                      // Takes available width, with spacing between columns
                    ]}
                  />
                </Skeleton>
                <Skeleton
                  speed={1000}
                  backgroundColor={CustomColors.shimmeBaseColor}
                  highlightColor={CustomColors.shimmerHighlightColor}
                >
                  <View
                    style={[
                      styles.thirdShimmerProductContainer, // Your custom styles
                      // Takes available width, with spacing between columns
                    ]}
                  />
                </Skeleton>
                <VerticalSpacer height={5} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.productCard}
                onPress={function () {
                  customLog.error(item?.provider?.settings?.icon);
                  customLog.info(item?.provider?.brandColorPrimary);
                  customLog.info(item);
                  // log.debug(JSON.stringify(item, null, 2));
                  // // log.info(JSON.stringify(json, null, 2) );
                  return openBottomSheet(
                    item
                    // item.productCategory
                  );
                }}
              >
                {/* <View style={styles.iconContainer}>
              {StringUtils.isNullOrEmpty(
                item?.icon ?? item?.settings?.icon,
              ) == true ? (
                <Image
                  source={{uri: item.icon ?? item?.settings?.icon}}
                  style={styles.providerIcon}
                />
              ) : (
                <SemiBoldText title={item.name[0]} fontSize={17} />
              )}
            </View> */}
                <VerticalSpacer height={7} />
                <View
                  style={[
                    styles.circleIconContainer,
                    { borderColor: brandColor },
                  ]}
                >
                  {!StringUtils.isNullOrEmpty(
                    (item?.provider?.icon ?? item?.provider?.settings?.icon) ||
                      ''
                  ) ? (
                    <Image
                      source={{
                        uri:
                          item?.provider?.icon ??
                          item?.provider?.settings?.icon ??
                          '',
                      }}
                      style={styles.productIcon}
                    />
                  ) : (
                    <SemiBoldText
                      title={
                        item?.provider?.companyName
                          ? item?.provider.companyName[0] || ''
                          : item.name![0] || ''
                      }
                      fontSize={17}
                    />
                  )}
                </View>

                {/* <Text>{item.name}</Text> */}
                <VerticalSpacer height={10} />
                <View style={[{ height: 60 }]}>
                  <SemiBoldText title={item.name ?? ''} fontSize={15} />
                  <VerticalSpacer height={5} />
                  <W500Text
                    title={item.provider?.companyName ?? ''}
                    fontSize={13}
                    color={CustomColors.greyTextColor}
                  />
                </View>
                {/* <VerticalSpacer height={10} /> */}

                {item.isDynamicPricing ? (
                  <SemiBoldText
                    title={`${StringUtils.getProductPrice(
                      item.price ?? '',
                      item.isDynamicPricing ?? false
                    )} /  ${StringUtils.getProviderPeriodOfCover(
                      item.coverPeriod ?? ''
                    )}`}
                    fontSize={15}
                    color={CustomColors.blackColor}
                  />
                ) : (
                  <>
                    <SemiBoldText
                      title={`₦ ${StringUtils.formatPriceWithComma(
                        item.price ?? ''
                      )} /  ${StringUtils.getProviderPeriodOfCover(
                        item.coverPeriod ?? ''
                      )}`}
                      fontSize={15}
                      color={CustomColors.blackColor}
                    />
                  </>
                )}

                {globalObject.businessDetails?.appMode == 'test' &&
                item?.stabilityPercentageTestMode ? (
                  <StabilityIndicator
                    value={item?.stabilityPercentageTestMode ?? 0}
                  ></StabilityIndicator>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            );
          }}
        />
        <PlanDetailsBottomSheet
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onContinue={handleContinue}
          productCategory={formGlobal.selectedProductCategory}
          productDetails={formGlobal.selectedProductDetails}
        />
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 25,
  },
  providerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    // paddingVertical: 20,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIconContainer: {
    height: 33,
    width: 33, // Set width equal to height for a perfect circle
    borderRadius: 18, // Half of height/width to make it round
    borderColor: 'red', // Set border color to red
    borderWidth: 4.13, // Define the border width
    justifyContent: 'center', // Center the content inside (optional)
    alignItems: 'center', // Center the content inside (optional)
  },
  providerList: {
    height: 100,
  },
  productIcon: {
    height: '60%', // Make the image fill the parent container's height
    width: '60%', // Make the image fill the parent container's width
    borderRadius: 18, // Match the border radius of the circleIconContainer
    resizeMode: 'cover', // Ensure the image scales properly within the container
    // padding: 10,
  },
  productCard: {
    width: '48%',
    padding: 10,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: CustomColors.dividerGreyColor,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  providerContainer: {
    height: 80,
    width: 90,
    borderWidth: 1,
    borderColor: CustomColors.dividerGreyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedProvider: {
    borderColor: DynamicColors().primaryBrandColor,
  },
  horizontalList: {
    paddingBottom: 10,
  },
  shimmerProductCard: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    height: 160,

    borderWidth: 1,
    borderColor: CustomColors.dividerGreyColor,
  },
  providerText: {
    fontSize: 16,
    color: CustomColors.blackColor,
  },
  firstShimmerProductContainer: {
    borderColor: CustomColors.dividerGreyColor,
    flex: 1,
    width: screenWidth / 2 - 60,
    height: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
  },

  secondShimmerProductContainer: {
    borderColor: CustomColors.dividerGreyColor,
    flex: 1,
    width: screenWidth / 2 - 70,
    height: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
  },

  thirdShimmerProductContainer: {
    borderColor: CustomColors.dividerGreyColor,
    flex: 1,
    width: screenWidth / 2 - 90,
    height: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
  fourthShimmerProductContainer: {
    borderColor: CustomColors.dividerGreyColor,
    flex: 1,
    width: screenWidth / 2 - 90,
    height: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ListViewProviderListScreen;
