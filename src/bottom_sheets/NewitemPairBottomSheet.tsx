import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import { ProductDetailsModel } from '../models/ProductDetailsModel';
import { SemiBoldText } from '../components/CustomText';
import XMark from '../assets/icons/x_mark.svg';
import DeleteIcon from '../assets/icons/delete-icon.svg';

import { VerticalSpacer } from '../components/Spacer';
import CustomButton from '../components/CustomButton';
import { CustomColors } from '../constants/CustomColors';
import BuildFormFieldWidget from '../screens/purchase/form/components/BuildFormFieldWidget';
import type { FormStore } from '../store/formStore';
import type {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormTrigger,
} from 'react-hook-form';
import { FormFieldModel } from '../models/FormFieldModel';

interface NewItemPairBottomSheetProps {
  isVisible: boolean;
  isLoading?: boolean;
  // modalHeight?: number;
  // showButtons?: boolean;
  // buttonColor?: string;
  // title: string;
  // okText?: string;
  // content: React.ReactNode;
  onClose: () => void;
  // onOkPressed?: () => void;
  // loadStore: LoadStore;
  // field: any;
  field: FormFieldModel;
  productDetails: ProductDetailsModel | null;

  control: Control<FieldValues, any>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  trigger: UseFormTrigger<FieldValues>;
  globalForm: FormStore;
}

const { height } = Dimensions.get('window');

