export class CustomerDetails {
    id: string | null;
    appMode: string | null;
    firstName: string | null;
    businessId: string | null;
    userId: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    country: string | null;
    gender: string | null;
    title: string | null;
    dateOfBirth: string | null;
    stateOfResidence: string | null;
    city: string | null;
    address: string | null;
    identityVerification: string | null;
    verificationType: string | null;
    faceImage: string | null;
    isKycComplete: boolean | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  
    constructor(data: any) {
      this.id = data.id || null;
      this.appMode = data.appMode || null;
      this.firstName = data.firstName || null;
      this.businessId = data.businessId || null;
      this.userId = data.userId || null;
      this.lastName = data.lastName || null;
      this.email = data.email || null;
      this.phoneNumber = data.phoneNumber || null;
      this.country = data.country || null;
      this.gender = data.gender || null;
      this.title = data.title || null;
      this.dateOfBirth = data.dateOfBirth || null;
      this.stateOfResidence = data.stateOfResidence || null;
      this.city = data.city || null;
      this.address = data.address || null;
      this.identityVerification = data.identityVerification || null;
      this.verificationType = data.verificationType || null;
      this.faceImage = data.faceImage || null;
      this.isKycComplete = data.isKycComplete || null;
      this.active = data.active || null;
      this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
      this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    }
  
    static fromJson(json: any): CustomerDetails {
      return new CustomerDetails({
        id: json['id'],
        appMode: json['app_mode'],
        firstName: json['first_name'],
        businessId: json['business_id'],
        userId: json['user_id'],
        lastName: json['last_name'],
        email: json['email'],
        phoneNumber: json['phone_number'],
        country: json['country'],
        gender: json['gender'],
        title: json['title'],
        dateOfBirth: json['date_of_birth'],
        stateOfResidence: json['state_of_residence'],
        city: json['city'],
        address: json['address'],
        identityVerification: json['identity_verification'],
        verificationType: json['verification_type'],
        faceImage: json['face_image'],
        isKycComplete: json['is_kyc_complete'],
        active: json['active'],
        createdAt: json['created_at'] ? new Date(json['created_at']) : null,
        updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
        deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
      });
    }
  
    toJson(): any {
      return {
        id: this.id,
        app_mode: this.appMode,
        first_name: this.firstName,
        business_id: this.businessId,
        user_id: this.userId,
        last_name: this.lastName,
        email: this.email,
        phone_number: this.phoneNumber,
        country: this.country,
        gender: this.gender,
        title: this.title,
        date_of_birth: this.dateOfBirth,
        state_of_residence: this.stateOfResidence,
        city: this.city,
        address: this.address,
        identity_verification: this.identityVerification,
        verification_type: this.verificationType,
        face_image: this.faceImage,
        is_kyc_complete: this.isKycComplete,
        active: this.active,
        created_at: this.createdAt ? this.createdAt.toISOString() : null,
        updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
        deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      };
    }
  }

  




//   const jsonResponse = {
//     id: "123",
//     app_mode: "production",
//     first_name: "John",
//     business_id: "biz123",
//     user_id: "user123",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     phone_number: "1234567890",
//     country: "USA",
//     gender: "male",
//     title: "Mr.",
//     date_of_birth: "1990-01-01",
//     state_of_residence: "New York",
//     city: "New York",
//     address: "123 Main St",
//     identity_verification: "verified",
//     verification_type: "passport",
//     face_image: "image_url",
//     is_kyc_complete: true,
//     active: true,
//     created_at: "2023-09-05T10:00:00Z",
//     updated_at: "2023-09-06T10:00:00Z",
//     deleted_at: null,
//   };
  
//   // Creating an instance from JSON
//   const customer = CustomerDetails.fromJson(jsonResponse);
//   console.log(customer);
  
//   // Converting the instance back to JSON
//   const json = customer.toJson();
//   console.log(json);
  