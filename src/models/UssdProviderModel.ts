export class UssdProviderModel {
  provider: string | null;
  bankName: string | null;
  type: string | null;

  constructor(data: {
    provider: string | null;
    bankName: string | null;
    type: string | null;
  }) {
    this.provider = data.provider;
    this.bankName = data.bankName;
    this.type = data.type;
  }

  static fromJson(json: any): UssdProviderModel {
    return new UssdProviderModel({
      provider: json['provider'] || null,
      bankName: json['bank_name'] || null,
      type: json['type'] || null,
    });
  }

  toJson(): any {
    return {
      provider: this.provider,
      bank_name: this.bankName,
      type: this.type,
    };
  }
}

//   const jsonResponse = {
//     provider: "Provider Name",
//     bank_name: "Bank Name",
//     type: "USSD",
//   };

//   // Creating an instance from JSON
//   const ussdProvider = UssdProviderModel.fromJson(jsonResponse);
//   console.log(ussdProvider);

//   // Converting the instance back to JSON
//   const json = ussdProvider.toJson();
//   console.log(json);
