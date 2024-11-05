export class PurchaseDetailsResponseModel {
  id: string | null;
  appMode: string | null;
  reference: string | null;
  transactionId: string | null;
  businessId: string | null;
  paymentOption: string | null;
  paymentChannel: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  processed: boolean;
  inspected: boolean;
  inspectable: boolean;
  verified: boolean;
  payload: PurchaseDetailsPayload | null;

  constructor(data: any) {
    this.id = data.id || null;
    this.appMode = data.appMode || null;
    this.reference = data.reference || null;
    this.transactionId = data.transactionId || null;
    this.businessId = data.businessId || null;
    this.paymentOption = data.paymentOption || null;
    this.paymentChannel = data.paymentChannel || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.processed = data.processed || false;
    this.inspected = data.inspected || false;
    this.inspectable = data.inspectable || false;
    this.verified = data.verified || false;
    this.payload = data.payload;
    // ? PurchaseDetailsPayload.fromJson(data.payload)
    // : null;
  }

  static fromJson(json: any): PurchaseDetailsResponseModel {
    return new PurchaseDetailsResponseModel({
      id: json['id'],
      appMode: json['app_mode'],
      reference: json['reference'],
      transactionId: json['transaction_id'],
      businessId: json['business_id'],
      paymentOption: json['payment_option'],
      paymentChannel: json['payment_channel'],
      processed: json['processed'],
      inspected: json['inspected'],
      inspectable: json['inspectable'],
      verified: json['verified'],
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
      payload: json['payload']
        ? PurchaseDetailsPayload.fromJson(json['payload'])
        : null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      app_mode: this.appMode,
      reference: this.reference,
      transaction_id: this.transactionId,
      business_id: this.businessId,
      payment_option: this.paymentOption,
      payment_channel: this.paymentChannel,
      processed: this.processed,
      inspected: this.inspected,
      inspectable: this.inspectable,
      verified: this.verified,
      created_at: this.createdAt?.toISOString(),
      updated_at: this.updatedAt?.toISOString(),
      deleted_at: this.deletedAt?.toISOString(),
      payload: this.payload ? this.payload.toJson() : null,
    };
  }
}

export class PurchaseDetailsPayload {
  route: string | null;
  currency: string | null;
  productId: string | null;
  amount: number | null;
  data: any;

  constructor(data: any) {
    this.route = data.route || null;
    this.currency = data.currency || null;
    this.productId = data.productId || null;
    this.amount = data.amount || null;
    this.data = data.data || {};
    // ? PurchasePayloadData.fromJson(data.data) : null;.
  }

  static fromJson(json: any): PurchaseDetailsPayload {
    return new PurchaseDetailsPayload({
      route: json['route'],
      currency: json['currency'],
      productId: json['product_id'],
      amount: json['amount'],
      data: json['data'],
    });
  }

  toJson(): any {
    return {
      route: this.route,
      currency: this.currency,
      product_id: this.productId,
      amount: this.amount,
      data: this.data ? this.data.toJson() : null,
    };
  }
}

// export class PurchasePayloadData {
//   email: string | null;
//   phone: string | null;
//   lastName: string | null;
//   firstName: string | null;
//   productId: string | null;
//   phoneNumber: string | null;
//   vehicleCategory: string | null;
//   dateOfBirth: string | null;
//   vehicleCost: number | null;

//   constructor(data: any) {
//     this.email = data.email || null;
//     this.phone = data.phone || null;
//     this.lastName = data.lastName || null;
//     this.firstName = data.firstName || null;
//     this.productId = data.productId || null;
//     this.phoneNumber = data.phoneNumber || null;
//     this.vehicleCategory = data.vehicleCategory || null;
//     this.dateOfBirth = data.dateOfBirth || null;
//     this.vehicleCost = data.vehicleCost || null;
//   }

//   static fromJson(json: any): PurchasePayloadData {
//     return new PurchasePayloadData({
//       email: json['email'],
//       phone: json['phone'],
//       lastName: json['last_name'],
//       firstName: json['first_name'],
//       productId: json['product_id'],
//       phoneNumber: json['phone_number'],
//       vehicleCategory: json['vehicle_category'],
//       dateOfBirth: json['date_of_birth'],
//       vehicleCost: json['vehicle_cost'],
//     });
//   }

//   toJson(): any {
//     return {
//       email: this.email,
//       phone: this.phone,
//       last_name: this.lastName,
//       first_name: this.firstName,
//       product_id: this.productId,
//       phone_number: this.phoneNumber,
//       vehicle_category: this.vehicleCategory,
//       date_of_birth: this.dateOfBirth,
//       vehicle_cost: this.vehicleCost,
//     };
//   }
// }

//   const jsonResponse = {
//     id: "123",
//     app_mode: "production",
//     reference: "REF123",
//     transaction_id: "TXN123",
//     business_id: "BIZ123",
//     payment_option: "credit_card",
//     payment_channel: "online",
//     processed: true,
//     inspected: false,
//     inspectable: true,
//     verified: true,
//     created_at: "2023-09-06T10:00:00Z",
//     updated_at: "2023-09-06T10:00:00Z",
//     deleted_at: null,
//     payload: {
//       route: "/purchase/123",
//       currency: "USD",
//       product_id: "PROD123",
//       amount: 1000,
//       data: {
//         email: "john.doe@example.com",
//         phone: "1234567890",
//         last_name: "Doe",
//         first_name: "John",
//         product_id: "PROD123",
//         phone_number: "1234567890",
//         vehicle_category: "SUV",
//         date_of_birth: "1990-01-01",
//         vehicle_cost: 20000,
//       },
//     },
//   };

//   // Creating an instance from JSON
//   const purchaseDetails = PurchaseDetailsResponseModel.fromJson(jsonResponse);
//   console.log(purchaseDetails);

//   // Converting the instance back to JSON
//   const json = purchaseDetails.toJson();
//   console.log(json);
