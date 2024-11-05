import { PolicyCustomerModel } from './PolicyCustomerModel';
import { PolicyDistributor } from './PolicyDistributor';
import { PolicyProductModel } from './PolicyProductModel';
import { PolicyProvider } from './PolicyProvider';
import { PolicyPurchase } from './PolicyPurchase';

export class PolicyModel {
  id: string | null;
  appMode: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  dob: string | null;
  productCategoryId: string | null;
  activationDate: Date | null;
  startDate: Date | null;
  expirationDate: Date | null;
  marketPrice: number | null;
  geniusPrice: number | null;
  profit: number | null;
  meta: any | null;
  history: any | null;
  active: boolean | null;
  submittedToProvider: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  productId: string | null;
  customerId: string | null;
  buyerId: string | null;
  distributorId: string | null;
  providerId: string | null;
  purchaseId: string | null;
  customer: PolicyCustomerModel | null;
  product: PolicyProductModel | null;
  distributor: PolicyDistributor | null;
  provider: PolicyProvider | null;
  purchase: PolicyPurchase | null;
  inspections: any[] | null;

  constructor(data: any) {
    this.id = data.id || null;
    this.appMode = data.appMode || null;
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
    this.email = data.email || null;
    this.phone = data.phone || null;
    this.dob = data.dob || null;
    this.productCategoryId = data.productCategoryId || null;
    this.activationDate = data.activationDate
      ? new Date(data.activationDate)
      : null;
    this.startDate = data.startDate ? new Date(data.startDate) : null;
    this.expirationDate = data.expirationDate
      ? new Date(data.expirationDate)
      : null;
    this.marketPrice = data.marketPrice || null;
    this.geniusPrice = data.geniusPrice || null;
    this.profit = data.profit || null;
    this.meta = data.meta || null;
    this.history = data.history || null;
    this.active = data.active || null;
    this.submittedToProvider = data.submittedToProvider || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.productId = data.productId || null;
    this.customerId = data.customerId || null;
    this.buyerId = data.buyerId || null;
    this.distributorId = data.distributorId || null;
    this.providerId = data.providerId || null;
    this.purchaseId = data.purchaseId || null;
    this.customer = data.customer
      ? PolicyCustomerModel.fromJson(data.customer)
      : null;
    this.product = data.product;
    // ? PolicyProductModel.fromJson(data.product) : null;
    this.distributor = data.distributor
      ? PolicyDistributor.fromJson(data.distributor)
      : null;
    this.provider = data.provider
      ? PolicyProvider.fromJson(data.provider)
      : null;
    this.purchase = data.purchase
      ? PolicyPurchase.fromJson(data.purchase)
      : null;
    this.inspections = data.inspections ? [...data.inspections] : null;
  }

  static fromJson(json: any): PolicyModel {
    return new PolicyModel({
      id: json['id'],
      appMode: json['app_mode'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      email: json['email'],
      phone: json['phone'],
      dob: json['dob'],
      productCategoryId: json['product_category_id'],
      activationDate: json['activation_date'],
      startDate: json['start_date'],
      expirationDate: json['expiration_date'],
      marketPrice: json['market_price'],
      geniusPrice: json['genius_price'],
      profit: json['profit'],
      meta: json['meta'],
      history: json['history'],
      active: json['active'],
      submittedToProvider: json['submitted_to_provider'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deletedAt: json['deleted_at'],
      productId: json['product_id'],
      customerId: json['customer_id'],
      buyerId: json['buyer_id'],
      distributorId: json['distributor_id'],
      providerId: json['provider_id'],
      purchaseId: json['purchase_id'],
      customer: json['customer']
        ? PolicyCustomerModel.fromJson(json['customer'])
        : null,
      product: json['product']
        ? PolicyProductModel.fromJson(json['product'])
        : null,
      distributor: json['distributor']
        ? PolicyDistributor.fromJson(json['distributor'])
        : null,
      provider: json['provider']
        ? PolicyProvider.fromJson(json['provider'])
        : null,
      purchase: json['purchase']
        ? PolicyPurchase.fromJson(json['purchase'])
        : null,
      inspections: json['inspections'] ? [...json['inspections']] : null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      app_mode: this.appMode,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
      product_category_id: this.productCategoryId,
      activation_date: this.activationDate
        ? this.activationDate.toISOString()
        : null,
      start_date: this.startDate ? this.startDate.toISOString() : null,
      expiration_date: this.expirationDate
        ? this.expirationDate.toISOString()
        : null,
      market_price: this.marketPrice,
      genius_price: this.geniusPrice,
      profit: this.profit,
      meta: this.meta,
      active: this.active,
      submitted_to_provider: this.submittedToProvider,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      product_id: this.productId,
      customer_id: this.customerId,
      buyer_id: this.buyerId,
      distributor_id: this.distributorId,
      provider_id: this.providerId,
      purchase_id: this.purchaseId,
      customer: this.customer ? this.customer.toJson() : null,
      product: this.product ? this.product.toJson() : null,
      distributor: this.distributor ? this.distributor.toJson() : null,
      provider: this.provider ? this.provider.toJson() : null,
      purchase: this.purchase ? this.purchase.toJson() : null,
      inspections: this.inspections,
    };
  }
}

// const jsonResponse = {
//     id: "1",
//     app_mode: "production",
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     phone: "1234567890",
//     dob: "1990-01-01",
//     product_category_id: "123",
//     activation_date: "2023-09-01T00:00:00Z",
//     start_date: "2023-09-01T00:00:00Z",
//     expiration_date: "2024-09-01T00:00:00Z",
//     market_price: 100,
//     genius_price: 80,
//     profit: 20,
//     meta: {},
//     active: true,
//     submitted_to_provider: true,
//     created_at: "2023-09-01T00:00:00Z",
//     updated_at: "2023-09-01T00:00:00Z",
//     deleted_at: null,
//     product_id: "456",
//     customer_id: "789",
//     buyer_id: "101112",
//     distributor_id: "131415",
//     provider_id: "161718",
//     purchase_id: "192021",
//     customer: {
//       first_name: "John",
//       last_name: "Doe",
//       // other customer fields...
//     },
//     product: {
//       name: "Insurance Product",
//       // other product fields...
//     },
//     // more fields...
//   };

//   // Creating an instance from JSON
//   const policy = PolicyModel.fromJson(jsonResponse);
//   console.log(policy);

//   // Converting the instance back to JSON
//   const json = policy.toJson();
//   console.log(json);
