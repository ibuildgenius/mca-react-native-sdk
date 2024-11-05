import { SdkResponseStatus } from '../utils/enums'; // Ensure correct import path
import { PolicyModel } from './PolicyModel'; // Ensure correct import path
import { InspectionModel } from './InspectionModel'; // Ensure correct import path
import { ClaimModel } from './ClaimModel'; // Ensure correct import path

export class SdkResponse {
  status: SdkResponseStatus;
  policyModel: PolicyModel | null;
  inspection: InspectionModel | null;
  claim: ClaimModel | null;
  context: any; // Adjust type according to your context, e.g., if using a navigation context in React Native or another UI framework

  constructor(data: {
    status: SdkResponseStatus;
    policyModel?: PolicyModel | null;
    inspection?: InspectionModel | null;
    claim?: ClaimModel | null;
    context: any; // Adjust type here
  }) {
    this.status = data.status;
    this.policyModel = data.policyModel || null;
    this.inspection = data.inspection || null;
    this.claim = data.claim || null;
    this.context = data.context;
  }
}
