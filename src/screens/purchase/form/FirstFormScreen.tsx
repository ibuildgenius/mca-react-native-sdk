import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  useNavigation,
  type RouteProp,
  useRoute,
} from '@react-navigation/native';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import CustomButton from '../../../components/CustomButton';
import CustomAppBar from '../../../components/CustomAppBar';
import { FormFieldModel } from '../../../models/FormFieldModel';
import customLog from '../../../utils/logger';
import BuildFormFieldWidget from './components/BuildFormFieldWidget';
import { ProductPriceContainer } from './components/ProductPriceContainer';
import { type FormStore, useFormStore } from '../../../store/formStore';
import { type LoadStore, useLoadStore } from '../../../store/loadStore';
import { FormViewModel } from './FormViewModel';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';

import InfoIcon from '../../../assets/icons/info_icon.svg';
import ProviderUtils from '../../../utils/ProviderUtils';
import { type Control, type FieldValues, useForm } from 'react-hook-form';
import globalObject from '../../../store/globalObject';
import { PaymentOption } from '../../../utils/enums';
import { PaymentViewModel } from '../payment/PaymentViewModel';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface FirstFormScreenProps {
  productDetails: ProductDetailsModel;
}

type FirstFormScreenRouteProp = RouteProp<
  RootStackParamList,
  'FirstFormScreen'
>;

