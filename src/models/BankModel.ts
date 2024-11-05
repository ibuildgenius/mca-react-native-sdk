// interface BankModel {
//   id: number | null;
//   name: string | null;
//   slug: string | null;
//   code: string | null;
//   longcode: string | null;
//   payWithBank: boolean | null;
//   supportsTransfer: boolean | null;
//   active: boolean | null;
//   country: string | null;
//   currency: string | null;
//   type: string | null;
//   isDeleted: boolean | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
// }

// class BankModel {
//   constructor(
//     public id: number | null,
//     public name: string | null,
//     public slug: string | null,
//     public code: string | null,
//     public longcode: string | null,
//     public payWithBank: boolean | null,
//     public supportsTransfer: boolean | null,
//     public active: boolean | null,
//     public country: string | null,
//     public currency: string | null,
//     public type: string | null,
//     public isDeleted: boolean | null,
//     public createdAt: Date | null,
//     public updatedAt: Date | null,
//   ) {}

//   // Factory method to create an instance from JSON
//   static fromJson(json: any): BankModel {
//     return new BankModel(
//       json['id'],
//       json['name'],
//       json['slug'],
//       json['code'],
//       json['longcode'],
//       json['pay_with_bank'],
//       json['supports_transfer'],
//       json['active'],
//       json['country'],
//       json['currency'],
//       json['type'],
//       json['is_deleted'],
//       json['createdAt'] ? new Date(json['createdAt']) : null,
//       json['updatedAt'] ? new Date(json['updatedAt']) : null,
//     );
//   }

//   // Method to convert the instance to JSON
//   toJson(): {
//     id: number | null;
//     name: string | null;
//     slug: string | null;
//     code: string | null;
//     longcode: string | null;
//     pay_with_bank: boolean | null;
//     supports_transfer: boolean | null;
//     active: boolean | null;
//     country: string | null;
//     currency: string | null;
//     type: string | null;
//     is_deleted: boolean | null;
//     createdAt: string | null;
//     updatedAt: string | null;
//   } {
//     return {
//       id: this.id,
//       name: this.name,
//       slug: this.slug,
//       code: this.code,
//       longcode: this.longcode,
//       pay_with_bank: this.payWithBank,
//       supports_transfer: this.supportsTransfer,
//       active: this.active,
//       country: this.country,
//       currency: this.currency,
//       type: this.type,
//       is_deleted: this.isDeleted,
//       createdAt: this.createdAt ? this.createdAt.toISOString() : null,
//       updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
//     };
//   }
// }

// //   const jsonResponse = {
// //     id: 1,
// //     name: "Bank A",
// //     slug: "bank-a",
// //     code: "001",
// //     longcode: "00001",
// //     pay_with_bank: true,
// //     supports_transfer: true,
// //     active: true,
// //     country: "Country A",
// //     currency: "USD",
// //     type: "Bank",
// //     is_deleted: false,
// //     createdAt: "2023-09-05T10:00:00Z",
// //     updatedAt: "2023-09-06T10:00:00Z"
// //   };

// //   // Creating an instance from JSON
// //   const bank = BankModel.fromJson(jsonResponse);
// //   console.log(bank);

// //   // Converting the instance to JSON
// //   const json = bank.toJson();
// //   console.log(json);

export class BankModel {
  constructor(
    public id: number | null,
    public name: string | null,
    public slug: string | null,
    public code: string | null,
    public longcode: string | null,
    public payWithBank: boolean | null,
    public supportsTransfer: boolean | null,
    public active: boolean | null,
    public country: string | null,
    public currency: string | null,
    public type: string | null,
    public isDeleted: boolean | null,
    public createdAt: Date | null,
    public updatedAt: Date | null
  ) {}

  // Factory method to create an instance from JSON
  static fromJson(json: any): BankModel {
    return new BankModel(
      json['id'],
      json['name'],
      json['slug'],
      json['code'],
      json['longcode'],
      json['pay_with_bank'],
      json['supports_transfer'],
      json['active'],
      json['country'],
      json['currency'],
      json['type'],
      json['is_deleted'],
      json['createdAt'] ? new Date(json['createdAt']) : null,
      json['updatedAt'] ? new Date(json['updatedAt']) : null
    );
  }

  // Method to convert the instance to JSON
  toJson(): {
    id: number | null;
    name: string | null;
    slug: string | null;
    code: string | null;
    longcode: string | null;
    pay_with_bank: boolean | null;
    supports_transfer: boolean | null;
    active: boolean | null;
    country: string | null;
    currency: string | null;
    type: string | null;
    is_deleted: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
  } {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      code: this.code,
      longcode: this.longcode,
      pay_with_bank: this.payWithBank,
      supports_transfer: this.supportsTransfer,
      active: this.active,
      country: this.country,
      currency: this.currency,
      type: this.type,
      is_deleted: this.isDeleted,
      createdAt: this.createdAt ? this.createdAt.toISOString() : null,
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
    };
  }
}
