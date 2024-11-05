export class PolicyPurchase {
  id: string | null;
  total: string | null;

  constructor(data: { id: string | null; total: string | null }) {
    this.id = data.id;
    this.total = data.total;
  }

  static fromJson(json: any): PolicyPurchase {
    return new PolicyPurchase({
      id: json['id'] || null,
      total: json['total'] || null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      total: this.total,
    };
  }
}

//   const jsonResponse = {
//     id: "123",
//     total: "5000",
//   };

//   // Creating an instance from JSON
//   const policyPurchase = PolicyPurchase.fromJson(jsonResponse);
//   console.log(policyPurchase);

//   // Converting the instance back to JSON
//   const json = policyPurchase.toJson();
//   console.log(json);
