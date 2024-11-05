// @ts-nocheck
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import CustomAppBar from '../../../../components/CustomAppBar';
import IconContainer from '../../../../components/IconContainer';
import { CustomColors } from '../../../../constants/CustomColors';
import { useNavigation } from '@react-navigation/native';
import IconUtils from '../../../../utils/iconUtils';
import { SemiBoldText, W500Text } from '../../../../components/CustomText';
import { VerticalSpacer } from '../../../../components/Spacer';
import globalObject from '../../../../store/globalObject';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'utils/navigatorStackList';

const GridViewProductListScreen = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  // const navigateToCategory = (categoryId: string, productCategory: any) => {
  //   navigation.navigate('GridViewProviderListScreen', {
  //     categoryId: categoryId,
  //     productCategory: productCategory,
  //   });
  // };

  const navigateToCategory = (categoryId: string, productCategory: any) => {
    navigation.navigate('GridViewProviderListScreen', {
      categoryId,
      productCategory,
    });
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />

      <View style={styles.headerContainer}>
        <VerticalSpacer height={30} />
        <SemiBoldText title="Select product category" fontSize={20} />
        <VerticalSpacer height={20} />

        <W500Text
          title={`${globalObject.productCategories.reduce(
            (sum: number, item: { productCount?: number }) =>
              sum + (item.productCount || 0),
            0
          )} Insurance products`}
          color={CustomColors.checkBoxBorderColor}
          fontSize={17}
        />
      </View>

      <VerticalSpacer height={20} />

      <FlatList
        data={globalObject.productCategories}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigateToCategory(item.id, item)}
          >
            <VerticalSpacer height={5} />
            <IconContainer icon={IconUtils.getIcon(item.name)} size={40} />

            <View style={styles.textContainer}>
              <SemiBoldText title={`${item.name} Insurance`} fontSize={15} />
              <VerticalSpacer height={5} />
              <SemiBoldText
                title={`${item.productCount} products`}
                fontSize={13}
                color={CustomColors.greyTextColor}
              />
              <VerticalSpacer height={5} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  subHeaderText: {
    fontSize: 16,
    color: CustomColors.checkBoxBorderColor,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 8,
    borderWidth: 0.6,
    borderColor: CustomColors.productBorderColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textContainer: {
    marginTop: 25,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  productCountText: {
    fontSize: 13,
    color: CustomColors.greyTextColor,
  },
});

export default GridViewProductListScreen;
