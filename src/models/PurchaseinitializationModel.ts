export class PurchaseinitializationModel {
  message: string | null;
  accountNumber: string | null;
  bank: string | null;
  ussdCode: string | null;
  paymentCode: string | null;
  amount: number | null;
  reference: string | null;

  constructor(data: {
    message: string | null;
    accountNumber: string | null;
    bank: string | null;
    ussdCode: string | null;
    paymentCode: string | null;
    amount: number | null;
    reference: string | null;
  }) {
    this.message = data.message;
    this.accountNumber = data.accountNumber;
    this.bank = data.bank;
    this.ussdCode = data.ussdCode;
    this.paymentCode = data.paymentCode;
    this.amount = data.amount;
    this.reference = data.reference;
  }

  static fromJson(json: any): PurchaseinitializationModel {
    return new PurchaseinitializationModel({
      message: json['message'] || null,
      accountNumber: json['account_number'] || null,
      bank: json['bank'] || null,
      ussdCode: json['ussd_code'] || null,
      paymentCode: json['payment_code'] || null,
      amount: json['amount'] || null,
      reference: json['reference'] || null,
    });
  }

  toJson(): any {
    return {
      message: this.message,
      account_number: this.accountNumber,
      bank: this.bank,
      ussd_code: this.ussdCode,
      payment_code: this.paymentCode,
      amount: this.amount,
      reference: this.reference,
    };
  }
}

//   const jsonResponse = {
//     message: "Payment initialized",
//     account_number: "1234567890",
//     bank: "Bank Name",
//     ussd_code: "*123#",
//     payment_code: "PAY123",
//     amount: 1000,
//     reference: "REF123",
//   };

//   // Creating an instance from JSON
//   const purchaseInit = PurchaseinitializationModel.fromJson(jsonResponse);
//   console.log(purchaseInit);

//   // Converting the instance back to JSON
//   const json = purchaseInit.toJson();
//   console.log(json);
