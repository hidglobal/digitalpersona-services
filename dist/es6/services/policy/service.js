import { Service } from '../../private';
/**
 * DigitalPersona Web Policy (DPWebPolicy) service client wrapper.
 */
export class PolicyService extends Service {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    GetPolicyInfo(user, resourceUri, action, info) {
        return this.endpoint
            .post("GetPolicyInfo", null, { user, resourceUri, action, info })
            .then(result => result.GetPolicyInfoResult);
    }
}
//# sourceMappingURL=service.js.map