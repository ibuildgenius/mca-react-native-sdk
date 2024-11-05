import { BusinessDetailsModel } from './BusinessDetailsModel'; // Ensure correct import path
import { ProductCategoriesModel } from './ProductCategoriesModel'; // Ensure correct import path

export class SdkInitializationResponse {
  businessDetails: BusinessDetailsModel | null;
  productCategories: ProductCategoriesModel[] | null;

  constructor(data: {
    businessDetails: BusinessDetailsModel | null;
    productCategories: ProductCategoriesModel[] | null;
  }) {
    this.businessDetails = data.businessDetails;
    this.productCategories = data.productCategories;
  }

  static fromJson(json: any): SdkInitializationResponse {
    return new SdkInitializationResponse({
      businessDetails: json['businessDetails']
        ? BusinessDetailsModel.fromJson(json['businessDetails'])
        : null,
      productCategories: json['product_categories']
        ? (json['product_categories'] as any[]).map((e) =>
            ProductCategoriesModel.fromJson(e)
          )
        : [],
    });
  }

  toJson(): any {
    return {
      businessDetails: this.businessDetails
        ? this.businessDetails.toJson()
        : null,
      product_categories: this.productCategories
        ? this.productCategories.map((e) => e.toJson())
        : [],
    };
  }
}

// const sdkResponse = SdkInitializationResponse.fromJson(jsonResponse);
// console.log(sdkResponse);

// // Converting the instance back to JSON
// const json = sdkResponse.toJson();
// console.log(json);
