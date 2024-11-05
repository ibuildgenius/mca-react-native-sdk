import { create } from 'zustand';
import { FormFieldModel } from '../models/FormFieldModel';
import { UssdProviderModel } from '../models/UssdProviderModel';
import { ProductCategoriesModel } from '../models/ProductCategoriesModel';
import { ProductDetailsModel } from '../models/ProductDetailsModel';
import { FormDataUrlResponse } from '../models/FormDataUrlResponse';
import { type FileData } from '../screens/purchase/form/components/CustomImagePicker';

export interface FormStoreState {
  formData: Record<string, any>;
  globalItemPair: Record<string, any>;

  urlFormData: Map<string, FormDataUrlResponse[]>;
  showFullScreenLoader: boolean;
  urlDependents: Map<string, FormFieldModel>;
  imageList: Array<Map<string, FileData>>;
  imagePlaceholder: Map<string, string>;
  tempImagePlaceholder: Map<string, string>;
  productPrice: number;
  autoValidate: boolean;
  selectedBank: UssdProviderModel | null;
  selectedProductCategory: ProductCategoriesModel | null;
  selectedProductDetails: ProductDetailsModel | null;
  globalItemList: Array<Record<string, any>>;

  formErrors: Map<string, any>;
  shouldValidateImageplusDrop: boolean;
}

export interface FormStoreActions {
  setFormData: (key: string, value: any) => void;
  updateSetFormData: (
    key: string,
    value: ((prevFormData: Record<string, any>) => Record<string, any>) | any
  ) => void;

  updateFormData: (newFormData: Record<string, any>) => void;

  setGlobalItemPair: (key: string, value: any) => void;

  setUrlFormData: (key: string, value: FormDataUrlResponse[]) => void;
  setUrlDependents: (key: string, value: FormFieldModel) => void;

  clearFormData: () => void;
  clearUrlFormData: () => void;

  setShowFullScreenLoader: (showFullScreenLoader: boolean) => void;
  setImageList: (key: string, fileData: FileData) => void;
  setImagePlaceholder: (key: string, value: string) => void;
  setTempImagePlaceholder: (key: string, value: string) => void;

  setProductPrice: (productPrice: number) => void;
  setAutoValidate: (autoValidate: boolean) => void;
  setSelectedBank: (selectedBank: UssdProviderModel | null) => void;

  setSelectedProductCategory: (
    selectedProductCategory: ProductCategoriesModel | null
  ) => void;

  setSelectedProductDetails: (
    selectedProductDetails: ProductDetailsModel | null
  ) => void;
  removeItemGlobalItemList: (index: number) => void;
  setGlobalItemList: (globalItemList: Array<Record<string, any>>) => void;
  updateGlobalItemList: (newItem: Record<string, any>) => void;
  newUpdateGlobalItemList: (newItem: Record<string, any>) => void;
  setFormErrors: (key: string, value: any) => void;
  removeFormError: (key: string) => void;

  clearFormErrors: () => void;
  clearGlobalItemPair: () => void;

  // New remove actions
  removeImageList: (key: string) => void;
  removeTempImagePlaceholder: (key: string) => void;
  removeImagePlaceholder: (key: string) => void;
  removeFormData: (key: string) => void;
  removeGlobalItemPair: (key: string) => void;

  setShouldValidateImageplusDrop: (
    shouldValidateImageplusDrop: boolean
  ) => void;

  // Reset functions
  resetFormData: () => void;
  resetUrlFormData: () => void;
  resetShowFullScreenLoader: () => void;
  resetUrlDependents: () => void;
  resetImageList: () => void;
  resetImagePlaceholder: () => void;
  resetTempImagePlaceholder: () => void;
  resetProductPrice: () => void;
  resetAutoValidate: () => void;
  resetSelectedBank: () => void;
  resetSelectedProductCategory: () => void;
  resetSelectedProductDetails: () => void;
  resetGlobalItemList: () => void;
  resetGlobalItemPair: () => void;
  resetFormErrors: () => void;
  resetShouldValidateImageplusDrop: () => void;
}

export interface FormStore extends FormStoreState, FormStoreActions {}

