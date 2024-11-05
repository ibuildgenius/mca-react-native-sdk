import React, { useState, useEffect } from 'react';
import type { FormStore } from '../../../../store/formStore';
import CustomBooleanDropdownField from './CustomBooleanDropdownField';

import CustomDatePicker from './CustomDatePicker';
import CustomImagePicker from './CustomImagePicker';

import CustomFormTextField from '../../../../components/customFormTextField';
import { CustomValidator } from '../../../../utils/CustomValidator';
import {
  type Control,
  Controller,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormTrigger,
} from 'react-hook-form';
import customLog from '../../../../utils/logger';
import { RegularText } from '../../../../components/CustomText';
import { CustomColors } from '../../../../constants/CustomColors';
import { VerticalSpacer } from '../../../../components/Spacer';
import CustomDropdownField from './CustomDropdownField';
import { ProductDetailsModel } from '../../../../models/ProductDetailsModel';
import { FormViewModel } from '../FormViewModel';
import { type LoadStore, useLoadStore } from '../../../../store/loadStore';
import CustomItemPairWidget from './CustomItemPair';
import CustomImageUploader from './CustomImageUploader';

type BuildFormFieldWidgetProps = {
  field: any;
  globalForm: FormStore;

  filteredFieldsLength?: number;

  isLastPage?: boolean;
  shouldFetchPrice?: boolean;
  shouldUseGlobalItemPair?: boolean;
  control: Control<FieldValues, any>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  trigger: UseFormTrigger<FieldValues>;
  productDetails: ProductDetailsModel | null;
};

