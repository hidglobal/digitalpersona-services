import { __extends } from "tslib";
import { Service } from '../../private';
/**
 * DigitalPersona Web Policy (DPWebPolicy) service client wrapper.
 */
var PolicyService = /** @class */ (function (_super) {
    __extends(PolicyService, _super);
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    function PolicyService(endpointUrl) {
        return _super.call(this, endpointUrl) || this;
    }
    /** @inheritdoc */
    PolicyService.prototype.GetPolicyInfo = function (user, resourceUri, action, info) {
        return this.endpoint
            .post("GetPolicyInfo", null, { user: user, resourceUri: resourceUri, action: action, info: info })
            .then(function (result) { return result.GetPolicyInfoResult; });
    };
    return PolicyService;
}(Service));
export { PolicyService };
//# sourceMappingURL=service.js.map