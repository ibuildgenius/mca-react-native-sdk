// import React from 'react';'
// @ts-nocheck
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAppBar from '../../../../components/CustomAppBar';
import { CustomColors } from '../../../../constants/CustomColors';
import IconContainer from '../../../../components/IconContainer';
import {
  VerticalSpacer,
  HorizontalSpacer,
} from '../../../../components/Spacer';
import {
  SemiBoldText,
  W500Text,
  RegularText,
} from '../../../../components/CustomText';
import Svg, { Path } from 'react-native-svg';
import IconUtils from '../../../../utils/iconUtils';
import globalObject from '../../../../store/globalObject';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'utils/navigatorStackList';

const ListViewProductListScreen = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();
  // const global = useGlobalStore((state: any) => state);

  const navigateToCategory = (categoryId: string, productCategory: any) => {
    navigation.navigate('ListViewProviderListScreen', {
      categoryId: categoryId,
      productCategory: productCategory,
    });
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        onBackTap={
          navigation.canGoBack() ? () => navigation.goBack() : undefined
        }
      />
      <View style={styles.contentContainer}>
        <VerticalSpacer height={35} />
        <SemiBoldText title="Select product category" fontSize={20} />
        <VerticalSpacer height={20} />

        <W500Text
          title={`${globalObject.productCategories.reduce(
            (sum: number, item: { productCount?: number }) =>
              sum + (item.productCount || 0),
            0
          )} Insurance products`}
          color={CustomColors.checkBoxBorderColor}
          fontSize={16}
        />

        <VerticalSpacer height={25} />

        <FlatList
          data={globalObject.productCategories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToCategory(item.id, item)}>
              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <IconContainer
                    icon={IconUtils.getIcon(item.name)}
                    size={41}
                  />
                  <HorizontalSpacer width={13} />
                  <View>
                    <SemiBoldText
                      title={`${item.name} Insurance`}
                      fontSize={15}
                    />
                    <VerticalSpacer height={3} />
                    <RegularText
                      title={`${item.productCount} products`}
                      fontSize={13}
                      color={CustomColors.greyTextColor}
                    />
                  </View>
                </View>
                <Svg height={24} width={24}>
                  <Path
                    d="M9 6 L15 12 L9 18"
                    stroke={CustomColors.blackColor}
                    strokeWidth="2"
                    fill="none"
                  />
                </Svg>
              </View>
              <View style={styles.divider} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 0.7,
    borderColor: CustomColors.productBorderColor,
    marginVertical: 10,
  },
});

export default ListViewProductListScreen;
