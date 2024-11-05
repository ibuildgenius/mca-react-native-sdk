// interface BankAccountModel {
//     accountNumber: string | null;
//     accountName: string | null;
//     bankId: number | null;
//   }

//   class BankAccountModel {
//     constructor(
//       public accountNumber: string | null,
//       public accountName: string | null,
//       public bankId: number | null
//     ) {}

//     // Factory method to create an instance from JSON
//     static fromJson(json: any): BankAccountModel {
//       return new BankAccountModel(
//         json['account_number'],
//         json['account_name'],
//         json['bank_id']
//       );
//     }

//     // Method to convert the instance to JSON
//     toJson(): { account_number: string | null; account_name: string | null; bank_id: number | null } {
//       return {
//         account_number: this.accountNumber,
//         account_name: this.accountName,
//         bank_id: this.bankId,
//       };
//     }
//   }

// //   const jsonResponse = {
// //   account_number: '123456789',
// //   account_name: 'John Doe',
// //   bank_id: 1,
// // };

// // // Creating an instance from JSON
// // const bankAccount = BankAccountModel.fromJson(jsonResponse);
// // console.log(bankAccount);

// // // Converting the instance to JSON
// // const json = bankAccount.toJson();
// // console.log(json);

export class BankAccountModel {
  constructor(
    public accountNumber: string | null,
    public accountName: string | null,
    public bankId: number | null
  ) {}

  // Factory method to create an instance from JSON
  static fromJson(json: any): BankAccountModel {
    return new BankAccountModel(
      json['account_number'],
      json['account_name'],
      json['bank_id']
    );
  }

  // Method to convert the instance to JSON
  toJson(): {
    account_number: string | null;
    account_name: string | null;
    bank_id: number | null;
  } {
    return {
      account_number: this.accountNumber,
      account_name: this.accountName,
      bank_id: this.bankId,
    };
  }
}
