export class PolicyDistributor {
  businessName: string | null;
  id: string | null;

  constructor(data: any) {
    this.businessName = data.businessName || null;
    this.id = data.id || null;
  }

  static fromJson(json: any): PolicyDistributor {
    return new PolicyDistributor({
      businessName: json['business_name'],
      id: json['id'],
    });
  }

  toJson(): any {
    return {
      business_name: this.businessName,
      id: this.id,
    };
  }
}

//   const jsonResponse = {
//     business_name: "My Business",
//     id: "123",
//   };

//   // Creating an instance from JSON
//   const policyDistributor = PolicyDistributor.fromJson(jsonResponse);
//   console.log(policyDistributor);

//   // Converting the instance back to JSON
//   const json = policyDistributor.toJson();
//   console.log(json);
