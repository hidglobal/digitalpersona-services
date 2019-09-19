import { __extends } from "tslib";
import { Service } from '../../private';
/**
 * DigitalPersona Web Claims (DPWebClaims) service client wrapper.
 */
var ClaimsService = /** @class */ (function (_super) {
    __extends(ClaimsService, _super);
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    function ClaimsService(endpointUrl) {
        return _super.call(this, endpointUrl) || this;
    }
    /** @inheritdoc */
    ClaimsService.prototype.GetConfiguredClaims = function (ticket) {
        return this.endpoint
            .post("GetConfiguredClaims", null, { ticket: ticket })
            .then(function (result) { return result.GetConfiguredClaimsResult.ticket; });
    };
    /** @inheritdoc */
    ClaimsService.prototype.GetClaims = function (ticket, request) {
        return this.endpoint
            .post("GetClaims", null, { ticket: ticket, request: request })
            .then(function (result) { return result.GetClaimsResult.ticket; });
    };
    return ClaimsService;
}(Service));
export { ClaimsService };
//# sourceMappingURL=service.js.map