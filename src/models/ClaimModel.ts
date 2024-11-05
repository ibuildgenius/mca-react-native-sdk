import {CustomerDetails} from './CustomerDetails'; // Assuming this file exists
import {PolicyProvider} from './PolicyProvider'; // Assuming this file exists
import {PolicyProductModel} from './PolicyProductModel'; // Assuming this file exists
import {PolicyDistributor} from './PolicyDistributor'; // Assuming this file exists
import {PolicyModel} from './PolicyModel'; // Assuming this file exists

export class ClaimModel {
  id: string | null;
  appMode: string | null;
  claimDescription: string | null;
  claimOwner: string | null;
  claimOwnerFirstName: string | null;
  claimOwnerLastName: string | null;
  declineReason: string | null;
  claimOwnerEmail: string | null;
  claimOwnerPhoneNumber: string | null;
  vehicleClaimMeta: any;
  gadgetClaimMeta: any;
  creditLifeClaimMeta: any;
  travelClaimMeta: any;
  claimType: string | null;
  claimAmount: string | null;
  estimateAmount: string | null;
  offerAmount: string | null;
  bettermentDeductionAmount: string | null;
  excessDeductionAmount: string | null;
  incidentDate: string | null;
  claimStatus: string | null;
  claimInvoiceUrl: string | null;
  offerFormUrl: string | null;
  inspectionCount: number | null;
  inspectionRetries: number | null;
  isApproved: boolean | null;
  rejectionComment: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  productId: string | null;
  customerId: string | null;
  distributorId: string | null;
  claimId: string | null;
  providerId: string | null;
  policyId: string | null;
  inspectionId: string | null;
  customer: CustomerDetails | null;
  provider: PolicyProvider | null;
  product: PolicyProductModel | null;
  distributor: PolicyDistributor | null;
  policy: PolicyModel | null;
  inspection: any;
  comments: any;

  constructor(data: any) {
    this.id = data.id || null;
    this.appMode = data.appMode || null;
    this.claimDescription = data.claimDescription || null;
    this.claimOwner = data.claimOwner || null;
    this.claimOwnerFirstName = data.claim_owner_first_name || null;
    this.claimOwnerLastName = data.claim_owner_last_name || null;
    this.declineReason = data.declineReason || null;
    this.claimOwnerEmail = data.claimOwnerEmail || null;
    this.claimOwnerPhoneNumber = data.claimOwnerPhoneNumber || null;
    this.vehicleClaimMeta = data.vehicle_claim_meta;
    this.gadgetClaimMeta = data.gadget_claim_meta || null;
    this.creditLifeClaimMeta = data.creditLifeClaimMeta || null;
    this.travelClaimMeta = data.travel_claim_meta || null;
    this.claimType = data.claimType || null;
    this.claimAmount = data.claimAmount || null;
    this.estimateAmount = data.estimateAmount
      ? data.estimateAmount.toString()
      : null;
    this.offerAmount = data.offer_amount || null;
    this.bettermentDeductionAmount = data.betterment_deduction_amount || null;
    this.excessDeductionAmount = data.excess_deduction_amount || null;
    this.incidentDate = data.incidentDate || null;
    this.claimStatus = data.claim_status || null;
    this.claimInvoiceUrl = data.claimInvoiceUrl || null;
    this.offerFormUrl = data.offerFormUrl || null;
    this.inspectionCount = data.inspectionCount || null;
    this.inspectionRetries = data.inspectionRetries || null;
    this.isApproved = data.isApproved || null;
    this.rejectionComment = data.rejectionComment || null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.productId = data.productId || null;
    this.customerId = data.customer_id || null;
    this.distributorId = data.distributorId || null;
    this.claimId = data.claimId || null;
    this.providerId = data.provider_id || null;
    this.policyId = data.policy_id || null;
    this.inspectionId = data.inspection_id || null;
    this.customer = data.customer
      ? CustomerDetails.fromJson(data.customer)
      : null;
    this.provider = data.provider
      ? PolicyProvider.fromJson(data.provider)
      : null;
    this.product = data.product
      ? PolicyProductModel.fromJson(data.product)
      : null;
    this.distributor = data.distributor
      ? PolicyDistributor.fromJson(data.distributor)
      : null;
    this.policy = data.policy ? PolicyModel.fromJson(data.policy) : null;
    this.inspection = data.inspection || null;
    this.comments = data.comments || null;
  }

  static fromJson(json: any): ClaimModel {
    return new ClaimModel(json);
  }

  toJson(): any {
    return {
      id: this.id,
      app_mode: this.appMode,
      claim_description: this.claimDescription,
      claim_owner: this.claimOwner,
      claim_owner_first_name: this.claimOwnerFirstName,
      claim_owner_last_name: this.claimOwnerLastName,
      decline_reason: this.declineReason,
      claim_owner_email: this.claimOwnerEmail,
      claim_owner_phone_number: this.claimOwnerPhoneNumber,
      vehicle_claim_meta: this.vehicleClaimMeta,
      gadget_claim_meta: this.gadgetClaimMeta,
      credit_life_claim_meta: this.creditLifeClaimMeta,
      travel_claim_meta: this.travelClaimMeta,
      claim_type: this.claimType,
      claim_amount: this.claimAmount,
      estimate_amount: this.estimateAmount,
      offer_amount: this.offerAmount,
      betterment_deduction_amount: this.bettermentDeductionAmount,
      excess_deduction_amount: this.excessDeductionAmount,
      incident_date: this.incidentDate,
      claim_status: this.claimStatus,
      claim_invoice_url: this.claimInvoiceUrl,
      offer_form_url: this.offerFormUrl,
      inspection_count: this.inspectionCount,
      inspection_retries: this.inspectionRetries,
      is_approved: this.isApproved,
      rejection_comment: this.rejectionComment,
      created_at: this.createdAt ? this.createdAt.toISOString() : null,
      updated_at: this.updatedAt ? this.updatedAt.toISOString() : null,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
      product_id: this.productId,
      customer_id: this.customerId,
      distributor_id: this.distributorId,
      claim_id: this.claimId,
      provider_id: this.providerId,
      policy_id: this.policyId,
      inspection_id: this.inspectionId,
      customer: this.customer ? this.customer.toJson() : null,
      provider: this.provider ? this.provider.toJson() : null,
      product: this.product ? this.product.toJson() : null,
      distributor: this.distributor ? this.distributor.toJson() : null,
      policy: this.policy ? this.policy.toJson() : null,
      inspection: this.inspection,
      comments: this.comments,
    };
  }
}
