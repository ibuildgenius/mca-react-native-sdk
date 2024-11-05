import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import { useForm, type Control, type FieldValues } from 'react-hook-form'; // Assuming you use react-hook-form for forms
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'; // For handling navigation focus
import CustomAppBar from '../../../components/CustomAppBar';
import PoweredByFooter from '../../../components/PoweredByFooter';
import CustomButton from '../../../components/CustomButton';
import BuildFormFieldWidget from './components/BuildFormFieldWidget';
import { CustomColors, DynamicColors } from '../../../constants/CustomColors';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import { FormFieldModel } from '../../../models/FormFieldModel';
import type { RootStackParamList } from '../../../utils/navigatorStackList';
import { ProductDetailsModel } from '../../../models/ProductDetailsModel';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type FormStore, useFormStore } from '../../../store/formStore';
import customLog from '../../../utils/logger';
import { FormViewModel } from './FormViewModel';
import ProviderUtils from '../../../utils/ProviderUtils';
import { HorizontalSpacer, VerticalSpacer } from '../../../components/Spacer';
import InfoIcon from '../../../assets/icons/info_icon.svg';
import { type LoadStore, useLoadStore } from '../../../store/loadStore';
// import FileRepository from '../../../data/repositories/file_repo';
// import FormRepository from '../../../data/repositories/form_repo';
// import { type GlobalStore, useGlobalStore } from '../../../store/globalStore';

interface SecondFormScreenProps {
  productDetails: ProductDetailsModel;
}

type SecondFormScreenRouteProps = RouteProp<
  RootStackParamList,
  'SecondFormScreen'
>;

const SecondFormScreen: React.FC<SecondFormScreenProps> = () => {
  // const fileRepository = new FileRepository();
  // const formRepository = new FormRepository();
  const route = useRoute<SecondFormScreenRouteProps>();
  const { control, handleSubmit, trigger } = useForm();
  const { productDetails } = route.params;
  // const global = useGlobalStore((state: GlobalStore) => state);
  const loadingState = useLoadStore((state: LoadStore) => state);

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();
  const globalForm = useFormStore((state: FormStore) => state);
  const formVM = FormViewModel();

  const [currentPage, setCurrentPage] = useState(0);
  // const [newFormData, setNewFormData] = useState(new Map<string, any>());

  const [_isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [IsValidate, _setIsValidate] = useState<boolean>(true);

  const formFields = productDetails?.formFields || [];

  const filteredFields = formFields.filter(
    (field: FormFieldModel) => field.showFirst != true
  );

  filteredFields.sort(
    (a: FormFieldModel, b: FormFieldModel) =>
      (a.position || 0) - (b.position || 0)
  );

  // Pagination Setup
  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFields.length);
  const currentFields = filteredFields.slice(startIndex, endIndex);

  const handleBackAction = () => {
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
  };

  useEffect(() => {
    const backAction = () => {
      handleBackAction();

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
    setIsLoading(false);
    setIsLastPage(endIndex >= filteredFields.length);

    // globalForm.setFormData('product_id', productDetails?.id);

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
  }, [currentPage, filteredFields]);

  const onSubmit = async () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }

    if (globalForm.formErrors.size != 0) {
      globalForm.setShouldValidateImageplusDrop(true);
    } else {
      globalForm.setShouldValidateImageplusDrop(false);

      if (IsValidate) {
        globalForm.setAutoValidate(false);
        if (endIndex < filteredFields.length) {
          setCurrentPage(currentPage + 1);
        } else {
          customLog.error('Heree');
          // log.info(Object.fromEntries(globalForm.formData));
          globalForm.setFormData('product_id', productDetails?.id);
          formVM.completePurchase(loadingState, productDetails);
          // completePurchase();
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
        filteredFieldsLength={filteredFields.length}
        control={control}
        shouldFetchPrice={false}
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
    <View style={styles.container}>
      {/* <CustomAppBar
        onBackTap={() => {
          if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
          } else {
            navigation.goBack();
          }
        }}
      /> */}

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

      <ScrollView style={styles.content}>
        {/* <SemiBoldText
          title="Activate Plan"
          fontSize={20}
          color={CustomColors.darkTextColor}
        />

        <View style={styles.infoBox}>
          <SemiBoldText
            title="Make sure you provide the right details as it appears on legal documents."
            fontSize={14}
            color={CustomColors.blackColor}
          />
        </View> */}

        <VerticalSpacer height={25} />
        <TouchableOpacity
          onPress={() => {
            // log.error(Object.fromEntries(globalForm.formData));
            // log.info(JSON.stringify(filteredFields, null, 2));

            console.log(111111111);
            console.log(globalForm.formData);
          }}
        >
          <SemiBoldText title="Activate Plan" fontSize={21} />
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

        <FlatList
          data={currentFields}
          renderItem={({ item, index }) =>
            renderFormField(item, index, control)
          }
          scrollEnabled={false}
        />
        {keyboardVisible && (
          <>
            <View style={styles.innerButtonArea}>
              <CustomButton
                title={isLastPage ? 'Activate Plan' : 'Continue'}
                onPress={handleSubmit(onSubmit)}
                isLoading={loadingState.formVmLoading}
              />
              <PoweredByFooter />
            </View>
          </>
        )}
      </ScrollView>
      {!keyboardVisible && (
        <>
          <View style={styles.buttonArea}>
            <CustomButton
              title={isLastPage ? 'Activate Plan' : 'Continue'}
              onPress={handleSubmit(onSubmit)}
              isLoading={loadingState.formVmLoading}
            />
            <PoweredByFooter />
          </View>
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  content: {
    padding: 20,
  },

  infoBox: {
    backgroundColor: DynamicColors().lightPrimaryColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputField: {
    borderColor: CustomColors.greyTextColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  banner: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: DynamicColors().lightPrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  innerButtonArea: {
    paddingBottom: 20,
  },
};

export default SecondFormScreen;
//  {/* {isLoading && <Circle size={35} color={DynamicColors().primaryBrandColor} />} */}
