import { ProductCategoriesModel } from './ProductCategoriesModel'; // Ensure the correct import path

export class PolicyProductModel {
  name: string | null;
  description: string | null;
  id: string | null;
  inspectable: boolean | null;
  isDynamicPricing: boolean | null;
  claimable: boolean | null;
  routeName: string | null;
  productCategory: ProductCategoriesModel | null;

  constructor(data: any) {
    this.name = data.name || null;
    this.description = data.description || null;
    this.id = data.id || null;
    this.inspectable = data.inspectable || null;
    this.isDynamicPricing = data.isDynamicPricing || null;
    this.claimable = data.claimable || null;
    this.routeName = data.routeName || null;
    this.productCategory = data.productCategory
      ? ProductCategoriesModel.fromJson(data.productCategory)
      : null;
  }

  static fromJson(json: any): PolicyProductModel {
    return new PolicyProductModel({
      name: json['name'],
      description: json['description'],
      id: json['id'],
      inspectable: json['inspectable'],
      isDynamicPricing: json['is_dynamic_pricing'],
      claimable: json['claimable'],
      routeName: json['route_name'],
      productCategory: json['product_category']
        ? ProductCategoriesModel.fromJson(json['product_category'])
        : null,
    });
  }

  toJson(): any {
    return {
      name: this.name,
      description: this.description,
      id: this.id,
      inspectable: this.inspectable,
      is_dynamic_pricing: this.isDynamicPricing,
      claimable: this.claimable,
      route_name: this.routeName,
      product_category: this.productCategory
        ? this.productCategory.toJson()
        : null,
    };
  }
}

// const jsonResponse = {
//     name: "Insurance Product",
//     description: "Description of the product",
//     id: "123",
//     inspectable: true,
//     is_dynamic_pricing: false,
//     claimable: true,
//     route_name: "insuranceRoute",
//     product_category: {
//       category_name: "Health Insurance",
//       // other fields...
//     },
//   };

//   // Creating an instance from JSON
//   const policyProduct = PolicyProductModel.fromJson(jsonResponse);
//   console.log(policyProduct);

//   // Converting the instance back to JSON
//   const json = policyProduct.toJson();
//   console.log(json);
