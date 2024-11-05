import { ProviderModel } from './ProviderModel'; // Make sure the ProviderModel is imported correctly

export class InsuranceProviderResponse {
  totalCount: number | null;
  providers: ProviderModel[] | null;

  constructor(data: any) {
    this.totalCount = data.totalCount || null;
    this.providers = data.providers
      ? data.providers.map((e: any) => ProviderModel.fromJson(e))
      : [];
  }

  static fromJson(json: any): InsuranceProviderResponse {
    return new InsuranceProviderResponse({
      totalCount: json['total_count'],
      providers: json['providers']
        ? json['providers'].map((e: any) => ProviderModel.fromJson(e))
        : [],
    });
  }

  toJson(): any {
    return {
      total_count: this.totalCount,
      providers: this.providers?.map((e) => e.toJson()) || [],
    };
  }
}

// const jsonResponse = {
//     total_count: 10,
//     providers: [
//       { id: 1, name: 'Provider A' },
//       { id: 2, name: 'Provider B' },
//     ],
//   };

//   // Creating an instance from JSON
//   const insuranceProviderResponse = InsuranceProviderResponse.fromJson(jsonResponse);
//   console.log(insuranceProviderResponse);

//   // Converting the instance back to JSON
//   const json = insuranceProviderResponse.toJson();
//   console.log(json);
