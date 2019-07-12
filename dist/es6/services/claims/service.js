import { Service } from '../../private';
/**
 * DigitalPersona Web Claims (DPWebClaims) service client wrapper.
 */
export class ClaimsService extends Service {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    GetConfiguredClaims(ticket) {
        return this.endpoint
            .post("GetConfiguredClaims", null, { ticket })
            .then(result => result.GetConfiguredClaimsResult.ticket);
    }
    /** @inheritdoc */
    GetClaims(ticket, request) {
        return this.endpoint
            .post("GetClaims", null, { ticket, request })
            .then(result => result.GetClaimsResult.ticket);
    }
}
//# sourceMappingURL=service.js.map