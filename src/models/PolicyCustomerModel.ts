export class PolicyCustomerModel {
  dob: string | null;
  city: number | null;
  phone: string | null;
  state: number | null;
  gender: string | null;
  address: string | null;
  country: number | null;
  lastName: string | null;
  relation: string | null;
  firstName: string | null;
  maritalStatus: number | null;

  constructor(data: any) {
    this.dob = data.dob || null;
    this.city = data.city || null;
    this.phone = data.phone || null;
    this.state = data.state || null;
    this.gender = data.gender || null;
    this.address = data.address || null;
    this.country = data.country || null;
    this.lastName = data.lastName || null;
    this.relation = data.relation || null;
    this.firstName = data.firstName || null;
    this.maritalStatus = data.maritalStatus || null;
  }

  static fromJson(json: any): PolicyCustomerModel {
    return new PolicyCustomerModel({
      dob: json['dob'],
      city: json['city'],
      phone: json['phone'],
      state: json['state'],
      gender: json['gender'],
      address: json['address'],
      country: json['country'],
      lastName: json['lastName'],
      relation: json['relation'],
      firstName: json['firstName'],
      maritalStatus: json['maritalStatus'],
    });
  }

  toJson(): any {
    return {
      dob: this.dob,
      city: this.city,
      phone: this.phone,
      state: this.state,
      gender: this.gender,
      address: this.address,
      country: this.country,
      lastName: this.lastName,
      relation: this.relation,
      firstName: this.firstName,
      maritalStatus: this.maritalStatus,
    };
  }
}

//   const jsonResponse = {
//     dob: "1990-01-01",
//     city: 101,
//     phone: "1234567890",
//     state: 102,
//     gender: "male",
//     address: "123 Main St",
//     country: 1,
//     lastName: "Doe",
//     relation: "self",
//     firstName: "John",
//     maritalStatus: 1,
//   };

//   // Creating an instance from JSON
//   const policyCustomer = PolicyCustomerModel.fromJson(jsonResponse);
//   console.log(policyCustomer);

//   // Converting the instance back to JSON
//   const json = policyCustomer.toJson();
//   console.log(json);