export const NewItemPairBottomSheet: React.FC<NewItemPairBottomSheetProps> = ({
  isVisible,
  isLoading,
  onClose,
  field,
  productDetails,
  control,
  handleSubmit,
  trigger,
  globalForm,
}) => {
  useEffect(() => {
    if (globalForm.globalItemList.length > 0) {
      // Sync the formData with the latest globalItemList
      globalForm.setFormData(field.name ?? '', globalForm.globalItemList);
      globalForm.resetGlobalItemPair();
      globalForm.resetTempImagePlaceholder();
    }
  }, [globalForm.globalItemList]); // Dependency array watches for changes in globalItemList

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <SemiBoldText title={'Add Item'} fontSize={17} />
          <TouchableOpacity
            onPress={() => {
              globalForm.resetGlobalItemPair();
              globalForm.resetTempImagePlaceholder();
              return onClose();
            }}
          >
            <XMark />
            {/* <Text style={styles.closeButton}>X</Text> */}
          </TouchableOpacity>
        </View>

        <VerticalSpacer height={10} />

        <ScrollView
          showsVerticalScrollIndicator={false} // This will hide the vertical scroll bar
          showsHorizontalScrollIndicator={false} // This will hide the horizontal scroll bar if applicable
          style={[styles.keyBenefits]}
        >
          <View
          // style={[styles.bottomSheet]}
          >
            {/* Render first two fields side-by-side, then others in a list */}
            {/* <View style={styles.rowContainer}>
              <View key={field.name} style={styles.halfWidth}>
                {field.childData
                  ?.slice(0, 2)
                  .map((childField: FormFieldModel, childIndex: number) => (
                    <BuildFormFieldWidget
                      key={childField.name || childIndex}
                      globalForm={globalForm}
                      field={childField} // Pass the child field here
                      isLastPage={false}
                      shouldFetchPrice={false}
                      filteredFieldsLength={field.childData?.length} // Use length of childData
                      control={control}
                      trigger={trigger}
                      handleSubmit={handleSubmit}
                      productDetails={productDetails}
                      onClearFocus={() => {
                        if (Keyboard.isVisible()) {
                          Keyboard.dismiss();
                        }
                      }}
                    />
                  ))}
              </View>
            </View> */}

            {/* <View style={styles.rowContainer}>
              <View key={field.name} style={styles.halfWidth}>
                {field.childData
                  ?.slice(0, 2)
                  .map((childField: FormFieldModel, childIndex: number) => (
                    <BuildFormFieldWidget
                      key={childField.name || childIndex}
                      globalForm={globalForm}
                      field={childField} // Pass the child field here
                      isLastPage={false}
                      shouldFetchPrice={false}
                      filteredFieldsLength={field.childData?.length} // Use length of childData
                      control={control}
                      trigger={trigger}
                      handleSubmit={handleSubmit}
                      productDetails={productDetails}
                      onClearFocus={() => {
                        if (Keyboard.isVisible()) {
                          Keyboard.dismiss();
                        }
                      }}
                    />
                  ))}
              </View>
            </View> */}
            {/* <View style={{flex: 1}}>
              <FlatList
                data={field.childData?.slice(0, 2)} // Display only the first two childData elements
                keyExtractor={(item: FormFieldModel, index: number) =>
                  item.name || index.toString()
                } // Use a unique key
                horizontal={true} // This ensures the items are laid out in a row
                renderItem={({
                  item,
                  index,
                }: {
                  item: FormFieldModel;
                  index: number;
                }) => (
                  <View style={{flex: 1}}>
                    <BuildFormFieldWidget
                      globalForm={globalForm}
                      field={item} // Pass the sliced child field here
                      isLastPage={false}
                      shouldFetchPrice={false}
                      filteredFieldsLength={field.childData?.length} // Length of childData
                      control={control}
                      trigger={trigger}
                      handleSubmit={handleSubmit}
                      productDetails={productDetails}
                      onClearFocus={() => {
                        if (Keyboard.isVisible()) {
                          Keyboard.dismiss();
                        }
                      }}
                    />
                  </View>
                )}
                showsHorizontalScrollIndicator={false} // Hides the scroll indicator if it's not needed
              />
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {field.childData?.slice(0, 2).map((field, index) => (
                <View
                  key={index}
                  style={{ flex: 1, marginRight: index === 0 ? 20 : 0 }}
                >
                  <BuildFormFieldWidget
                    key={field.name || index}
                    globalForm={globalForm}
                    field={field} // Pass the child field here
                    isLastPage={false}
                    shouldFetchPrice={false}
                    filteredFieldsLength={field.childData?.length} // Use length of childData
                    control={control}
                    trigger={trigger}
                    handleSubmit={handleSubmit}
                    shouldUseGlobalItemPair={true}
                    productDetails={productDetails}
                  />
                </View>
              ))}
            </View>

            <FlatList
              data={field.childData?.slice(2)} // Displaying childData after the first two
              keyExtractor={(item: FormFieldModel, index: number) =>
                item.name || item.id || index.toString()
              } // Ensure a valid string is returned for keyExtractor
              renderItem={({ item }: { item: FormFieldModel }) => (
                <BuildFormFieldWidget
                  globalForm={globalForm}
                  field={item} // Pass the current child field (item) to the widget
                  isLastPage={false}
                  shouldFetchPrice={false}
                  filteredFieldsLength={field.childData?.length} // Length of the remaining child fields
                  control={control}
                  trigger={trigger}
                  shouldUseGlobalItemPair={true}
                  handleSubmit={handleSubmit}
                  productDetails={productDetails}
                  // onClearFocus={() => {
                  //   if (Keyboard.isVisible()) {
                  //     Keyboard.dismiss();
                  //   }
                  // }}
                />
              )}
              ListEmptyComponent={<Text></Text>} // Handle case when no childData is present
            />

            {/* <FlatList
              data={fields.slice(2)} // Displaying fields after the first two
              keyExtractor={(item: FormFieldModel, index: number) =>
                item.name || item.id || index.toString()
              } // Ensure a valid string is returned
              renderItem={({item}: {item: FormFieldModel}) => (
                <BuildFormFieldWidget
                  globalForm={globalForm}
                  field={item} // Pass the current field (item) to the widget
                  isLastPage={false}
                  shouldFetchPrice={false}
                  filteredFieldsLength={fields.length} // Length of the remaining fields
                  control={control}
                  trigger={trigger}
                  handleSubmit={handleSubmit}
                  productDetails={productDetails}
                  onClearFocus={() => {
                    if (Keyboard.isVisible()) {
                      Keyboard.dismiss();
                    }
                  }}
                />
              )}
            /> */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Add"
                onPress={handleSubmit(() => {
                  // globalForm.updateGlobalItemList(globalForm.globalItemPair);
                  // globalForm.setFormData(
                  //   field.name ?? '',
                  //   globalForm.globalItemList,
                  // );
                  globalForm.updateGlobalItemList(globalForm.globalItemPair);

                  // Use functional update to ensure immediate update of formData
                  // globalForm.updateSetFormData(
                  //   field.name ?? '',
                  //   prevFormData => {
                  //     return {
                  //       ...prevFormData,
                  //       [field.name ?? '']: [
                  //         ...(prevFormData[field.name ?? ''] || []),
                  //         ...globalForm.globalItemList,
                  //       ],
                  //     };
                  //   },
                  // );
                  // globalForm.resetGlobalItemPair();
                  // globalForm.resetTempImagePlaceholder();

                  // onClose();

                  // JSON.stringify(field.childData, null, 2);
                })}
              />
            </View>

            {Array.isArray(globalForm.formData[field.name ?? '']) &&
            globalForm.formData[field.name ?? ''].length > 0 ? (
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginVertical: 12,
                    fontFamily: 'metropolis_medium',
                  }}
                >
                  Items
                </Text>
                <FlatList
                  data={globalForm.formData[field.name ?? '']}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    function deleteItem() {
                      // Remove the item from the formData array
                      globalForm.removeItemGlobalItemList(index);
                      globalForm.setFormData(
                        field.name ?? '',
                        globalForm.globalItemList
                      );

                      // const updatedList = [...globalForm.formData[field.name ?? '']];
                      // updatedList.splice(index, 1); // Remove the item by index
                      // // Update the global form data with the new list
                      // globalForm.setFormData(prev => ({
                      //   ...prev,
                      //   [field.name]: updatedList,
                      // }));
                    }

                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderRadius: 6,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          backgroundColor: '#F4F3FF',
                          marginVertical: 2,
                        }}
                      >
                        {Object.entries(item).map(([key, value]) => (
                          <View key={key} style={{ marginRight: 10 }}>
                            <Text
                              style={{
                                fontFamily: 'metropolis_regular',
                                color: '#667085',
                                fontSize: 12,
                                marginBottom: 5,
                              }}
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Text>
                            {/* <Text style={{fontFamily: 'metropolis_regular'}}>
                              {key.toLowerCase().includes('amount') ||
                              key.toLowerCase().includes('value')
                                ? `N ${value}`
                                : value}
                            </Text> */}
                            <View style={{ flex: 1, maxWidth: 100 }}>
                              <Text
                                style={{ fontFamily: 'metropolis_regular' }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {key.toLowerCase().includes('amount') ||
                                key.toLowerCase().includes('value')
                                  ? `N ${String(value)}` // Convert value to string
                                  : String(value)}{' '}
                                {/* Ensure value is a string */}
                              </Text>
                            </View>
                          </View>
                        ))}

                        <View style={{ flex: 1 }} />
                        <Pressable onPress={deleteItem} style={{ padding: 6 }}>
                          {/* Replace DeleteIcon with your icon */}
                          {/* <Text style={{fontSize: 16, color: 'red'}}>🗑️</Text> */}
                          <DeleteIcon
                            width={22}
                            height={22}
                            fill={CustomColors.redColor}
                          />
                        </Pressable>
                      </View>
                    );
                  }}
                />
              </View>
            ) : isLoading ? (
              <View
                style={{
                  zIndex: 2,
                  flex: 1,
                  height: '100%',
                  width: '100%',
                  marginTop: '6%',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: colorGreyOverlay,
                }}
              >
                <ActivityIndicator style={{ margin: 12 }} animating={true} />
                <Text
                  style={{
                    fontFamily: 'metropolis_medium',
                    margin: 12,
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  {' '}
                  Uploading Image...{' '}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 25,
    maxHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 18,
    color: '#000',
  },
  productDetailsContainer: {
    marginBottom: 20,
  },
  keyBenefits: {
    // flex: 1,
    height: height,
    // minHeight: 50, // You can set a minimum height
    // maxHeight: 800, // Set the maximum height
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,

    marginLeft: 150,
  },
  goBackButton: {
    flex: 1,
    marginRight: 10,
  },
  continueButton: {
    flex: 2,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  halfWidth: {
    width: '48%',
  },
  // bottomSheet: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderTopLeftRadius: 15,
  //   borderTopRightRadius: 15,
  //   maxHeight: '80%',
  // },
});

export default NewItemPairBottomSheet;
