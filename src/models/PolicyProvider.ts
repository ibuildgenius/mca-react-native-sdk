export class PolicyProvider {
  companyName: string;
  id: string;

  constructor(data: { companyName: string; id: string }) {
    this.companyName = data.companyName;
    this.id = data.id;
  }

  static fromJson(json: any): PolicyProvider {
    return new PolicyProvider({
      companyName: json['company_name'],
      id: json['id'],
    });
  }

  toJson(): any {
    return {
      company_name: this.companyName,
      id: this.id,
    };
  }
}

//   const jsonResponse = {
//     company_name: "Insurance Co.",
//     id: "12345",
//   };

//   // Creating an instance from JSON
//   const policyProvider = PolicyProvider.fromJson(jsonResponse);
//   console.log(policyProvider);

//   // Converting the instance back to JSON
//   const json = policyProvider.toJson();
//   console.log(json);