export const FirstFormScreen: React.FC<FirstFormScreenProps> = () => {
  const paymentVM = PaymentViewModel();
  // const formViewModel = FormViewModel();
  const formVM = FormViewModel();
  // const loadingState = useLoadStore((state: any) => state);
  const { control, handleSubmit, trigger } = useForm();

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<FirstFormScreenRouteProp>();

  const { productDetails } = route.params;
  // const globalForm = useFormStore((state: FormStore) => state);
  const globalForm = useFormStore((state: FormStore) => state);
  // const globalForm = useFormStore(
  //   (state: FormStoreState & FormStoreActions) => state,
  // );

  const [currentPage, setCurrentPage] = useState<number>(0);
  const loadingState = useLoadStore((state: LoadStore) => state);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [IsValidate, _setIsValidate] = useState<boolean>(true);

  const formFields = productDetails?.formFields || [];

  const filteredFields = formFields.filter(
    (field: FormFieldModel) => field.showFirst === true
  );

  filteredFields.sort(
    (a: FormFieldModel, b: FormFieldModel) =>
      (a.position || 0) - (b.position || 0)
  );

  const itemsPerPage = currentPage === 0 ? 4 : 3;

  const startIndex = currentPage === 0 ? 0 : 4 + (currentPage - 1) * 3;
  const endIndex = startIndex + itemsPerPage;

  const currentFields = filteredFields.slice(
    startIndex,
    endIndex > filteredFields.length ? filteredFields.length : endIndex
  );

  const isLastPage = endIndex >= filteredFields.length;

  useEffect(() => {
    const backAction = () => {
      if (currentPage > 0) {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
        globalForm.setAutoValidate(false);
        globalForm.setProductPrice(0);
        globalForm.clearFormErrors();
        setCurrentPage(currentPage - 1);
      } else if (navigation.canGoBack()) {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
        globalForm.setAutoValidate(false);
        globalForm.setProductPrice(0);
        ProviderUtils.resetAllFormProviders();
        navigation.goBack();
      }

      // Returning true prevents the default back button behavior
      return true;
    };

    // Adding the back button event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Cleanup the event listener on unmount
    return () => backHandler.remove();
  }, [currentPage, globalForm, navigation]);

  useEffect(() => {
    customLog.error(productDetails);
    globalForm.setFormData('product_id', productDetails?.id);

    // Add event listeners for keyboard show and hide
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners when component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

    // setIsLoading(false);
  }, []);

  const onSubmit = async () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    // log.error('endIndex', endIndex);
    // log.error('other', filteredFields.length);

    console.log(globalForm.formErrors.size);

    if (globalForm.formErrors.size != 0) {
      globalForm.setShouldValidateImageplusDrop(true);
    } else {
      globalForm.setShouldValidateImageplusDrop(false);
      globalForm.clearFormErrors();

      if (IsValidate) {
        globalForm.setAutoValidate(false);
        if (endIndex < filteredFields.length) {
          setCurrentPage(currentPage + 1);
        } else if (globalForm.productPrice === 0) {
          customLog.error('Heree');
          // log.info(Object.fromEntries(globalForm.formData));
          // log.info('glooooballl', JSON.stringify(globalForm.formData, null, 2));
          // viewModel.initialize();
          await formVM.fetchProductPrice(
            loadingState,
            productDetails?.id ?? ''
          );
        } else {
          customLog.error('111Heree');
          if (globalObject.paymentOption == PaymentOption.wallet) {
            await paymentVM.initiateWalletPurchase(loadingState);
          } else {
            navigation.navigate('PaymentMethodScreen');
          }
        }
      } else {
        globalForm.setAutoValidate(true);
      }
    }
  };

  const renderFormField = (
    field: any,
    index: any,
    control: Control<FieldValues, any>
  ) => {
    return (
      <BuildFormFieldWidget
        key={index}
        globalForm={globalForm}
        field={field}
        isLastPage={isLastPage}
        shouldFetchPrice={true}
        filteredFieldsLength={filteredFields.length}
        control={control}
        // formVM={formVM}
        trigger={trigger}
        handleSubmit={handleSubmit}
        productDetails={productDetails}
        // onClearFocus={() => {
        //   if (Keyboard.isVisible()) {
        //     Keyboard.dismiss();
        //   }
        // }}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <CustomAppBar
          onBackTap={
            currentPage > 0
              ? () => {
                  if (Keyboard.isVisible()) {
                    Keyboard.dismiss();
                  }
                  globalForm.setAutoValidate(false);
                  globalForm.setProductPrice(0);
                  globalForm.clearFormErrors();
                  setCurrentPage(currentPage - 1);
                }
              : navigation.canGoBack()
                ? () => {
                    if (Keyboard.isVisible()) {
                      Keyboard.dismiss();
                    }
                    globalForm.setAutoValidate(false);
                    globalForm.setProductPrice(0);
                    ProviderUtils.resetAllFormProviders();
                    return navigation.goBack();
                  }
                : undefined
          }
        />
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* <Text style={styles.title}></Text> */}
          <VerticalSpacer height={25} />
          <TouchableOpacity onPress={() => console.log(globalForm.formData)}>
            <SemiBoldText title="Provide Plan Owner Details" fontSize={21} />
          </TouchableOpacity>
          <VerticalSpacer height={30} />

          <View style={styles.container}>
            <View
              style={[
                styles.banner,
                { backgroundColor: DynamicColors().lightPrimaryColor },
              ]}
            >
              <InfoIcon
                width={25}
                height={25}
                stroke={DynamicColors().primaryBrandColor}
              />
              <HorizontalSpacer width={20} />
              <View style={{ flex: 1 }}>
                <RegularText
                  title="Make sure you provide the right details as it appears on legal documents"
                  color={CustomColors.blackTextColor}
                  fontSize={15}
                />
              </View>
            </View>
          </View>
          <VerticalSpacer height={30} />

          {
            // isLoading ? (
            //   <ActivityIndicator size="large" color="#0000ff" />
            // ) :
            <ScrollView>
              {currentPage === 0 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    {filteredFields.slice(0, 2).map((field, index) => (
                      <View
                        key={index}
                        style={{ flex: 1, marginRight: index === 0 ? 20 : 0 }}
                      >
                        {renderFormField(field, index, control)}
                      </View>
                    ))}
                  </View>

                  <FlatList
                    data={currentFields.slice(2)}
                    renderItem={({ item, index }) =>
                      renderFormField(item, index, control)
                    }
                    scrollEnabled={false}
                  />
                </>
              ) : (
                <FlatList
                  data={currentFields}
                  renderItem={({ item, index }) =>
                    renderFormField(item, index, control)
                  }
                  scrollEnabled={false}
                />
              )}

              <View style={{ marginVertical: 80 }} />

              {/* Conditional Visibility */}
              {/* {Keyboard.isVisible() ? (
              <View>
                {isLastPage && <ProductPriceContainer title="Premium" isLoading={formVM.isLoading} />}
                <CustomButton
                  title={paymentVM.price === 0 ? 'Continue' : 'Proceed to payment'}
                  isLoading={paymentVM.isLoading}
                  onPress={() => {
                    if (!formVM.isLoading) {
                      if (currentPageIndex < filteredFields.length) {
                        setCurrentPageIndex(currentPageIndex + 1);
                      } else {
                        
                      }
                    }
                  }}
                />
              </View>
            ) :  */}
            </ScrollView>
          }

          {keyboardVisible && (
            <>
              <View>
                {isLastPage && <ProductPriceContainer title="Premium" />}
                <CustomButton
                  title={
                    globalForm.productPrice == 0
                      ? 'Continue'
                      : 'Proceed to Payment'
                  }
                  isLoading={loadingState.formVmLoading}
                  onPress={handleSubmit(onSubmit)}

                  // {loadingState.paymentVmLoading ? undefined : {handleSubmit(onSubmit)} }
                />
              </View>
            </>
          )}
        </ScrollView>
        {!keyboardVisible && (
          <>
            <View style={styles.buttonArea}>
              {isLastPage && <ProductPriceContainer title="Premium" />}
              <CustomButton
                title={
                  globalForm.productPrice == 0
                    ? 'Continue'
                    : 'Proceed to Payment'
                }
                isLoading={loadingState.formVmLoading}
                onPress={handleSubmit(onSubmit)}
                // onPress={loadingState.paymentVmLoading ? undefined : onSubmit}
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DynamicColors().lightPrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default FirstFormScreen;
