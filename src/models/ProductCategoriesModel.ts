export class ProductCategoriesModel {
  id: string | null;
  name: string | null;
  createdAt: Date | null;
  productCount: number | null;

  constructor(data: {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    productCount: number | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.productCount = data.productCount;
  }

  static fromJson(json: any): ProductCategoriesModel {
    return new ProductCategoriesModel({
      id: json['id'] || null,
      name: json['name'] || null,
      productCount:
        json['product_count'] !== null
          ? parseInt(json['product_count'], 10)
          : null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      product_count: this.productCount,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
    };
  }
}

//   const jsonResponse = {
//     id: "1",
//     name: "Health Insurance",
//     product_count: "5",
//     created_at: "2023-09-06T10:00:00Z",
//   };

//   // Creating an instance from JSON
//   const productCategory = ProductCategoriesModel.fromJson(jsonResponse);
//   console.log(productCategory);

//   // Converting the instance back to JSON
//   const json = productCategory.toJson();
//   console.log(json);
