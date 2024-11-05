// components/CustomItemPairWidget.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { type FormStore, useFormStore } from '../../../../store/formStore';
import { StringUtils } from '../../../../utils/StringUtils';
import { CustomColors } from '../../../../constants/CustomColors';
import NewItemPairBottomSheet from '../../../../bottom_sheets/NewitemPairBottomSheet';
import {
  HorizontalSpacer,
  VerticalSpacer,
} from '../../../../components/Spacer';
import {
  RegularText,
  SemiBoldText,
  W500Text,
} from '../../../../components/CustomText';
import type {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';

interface CustomItemPairWidgetProps {
  field: any; // Expecting a FormFieldModel-like object
  control: Control<FieldValues, any>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  trigger: UseFormTrigger<FieldValues>;
  globalForm: FormStore;
}

const CustomItemPairWidget: React.FC<CustomItemPairWidgetProps> = ({
  field,
  control,
  handleSubmit,
  trigger,
  globalForm,
}) => {
  // const CustomItemPairWidget: React.FC = () => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const formData = useFormStore((state) => state.formData);
  const selectedProductCategory = useFormStore(
    (state) => state.selectedProductCategory
  );
  const selectedProductDetails = useFormStore(
    (state) => state.selectedProductDetails
  );
  selectedProductCategory;
  // const field = {
  //   id: 'e11e6084-10df-490f-98d7-97e3841937c7',
  //   description: 'Cargo Details',
  //   name: 'cargo_details',
  //   label: 'Cargo Details',
  //   position: 11,
  //   fullDescription: 'Cargo Details',
  //   dataType: 'array',
  //   inputType: 'text',
  //   isCurrency: false,
  //   showFirst: false,
  //   required: true,
  //   hasChild: true,
  //   childData: [
  //     {
  //       min: 3,
  //       name: 'description',
  //       label: 'Item description',
  //       position: 1,
  //       required: true,
  //       dataType: 'string',
  //       errorMsg: 'Please provide an item description',
  //       inputType: 'text',
  //       productId: '252c66de-6e87-4109-a515-83ee142fe70c',
  //       showFirst: true,
  //       dataSource: 'user_defined',
  //       description: 'Item description',
  //       formFieldId: '1',
  //       fullDescription: 'Item description',
  //       minMaxConstraint: 'length',
  //     },
  //     {
  //       name: 'value',
  //       label: 'Item value',
  //       position: 2,
  //       required: true,
  //       dataType: 'number',
  //       errorMsg: 'Please provide a valid amount',
  //       inputType: 'number',
  //       productId: '252c66de-6e87-4109-a515-83ee142fe70c',
  //       showFirst: true,
  //       dataSource: 'user_defined',
  //       description: 'Item value',
  //       isCurrency: true,
  //       formFieldId: '1',
  //       fullDescription: 'Item value',
  //     },
  //     {
  //       name: 'quantity',
  //       label: 'Item quantity',
  //       position: 3,
  //       required: true,
  //       dataType: 'number',
  //       errorMsg: 'Please provide a valid quantity',
  //       inputType: 'number',
  //       productId: '252c66de-6e87-4109-a515-83ee142fe70c',
  //       showFirst: true,
  //       dataSource: 'user_defined',
  //       description: 'Item quantity',
  //       multiplyBy: true,
  //       formFieldId: '1',
  //       fullDescription: 'Item quantity',
  //     },
  //     {
  //       name: 'image',
  //       label: 'Upload item image',
  //       position: 4,
  //       required: true,
  //       dataType: 'string',
  //       errorMsg: 'Please provide a valid image url',
  //       inputType: 'file',
  //       productId: '252c66de-6e87-4109-a515-83ee142fe70c',
  //       showFirst: true,
  //       dataSource: 'user_defined',
  //       description: 'Item image',
  //       formFieldId: '1',
  //       fullDescription: 'Item image',
  //     },
  //   ],
  //   errorMsg: 'Please provide cargo details',
  //   dataSource: 'user_defined',
  //   dataUrl: null,
  //   dependsOn: 'cargo_value',
  //   min: 5,
  //   max: null,
  //   minMaxConstraint: 'length',
  //   createdAt: new Date('2023-02-14T12:26:39.933Z'),
  //   updatedAt: new Date('2023-02-14T12:26:39.933Z'),
  //   deletedAt: null,
  //   formFieldId: '1',
  //   productId: '252c66de-6e87-4109-a515-83ee142fe70c',
  //   formField: {
  //     id: '1',
  //     name: 'Input',
  //     label: 'Input form field',
  //     createdAt: new Date('2022-07-28T18:15:53.581Z'),
  //     updatedAt: new Date('2022-07-28T18:15:53.581Z'),
  //     deletedAt: null,
  //   },
  // } as const;

  // Calculate total based on selected items in formData
  // const selectedItems = formData[field.name] || [];
  // const selectedItemsCount = selectedItems.length;
  //   const totalValue = selectedItems.reduce(
  //     (sum: number, item) => sum + (item.value ?? 0) * (item.quantity ?? 1),
  //     0,
  //   );

  //   const totalValue = selectedItems.reduce(
  //     (sum: number, item: {value?: number; quantity?: number}) =>
  //       sum + (item.value ?? 0) * (item.quantity ?? 1),
  //     0,
  //   );

  // const totalValue = '1000';

  const totalValue = (formData[field.name] || []).reduce(
    (sum: number, item: Record<string, any>) => {
      const hasValue = 'value' in item; // Check if value exists in the object
      if (hasValue) {
        const value = item.value ?? 0; // Use value or default to 0
        const quantity = item.quantity ?? 1; // Use quantity or default to 1
        return sum + value * quantity; // Multiply value by quantity and add to sum
      }
      // If no value or quantity, just increment by 1 for each item in the list
      return sum + 1;
    },
    0 // Initial sum value
  );

  // const totalValue = (formData[field.name] || []).reduce(
  //   (sum: number, item: Record<string, any>) => {
  //     const value = item.value ?? 0; // Default to 0 if value is undefined
  //     const quantity = item.quantity ?? 1; // Default to 1 if quantity is undefined
  //     return sum + value * quantity; // Multiply value by quantity and add to sum
  //   },
  //   0, // Initial sum value
  // );

  // const totalValue = Array.isArray(formData[field.name])
  //   ? formData[field.name].reduce(
  //       (sum: number, item: Record<string, any>) => {
  //         const value = item.value ?? 0; // Default to 0 if value is undefined
  //         const quantity = item.quantity ?? 1; // Default to 1 if quantity is undefined
  //         return sum + value * quantity; // Multiply value by quantity and add to sum
  //       },
  //       0, // Initial sum value
  //     )
  //   : 0; // If formData[field.name] is not an array, return 0

  const dependsOnValue = formData[field.dependsOn] || 0;

  return (
    <View style={styles.container}>
      {/* Open Bottom Sheet on Tap */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          // console.log(formData[field.name].length);
          return setBottomSheetVisible(true);
        }}
      >
        {/* <Text style={styles.label}></Text> */}
        <View style={styles.row}>
          <SemiBoldText title={field.label ?? ''} fontSize={17} />
          <HorizontalSpacer width={5} />
          <SemiBoldText
            title={`${dependsOnValue > 10 ? '₦' : ''} ${
              StringUtils.formatPriceWithComma(totalValue) ?? 0
            } / ${
              dependsOnValue > 10 ? '₦' : ''
            }${StringUtils.formatPriceWithComma(dependsOnValue)}`}
            fontSize={17}
          />
        </View>

        <View style={styles.valueContainer}>
          {/* {selectedItemsCount > 0 ? (
            <Text style={styles.selectedText}>
              {`${selectedItemsCount} item${
                selectedItemsCount > 1 ? 's' : ''
              } selected `}
              (₦{StringUtils.formatPriceWithComma(totalValue)} / ₦
              {StringUtils.formatPriceWithComma(dependsOnValue)})
            </Text>
          ) : (
            <Text style={styles.placeholder}>{field.description ?? ''}</Text>
          )} */}
          {/* <Text style={styles.placeholder}>{field.description ?? ''}</Text> */}
          <W500Text
            title={field.description ?? ''}
            color={CustomColors.formHintColor}
          />
          <Text style={styles.icon}>📅</Text>
        </View>
      </TouchableOpacity>

      <VerticalSpacer height={30} />
      {Array.isArray(globalForm.formData[field.name ?? '']) &&
      globalForm.formData[field.name ?? ''].length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            horizontal={true} // Use vertical scrolling
            data={globalForm.formData[field.name ?? '']}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item, index }) => {
              function deleteItem() {
                // Remove the item from the formData array
                globalForm.removeItemGlobalItemList(index);
                globalForm.setFormData(
                  field.name ?? '',
                  globalForm.globalItemList
                );
              }

              // Get the first key-value pair from the item
              // const firstKey = Object.keys(item)[0];
              // const firstValue = item[firstKey];

              const nameKey = Object.keys(item).find((key) =>
                key.toLowerCase().includes('name')
              );

              // If a "name" field exists, use it as firstValue; otherwise, use the firstKey's value
              const firstKey = Object.keys(item)[0];
              const firstValue = nameKey ? item[nameKey] : item[firstKey ?? ''];

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    backgroundColor: CustomColors.blackColor,
                    marginHorizontal: 5,
                    marginBottom: 10,
                  }}
                >
                  <SemiBoldText
                    title={firstValue}
                    color={CustomColors.whiteColor}
                    fontSize={16.5}
                  />
                  <HorizontalSpacer width={6} />
                  <View style={{ flex: 1 }} />

                  <Pressable onPress={deleteItem} style={{ padding: 6 }}>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Text style={{color: '#000', fontSize: 16}}>✖</Text> */}
                      <RegularText
                        title="✖"
                        color={CustomColors.blackColor}
                        fontSize={10}
                      />
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <></>
      )}

      {/* Bottom Sheet Modal */}

      <NewItemPairBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        // isLoading={false}
        // onContinue={() => {}}
        // productCategory={selectedProductCategory}
        productDetails={selectedProductDetails}
        field={field}
        globalForm={globalForm}
        handleSubmit={handleSubmit}
        control={control}
        trigger={trigger}
      />
      {/* <ItemPairBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        fields={field.childData ?? []}
        productDetails={null} // Add product details if needed
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: CustomColors.formTitleColor,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputContainer: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 5,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    padding: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 14,
    color: CustomColors.blackColor,
    fontWeight: '500',
  },
  placeholder: {
    fontSize: 13,
    color: CustomColors.formHintColor,
  },
  icon: {
    fontSize: 20,
    color: CustomColors.formHintColor,
  },
});

export default CustomItemPairWidget;