export const useFormStore = create<FormStore>((set) => ({
  formData: {} as Record<string, any>,
  globalItemPair: {} as Record<string, any>,
  urlFormData: new Map<string, FormDataUrlResponse[]>(),
  showFullScreenLoader: false,
  urlDependents: new Map<string, FormFieldModel>(),
  imageList: [] as Array<Map<string, FileData>>,
  imagePlaceholder: new Map<string, string>(),
  tempImagePlaceholder: new Map<string, string>(),
  productPrice: 0 as number,
  autoValidate: false,
  selectedBank: null as UssdProviderModel | null,
  selectedProductCategory: null as ProductCategoriesModel | null,
  selectedProductDetails: null as ProductDetailsModel | null,
  globalItemList: [] as Array<Record<string, any>>,
  formErrors: new Map<string, any>(),
  shouldValidateImageplusDrop: false,

  // New remove actions
  removeImageList: (key) =>
    set((state) => {
      const updatedImageList = state.imageList.map((map) => {
        map.delete(key); // remove the key from each map
        return map;
      });
      return { imageList: updatedImageList };
    }),
  removeImagePlaceholder: (key) =>
    set((state) => {
      state.imagePlaceholder.delete(key);
      return { imagePlaceholder: state.imagePlaceholder };
    }),
  removeTempImagePlaceholder: (key) =>
    set((state) => {
      state.tempImagePlaceholder.delete(key);
      return { tempImagePlaceholder: state.tempImagePlaceholder };
    }),
  removeFormData: (key) =>
    set((state) => {
      const updatedFormData = { ...state.formData };
      delete updatedFormData[key];
      return { formData: updatedFormData };
    }),

  removeItemGlobalItemList: (index: number) =>
    set((state) => {
      const updatedList = [...state.globalItemList]; // Copy current list
      updatedList.splice(index, 1); // Remove the item at the specified index
      return { globalItemList: updatedList }; // Return updated list
    }),

  //
  removeGlobalItemPair: (key) =>
    set((state) => {
      const updatedGlobalItemPair = { ...state.globalItemPair };
      delete updatedGlobalItemPair[key];
      return { globalItemPair: updatedGlobalItemPair };
    }),

  setFormData: (key: string, value: any) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedFormData = { ...state.formData, [key]: value };
      return { formData: updatedFormData };
    }),

  updateSetFormData: (key, value) =>
    set((state) => {
      const updatedFormData =
        typeof value === 'function'
          ? value(state.formData) // Functional update
          : { ...state.formData, [key]: value }; // Direct update

      return { formData: updatedFormData };
    }),

  // updateSetFormData: (
  //   key: string,
  //   value: ((prevFormData: Record<string, any>) => Record<string, any>) | any,
  // ) =>
  //   set((state: FormStoreState & FormStoreActions) => {
  //     // Check if value is a function, and call it with the current formData
  //     const updatedFormData =
  //       typeof value === 'function'
  //         ? value(state.formData) // If value is a function, pass current formData to it
  //         : {...state.formData, [key]: value}; // Otherwise, directly update formData

  //     return {formData: updatedFormData};
  //   }),

  updateFormData: (newFormData: Record<string, any>) =>
    set(() => {
      return { formData: newFormData };
    }),

  setGlobalItemPair: (key: string, value: any) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedGlobalItemPair = { ...state.globalItemPair, [key]: value };
      return { globalItemPair: updatedGlobalItemPair };
    }),

  setUrlFormData: (key: string, value: FormDataUrlResponse[]) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedUrlFormData = new Map(state.urlFormData);
      updatedUrlFormData.set(key, value);
      return { urlFormData: updatedUrlFormData };
    }),

  // setUrlDependents: (urlDependents: Map<string, FormFieldModel>) =>
  //   set(() => ({urlDependents})),

  setUrlDependents: (key: string, value: FormFieldModel) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedUrlDependents = new Map(state.urlDependents);
      updatedUrlDependents.set(key, value);
      return { urlDependents: updatedUrlDependents };
    }),

  clearFormData: () =>
    set(() => {
      return { formData: new Map<string, any>() };
    }),
  // Renamed function to clear the urlFormData map
  clearUrlFormData: () =>
    set(() => {
      return { urlFormData: new Map<string, FormDataUrlResponse[]>() };
    }),

  // setGlobalItemPair: (key: string, value: any) =>
  //   set((state: FormStoreState & FormStoreActions) => {
  //     const updatedGlobalItemPair = new Map(state.globalItemPair);
  //     updatedGlobalItemPair.set(key, value);
  //     return {globalItemPair: updatedGlobalItemPair};
  //   }),

  setFormErrors: (key: string, value: any) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedFormErrors = new Map(state.formErrors);
      updatedFormErrors.set(key, value);
      return { formErrors: updatedFormErrors };
    }),

  removeFormError: (key: string) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedFormErrors = new Map(state.formErrors);
      updatedFormErrors.delete(key); // Remove the error associated with the key
      return { formErrors: updatedFormErrors };
    }),

  // Function to clear the globalItemPair map
  clearGlobalItemPair: () =>
    set(() => {
      return { globalItemPair: new Map<string, any>() };
    }),

  // Function to clear the formErrors map
  clearFormErrors: () =>
    set(() => {
      return { formErrors: new Map<string, any>() };
    }),

  setShowFullScreenLoader: (showFullScreenLoader: boolean) =>
    set(() => ({ showFullScreenLoader })),

  setImageList: (key: string, fileData: FileData) =>
    set((state: FormStoreState & FormStoreActions) => {
      // Create a new map entry with the key and fileData
      const newEntry = new Map<string, FileData>();
      newEntry.set(key, fileData);

      const updatedImageList = [...state.imageList, newEntry];

      return { imageList: updatedImageList };
    }),

  setImagePlaceholder: (key: string, value: string) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedImagePlaceholder = new Map(state.imagePlaceholder);
      updatedImagePlaceholder.set(key, value); // Set the key-value pair
      return { imagePlaceholder: updatedImagePlaceholder };
    }),

  setTempImagePlaceholder: (key: string, value: string) =>
    set((state: FormStoreState & FormStoreActions) => {
      const updatedTempImagePlaceholder = new Map(state.tempImagePlaceholder);
      updatedTempImagePlaceholder.set(key, value); // Set the key-value pair
      return { tempImagePlaceholder: updatedTempImagePlaceholder };
    }),

  setProductPrice: (productPrice: number) => set(() => ({ productPrice })),
  setAutoValidate: (autoValidate: boolean) => set(() => ({ autoValidate })),
  setSelectedBank: (selectedBank: UssdProviderModel | null) =>
    set(() => ({ selectedBank })),
  setSelectedProductCategory: (
    selectedProductCategory: ProductCategoriesModel | null
  ) => set(() => ({ selectedProductCategory })),
  setSelectedProductDetails: (
    selectedProductDetails: ProductDetailsModel | null
  ) => set(() => ({ selectedProductDetails })),
  setGlobalItemList: (globalItemList: Array<Record<string, any>>) =>
    set(() => ({ globalItemList })),

  updateGlobalItemList: (newItem: Record<string, any>) =>
    set((state) => ({
      globalItemList: [...state.globalItemList, newItem], // Add new item to the array
    })),

  newUpdateGlobalItemList: (
    newItem: Record<string, any> | ((prevGlobalItemList: any[]) => any[])
  ) =>
    set((state: FormStoreState & FormStoreActions) => {
      // Check if newItem is a function, and call it with the current globalItemList
      const updatedGlobalItemList =
        typeof newItem === 'function'
          ? newItem(state.globalItemList) // If it's a function, pass current globalItemList to it
          : [...state.globalItemList, newItem]; // Otherwise, add the new item directly to the list

      return { globalItemList: updatedGlobalItemList };
    }),

  setShouldValidateImageplusDrop: (shouldValidateImageplusDrop: boolean) =>
    set(() => ({ shouldValidateImageplusDrop })),

  // Reset functions
  resetFormData: () => set(() => ({ formData: {} })),
  resetUrlFormData: () =>
    set(() => ({ urlFormData: new Map<string, FormDataUrlResponse[]>() })),
  resetShowFullScreenLoader: () => set(() => ({ showFullScreenLoader: false })),
  resetUrlDependents: () =>
    set(() => ({ urlDependents: new Map<string, FormFieldModel>() })),
  resetImageList: () => set(() => ({ imageList: [] })),
  resetImagePlaceholder: () =>
    set(() => ({ imagePlaceholder: new Map<string, string>() })),
  resetTempImagePlaceholder: () =>
    set(() => ({ tempImagePlaceholder: new Map<string, string>() })),
  resetProductPrice: () => set(() => ({ productPrice: 0 })),
  resetAutoValidate: () => set(() => ({ autoValidate: false })),
  resetSelectedBank: () => set(() => ({ selectedBank: null })),
  resetSelectedProductCategory: () =>
    set(() => ({ selectedProductCategory: null })),
  resetSelectedProductDetails: () =>
    set(() => ({ selectedProductDetails: null })),
  resetGlobalItemList: () => set(() => ({ globalItemList: [] })),
  resetGlobalItemPair: () =>
    set(() => ({ globalItemPair: new Map<string, any>() })),
  resetFormErrors: () => set(() => ({ formErrors: new Map<string, any>() })),
  resetShouldValidateImageplusDrop: () =>
    set(() => ({ shouldValidateImageplusDrop: false })),
}));
