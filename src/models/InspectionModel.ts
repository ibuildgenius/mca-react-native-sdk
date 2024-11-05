export class InspectionModel {
  id: string | null;
  appMode: string | null;
  inspectionType: string | null;
  inspectionStatus: string | null;
  inspectionCount: number | null;
  inspectionRetries: number | null;
  isApproved: boolean | null;
  policyId: string | null;
  customerId: string | null;
  providerId: string | null;
  productId: string | null;
  distributorId: string | null;
  vehicleInspectionMeta: any;
  updatedAt: Date | null;
  createdAt: Date | null;
  gadgetInspectionMeta: any;
  rejectionComment: string | null;
  deletedAt: Date | null;

  constructor(data: any) {
    this.id = data.id || null;
    this.appMode = data.appMode || null;
    this.inspectionType = data.inspectionType || null;
    this.inspectionStatus = data.inspectionStatus || null;
    this.inspectionCount = data.inspectionCount || null;
    this.inspectionRetries = data.inspectionRetries || null;
    this.isApproved = data.isApproved || false;
    this.policyId = data.policyId || null;
    this.customerId = data.customerId || null;
    this.providerId = data.providerId || null;
    this.productId = data.productId || null;
    this.distributorId = data.distributorId || null;
    this.vehicleInspectionMeta = data.vehicleInspectionMeta || null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.gadgetInspectionMeta = data.gadgetInspectionMeta || null;
    this.rejectionComment = data.rejectionComment || null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
  }

  static fromJson(json: any): InspectionModel {
    return new InspectionModel({
      id: json['id'],
      appMode: json['app_mode'],
      inspectionType: json['inspection_type'],
      inspectionStatus: json['inspection_status'],
      inspectionCount: json['inspection_count'],
      inspectionRetries: json['inspection_retries'],
      isApproved: json['is_approved'] ?? false,
      policyId: json['policy_id'],
      customerId: json['customer_id'],
      providerId: json['provider_id'],
      productId: json['product_id'],
      distributorId: json['distributor_id'],
      vehicleInspectionMeta: json['vehicle_inspection_meta'],
      updatedAt: json['updated_at'] ? new Date(json['updated_at']) : null,
      createdAt: json['created_at'] ? new Date(json['created_at']) : null,
      gadgetInspectionMeta: json['gadget_inspection_meta'],
      rejectionComment: json['rejection_comment'],
      deletedAt: json['deleted_at'] ? new Date(json['deleted_at']) : null,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      app_mode: this.appMode,
      inspection_type: this.inspectionType,
      inspection_status: this.inspectionStatus,
      inspection_count: this.inspectionCount,
      inspection_retries: this.inspectionRetries,
      is_approved: this.isApproved,
      policy_id: this.policyId,
      customer_id: this.customerId,
      provider_id: this.providerId,
      product_id: this.productId,
      distributor_id: this.distributorId,
      vehicle_inspection_meta: this.vehicleInspectionMeta,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      gadget_inspection_meta: this.gadgetInspectionMeta,
      rejection_comment: this.rejectionComment,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }
}

//   const jsonResponse = {
//     id: "1",
//     app_mode: "production",
//     inspection_type: "vehicle",
//     inspection_status: "completed",
//     inspection_count: 2,
//     inspection_retries: 1,
//     is_approved: true,
//     policy_id: "policy123",
//     customer_id: "customer123",
//     provider_id: "provider123",
//     product_id: "product123",
//     distributor_id: "distributor123",
//     vehicle_inspection_meta: { someMeta: "data" },
//     updated_at: "2023-09-06T10:00:00Z",
//     created_at: "2023-09-05T10:00:00Z",
//     gadget_inspection_meta: null,
//     rejection_comment: null,
//     deleted_at: null,
//   };

//   // Creating an instance from JSON
//   const inspection = InspectionModel.fromJson(jsonResponse);
//   console.log(inspection);

//   // Converting the instance back to JSON
//   const json = inspection.toJson();
//   console.log(json);