const BuildFormFieldWidget: React.FC<BuildFormFieldWidgetProps> = ({
  field,
  globalForm,
  filteredFieldsLength,

  control,
  isLastPage = false,
  shouldFetchPrice = false,
  shouldUseGlobalItemPair = false,
  handleSubmit,
  trigger,
  productDetails,
}) => {
  // const globalForm = useFormStore(
  //   (state: FormStore) => state,
  // );

  // const [formData, setFormData] = useState<Map<string, any>>(new Map());
  const loadingState = useLoadStore((state: LoadStore) => state);
  // const [, setRefresh] = useState(0);

  // const refreshState = () => {
  //   setRefresh((prev) => prev + 1);
  // };
  const formVM = FormViewModel();
  useForm();
  const [debounceTimer, _setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // const updateFormData = (key: string, value: any) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [key]: value,
  //   }));
  // };

  // const replaceFormData = (newFormData: Map<string, any>) => {
  //   setFormData(newFormData);
  // };

  // useEffect(() => {
  //   console.log('first');
  //   console.log(Object.keys(globalForm.formData).length);
  //   // console.log(first)
  //   console.log(globalForm.formData.length);
  //   console.log(filteredFieldsLength);
  //   if (debounceTimer) {
  //     clearTimeout(debounceTimer);
  //   }

  //   if (filteredFieldsLength && formVM && isLastPage) {
  //     // log.debug(Object.keys(Object.fromEntries(globalForm.formData)).length);
  //     log.debug(filteredFieldsLength);
  //     const timer = setTimeout(() => {
  //       if (
  //         // true

  //         Object.keys(globalForm.formData).length - 1 ===
  //         filteredFieldsLength
  //       ) {
  //         log.debug('HERERRERERE', formData);
  //         formVM.fetchProductPrice(loadingState, productDetails?.id ?? '');
  //       }
  //     }, 1000);
  //   }
  // }, [globalForm.formData]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Only set the timer if necessary conditions are met
    if (filteredFieldsLength && formVM && isLastPage && shouldFetchPrice) {
      customLog.debug(filteredFieldsLength);

      const debounceTimer = setTimeout(async () => {
        if (
          Object.keys(globalForm.formData).length - 1 ===
          filteredFieldsLength
        ) {
          const isValid = await trigger();
          if (isValid) {
            customLog.debug('HERERRERERE', globalForm.formData);
            formVM.fetchProductPrice(loadingState, productDetails?.id ?? '');
          }
        }
      }, 1000); // Set debounce time in milliseconds (1000ms = 1s)

      // Clean up timer when the component re-renders or unmounts
      return () => clearTimeout(debounceTimer);
    }

    return undefined;
  }, [globalForm.formData]);

  const handleChange = async (value: any) => {
    globalForm.setProductPrice(0);

    try {
      if (field.dataType === 'number') {
        if (shouldUseGlobalItemPair) {
          const parsedValue = parseInt(value.replace(',', ''), 10);
          globalForm.setGlobalItemPair(field.name, parsedValue);
        } else {
          const parsedValue = parseInt(value.replace(',', ''), 10);
          globalForm.setFormData(field.name, parsedValue);
        }
      } else {
        if (shouldUseGlobalItemPair) {
          globalForm.setGlobalItemPair(field.name, value.trim());
        } else {
          globalForm.setFormData(field.name, value.trim());
          setTimeout(() => {
            console.log(globalForm.formData);
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (field.dataType === 'boolean') {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue={null} // Or whatever the initial value should be
        rules={{
          required: field.required ? `${field.label} field is required` : false,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <CustomBooleanDropdownField
              fieldName={field.name}
              label={field.label}
              placeholder={field.description}
              onSelect={(selectedValue) => {
                onChange(selectedValue); // Update form state with selected value
              }}
              // value={value} // Pass the current form value
            />
            {error && (
              <>
                <VerticalSpacer height={2} />
                <RegularText
                  title={error.message ?? ''}
                  fontSize={13}
                  color={CustomColors.redColor}
                />
              </>
            )}
            <VerticalSpacer height={23} />
          </>
        )}
      />

      // <CustomBooleanDropdownField
      //   fieldName={field.name}
      //   label={field.label}
      //   placeholder={field.description}
      //   // filteredFieldsLength={filteredFieldsLength}
      //   // formVM={formVM}
      //   // formKey={formKey}
      //   // isLastPage={isLastPage}
      // />
    );
  } else if (field.dataUrl) {
    if (field.dataType === 'boolean') {
      return (
        <Controller
          control={control}
          name={field.name}
          defaultValue={null} // Or whatever the initial value should be
          rules={{
            required: field.required ? `${field.label} is required` : false,
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <CustomBooleanDropdownField
                fieldName={field.name}
                label={field.label}
                placeholder={field.description}
                onSelect={(selectedValue) => {
                  onChange(selectedValue); // Update form state with selected value
                }}
                // value={value} // Pass the current form value
              />
              {error && (
                <>
                  <VerticalSpacer height={2} />
                  <RegularText
                    title={error.message ?? ''}
                    fontSize={13}
                    color={CustomColors.redColor}
                  />
                </>
              )}
              <VerticalSpacer height={23} />
            </>
          )}
        />

        // <CustomBooleanDropdownField
        //   fieldName={field.name}
        //   label={field.label}
        //   placeholder={field.description}
        //   // filteredFieldsLength={filteredFieldsLength}
        //   // formVM={formVM}
        //   // formKey={formKey}
        //   // isLastPage={isLastPage}
        // />
      );
    } else if (field.dataType === 'boolean') {
      return (
        <Controller
          control={control}
          name={field.name}
          defaultValue={null} // Or whatever the initial value should be
          rules={{
            required: field.required ? `${field.label} is required` : false,
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <CustomBooleanDropdownField
                fieldName={field.name}
                label={field.label}
                placeholder={field.description}
                onSelect={(selectedValue) => {
                  onChange(selectedValue); // Update form state with selected value
                }}
                // value={value} // Pass the current form value
              />
              {error && (
                <>
                  <VerticalSpacer height={2} />
                  <RegularText
                    title={error.message ?? ''}
                    fontSize={13}
                    color={CustomColors.redColor}
                  />
                </>
              )}
              <VerticalSpacer height={23} />
            </>
          )}
        />

        // <CustomBooleanDropdownField
        //   fieldName={field.name}
        //   label={field.label}
        //   placeholder={field.description}
        // />
      );
    } else {
      // if (field.required && !formData.hasOwnProperty(field.name)) {
      //   globalForm.setFormErrors(field.name, 'This is a required field');
      // }

      return (
        <Controller
          control={control}
          name={field.name}
          defaultValue={null} // or whatever your initial value should be
          rules={{
            required: `${field.label} is required`,
            //  field.required ? 'This field is required'
            // : false,
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <CustomDropdownField
                fieldName={field.name}
                label={field.label}
                placeholder={field.description}
                dataUrl={field.dataUrl}
                // description={field.description}
                shouldUseGlobalItemPair={shouldUseGlobalItemPair}
                onSelect={(selectedValue) => {
                  onChange(selectedValue); // Update form state
                }}
                // newvalue={value} // Pass current value
              />
              {error && (
                <>
                  <VerticalSpacer height={2} />
                  <RegularText
                    title={error.message ?? ''}
                    fontSize={13}
                    color={CustomColors.redColor}
                  />
                </>
              )}
              <VerticalSpacer height={23} />
            </>
          )}
        />

        // <CustomDropdownField
        //   fieldName={field.name}
        //   label={field.label}
        //   placeholder={field.description}
        //   dataUrl={field.dataUrl}
        //   description={field.description}
        // />
      );
    }
  } else if (field.inputType === 'date') {
    // if (field.required && !formData.hasOwnProperty(field.name)) {
    //   globalForm.setFormErrors(field.name, 'This is a required field');
    // }
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue={null} // or whatever your initial date value should be
        rules={{
          required: field.required ? `${field.label} is required` : false,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <CustomDatePicker
              fieldName={field.name}
              label={field.label}
              description={field.description}
              min={field.min ?? 0}
              onDateSelected={(date) => {
                onChange(date); // Update form state
              }}
              // value={value} // Pass the current form value
              shouldUseGlobalItemPair={shouldUseGlobalItemPair}
            />
            {error && (
              <>
                <VerticalSpacer height={2} />
                <RegularText
                  title={error.message ?? ''}
                  fontSize={13}
                  color={CustomColors.redColor}
                />
              </>
            )}
            <VerticalSpacer height={23} />
          </>
        )}
      />

      // <CustomDatePicker
      //   fieldName={field.name}
      //   label={field.label}
      //   description={field.description}
      //   min={field.min ?? 0}
      //   customProvider={customProvider}
      //   filteredFieldsLength={filteredFieldsLength}
      //   formVM={formVM}
      //   formKey={formKey}
      //   isLastPage={isLastPage}
      // />
    );
  } else if (field.inputType === 'file') {
    // if (field.required && !formData.hasOwnProperty(field.name)) {
    //   globalForm.setFormErrors(field.name, 'This is a required field');
    // }
    return shouldUseGlobalItemPair ? (
      <CustomImageUploader
        fieldName={field.name}
        label={field.label}
        // description={field.description}
        // required={field.required ?? false}
      />
    ) : (
      <Controller
        control={control}
        name={field.name}
        defaultValue={null} // or whatever you want as the default value
        rules={{
          required: field.required ? `${field.label} is required` : false,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <CustomImagePicker
              fieldName={field.name}
              label={field.label}
              // description={field.description}
              // required={field.required ?? false}
              onImageSelected={(fileData) => {
                onChange(fileData); // update form value
                handleChange(fileData); // optional: call your handleChange function
              }}
              onImageRemoved={() => {
                onChange(null); // clear form value
              }}
              // value={value} // pass current value if needed
            />
            {error && (
              <>
                <VerticalSpacer height={2} />
                <RegularText
                  title={error.message ?? ''}
                  fontSize={13}
                  color={CustomColors.redColor}
                />
              </>
            )}
            <VerticalSpacer height={23} />
          </>
        )}
      />

      // <CustomImagePicker
      //   fieldName={field.name}
      //   label={field.label}
      //   description={field.description}
      //   required={field.required ?? false}
      // />
    );
  } else if (field.hasChild != null && field.hasChild!) {
    return (
      <CustomItemPairWidget
        field={field}
        control={control}
        handleSubmit={handleSubmit}
        trigger={trigger}
        globalForm={globalForm}
      />
    );
  } else {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue={
          shouldUseGlobalItemPair
            ? `${globalForm.globalItemPair[field.name] || ''}`
            : null
        }
        // defaultValue=""
        rules={{
          validate: (value) =>
            CustomValidator.generalValidator({
              value,
              name: field.name,
              label: field.label,
              dataType: field.dataType,
              inputType: field.inputType,
              minMaxConstraint: field.minMaxConstraint,
              errorMsg: field.errorMsg,
              min: field.min,
              max: field.max,
              required: field.required,
            }),
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomFormTextField
              name={field.name}
              title={field.label}
              hintText={field.description}
              readOnly={field.inputType === 'date'}
              isNumber={field.dataType === 'number'}
              isCurrency={field.isCurrency === true}
              onChanged={(val) => {
                if (shouldUseGlobalItemPair) {
                  console.log(111111);
                  console.log(globalForm.globalItemPair[field.name]);
                }
                onChange(val);
                handleChange(val);
              }}
              value={
                shouldUseGlobalItemPair
                  ? globalForm.globalItemPair[field.name]
                  : value
              }
              // control={control}
            />
            {error && (
              <>
                <VerticalSpacer height={2} />
                <RegularText
                  title={error.message ?? ''}
                  fontSize={13}
                  color={CustomColors.redColor}
                />
              </>
            )}

            <VerticalSpacer height={23} />
          </>
        )}
      />
    );
  }
};

export default BuildFormFieldWidget;
