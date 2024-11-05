export class MetaModel {
  price: string | null;
  expiry: string | null;
  period: string | null;
  benefitDesc: string | null;
  benefit: string | null;
  payoutType: string | null;
  document: string | null;
  terms: string | null;
  warranty: string | null;
  features: string | null;

  constructor(data: any) {
    this.price = data.price || null;
    this.expiry = data.expiry || null;
    this.period = data.period || null;
    this.benefitDesc = data.benefitDesc || null;
    this.benefit = data.benefit || null;
    this.payoutType = data.payoutType || null;
    this.document = data.document || null;
    this.terms = data.terms || null;
    this.warranty = data.warranty || null;
    this.features = data.features || null;
  }

  static fromJson(json: any): MetaModel {
    return new MetaModel({
      price: json['price'],
      expiry: json['expiry'],
      period: json['period'],
      benefitDesc: json['benefit_desc'],
      benefit: json['benefit'],
      payoutType: json['payout_type'],
      document: json['document'],
      terms: json['terms'],
      warranty: json['warranty'],
      features: json['features'],
    });
  }

  toJson(): any {
    return {
      price: this.price,
      expiry: this.expiry,
      period: this.period,
      benefit_desc: this.benefitDesc,
      benefit: this.benefit,
      payout_type: this.payoutType,
      document: this.document,
      terms: this.terms,
      warranty: this.warranty,
      features: this.features,
    };
  }
}

//   const jsonResponse = {
//     price: "100",
//     expiry: "2023-12-31",
//     period: "1 year",
//     benefit_desc: "Full coverage",
//     benefit: "100000",
//     payout_type: "lump sum",
//     document: "policy.pdf",
//     terms: "standard",
//     warranty: "3 years",
//     features: "feature1, feature2",
//   };

//   // Creating an instance from JSON
//   const meta = MetaModel.fromJson(jsonResponse);
//   console.log(meta);

//   // Converting the instance back to JSON
//   const json = meta.toJson();
//   console.log(json);
