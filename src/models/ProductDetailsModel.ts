import { ProviderLiteModel } from './ProviderLiteModel'; // Ensure correct import path
import { ProductCategoriesModel } from './ProductCategoriesModel'; // Ensure correct import path
import { FormFieldModel } from './FormFieldModel'; // Ensure correct import path

export class ProductDetailsModel {
  id: string | null;
  name: string | null;
  keyBenefits: string | null;
  description: string | null;
  prefix: string | null;
  routeName: string | null;
  renewable: boolean | null;
  claimable: boolean | null;
  inspectable: boolean | null;
  certificateable: boolean | null;
  isDynamicPricing: boolean | null;
  price: string | null;
  coverPeriod: string | null;
  active: boolean | null;
  stabilityPercentageTestMode: number | null;
  stabilityPercentageLiveMode: number | null;
  howItWorks: string | null;
  howToClaim: string | null;
  businessHowItWorks: string | null;
  businessHowToClaim: string | null;
  fullBenefits: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  productCategoryId: string | null;
  providerId: string | null;
  provider: ProviderLiteModel | null;
  productCategory: ProductCategoriesModel | null;
  formFields: FormFieldModel[] | null;
  // formFields: any;

  constructor(data: any) {
    this.id = data.id || null;
    this.name = data.name || null;
    this.keyBenefits = data.keyBenefits || null;
    this.description = data.description || null;
    this.prefix = data.prefix || null;
    this.routeName = data.routeName || null;
    this.renewable = data.renewable || null;
    this.claimable = data.claimable || null;
    this.inspectable = data.inspectable;
    this.certificateable = data.certificateable || null;
    this.isDynamicPricing = data.isDynamicPricing || null;
    this.price = data.price || null;
    this.coverPeriod = data.coverPeriod || null;
    this.active = data.active || null;
    this.stabilityPercentageTestMode = data.stabilityPercentageTestMode || null;
    this.stabilityPercentageLiveMode = data.stabilityPercentageLiveMode || null;
    this.howItWorks = data.howItWorks || null;
    this.howToClaim = data.howToClaim || null;
    this.businessHowItWorks = data.businessHowItWorks || null;
    this.businessHowToClaim = data.businessHowToClaim || null;
    this.fullBenefits = data.fullBenefits || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.productCategoryId = data.productCategoryId || null;
    this.providerId = data.providerId || null;
    this.provider = data.provider;
    // ? ProviderLiteModel.fromJson(data.provider)
    // : null;
    this.productCategory = data.productCategory
      ? ProductCategoriesModel.fromJson(data.productCategory)
      : null;
    this.formFields = data.formFields;
    // ? data.formFields.map((field: any) => FormFieldModel.fromJson(field))
    // : [];
  }

  static fromJson(json: any): ProductDetailsModel {
    // // log.info("JSON", json['form_fields']);
    // log.info(JSON.stringify(json['form_fields'], null, 2) );
    // // log.info(JSON.stringify(json, null, 2) );
    return new ProductDetailsModel({
      id: json['id'],
      name: json['name'],
      keyBenefits: json['key_benefits'],
      description: json['description'],
      prefix: json['prefix'],
      routeName: json['route_name'],
      renewable: json['renewable'],
      claimable: json['claimable'],
      inspectable: json['inspectable'],
      certificateable: json['certificateable'],
      isDynamicPricing: json['is_dynamic_pricing'],
      price: json['price'],
      coverPeriod: json['cover_period'],
      active: json['active'],
      stabilityPercentageTestMode: json['stability_percentage_test_mode']
        ? parseFloat(json['stability_percentage_test_mode'])
        : null,
      stabilityPercentageLiveMode: json['stability_percentage_live_mode']
        ? parseFloat(json['stability_percentage_live_mode'])
        : null,
      howItWorks: json['how_it_works'],
      howToClaim: json['how_to_claim'],
      businessHowItWorks: json['business_how_it_works'],
      businessHowToClaim: json['business_how_to_claim'],
      fullBenefits:
        typeof json['full_benefits'] === 'string'
          ? json['full_benefits']
          : null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      productCategoryId: json['product_category_id'],
      providerId: json['provider_id'],
      provider: json['provider']
        ? // json['provider'].map((field: any) =>
          //     ProviderLiteModel.fromJson(field),
          //   )
          // :
          ProviderLiteModel.fromJson(json['provider'])
        : null,
      productCategory: json['productCategory']
        ? ProductCategoriesModel.fromJson(json['productCategory'])
        : null,
      formFields: json['form_fields']
        ? json['form_fields'].map((field: any) =>
            FormFieldModel.fromJson(field)
          )
        : [],
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      key_benefits: this.keyBenefits,
      description: this.description,
      prefix: this.prefix,
      route_name: this.routeName,
      renewable: this.renewable,
      claimable: this.claimable,
      inspectable: this.inspectable,
      certificateable: this.certificateable,
      is_dynamic_pricing: this.isDynamicPricing,
      price: this.price,
      cover_period: this.coverPeriod,
      active: this.active,
      stability_percentage_test_mode: this.stabilityPercentageTestMode,
      stability_percentage_live_mode: this.stabilityPercentageLiveMode,
      how_it_works: this.howItWorks,
      how_to_claim: this.howToClaim,
      business_how_it_works: this.businessHowItWorks,
      business_how_to_claim: this.businessHowToClaim,
      full_benefits: this.fullBenefits,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      product_category_id: this.productCategoryId,
      provider_id: this.providerId,
      product_category: this.productCategory
        ? this.productCategory.toJson()
        : null,
      // form_fields: this.formFields
      //   ? this.formFields.map((field) => field.toJson())
      //   : [],
    };
  }
}

// const jsonResponse = {
//     id: "1",
//     name: "Insurance Product",
//     key_benefits: "Comprehensive coverage",
//     description: "This is a description",
//     prefix: "INS",
//     route_name: "insurance",
//     renewable: true,
//     claimable: true,
//     inspectable: false,
//     certificateable: true,
//     is_dynamic_pricing: false,
//     price: "100",
//     cover_period: "1 year",
//     active: true,
//     stability_percentage_test_mode: "0.95",
//     stability_percentage_live_mode: "0.9",
//     how_it_works: "Details on how it works",
//     how_to_claim: "Details on how to claim",
//     business_how_it_works: "Business process",
//     business_how_to_claim: "Business claim process",
//     full_benefits: "Full benefits of the product",
//     created_at: "2023-09-01T00:00:00Z",
//     updated_at: "2023-09-01T00:00:00Z",
//     product_category_id: "123",
//     provider_id: "456",
//     provider: {
//       id: "456",
//       name: "Provider Name",
//     },
//     productCategory: {
//       id: "123",
//       name: "Health",
//       product_count: 5,
//       created_at: "2023-09-01T00:00:00Z",
//     },
//     form_fields: [
//       {
//         id: "field1",
//         name: "First Name",
//         label: "Enter your first name",
//         position: 1,
//       },
//       // More form fields
//     ],
//   };

//   // Creating an instance from JSON
//   const productDetails = ProductDetailsModel.fromJson(jsonResponse);
//   console.log(productDetails);

//   // Converting the instance back to JSON
//   const json = productDetails.toJson();
//   console.log(json);
