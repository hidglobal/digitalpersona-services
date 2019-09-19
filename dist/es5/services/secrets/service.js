import { __extends } from "tslib";
import { Service } from '../../private';
/**
 * DigitalPersona Web Secret (DPWebSecret) service client wrapper.
 */
var SecretService = /** @class */ (function (_super) {
    __extends(SecretService, _super);
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    function SecretService(endpointUrl) {
        return _super.call(this, endpointUrl) || this;
    }
    /** @inheritdoc */
    SecretService.prototype.GetAuthPolicy = function (user, secretName, action) {
        return this.endpoint
            .get("GetAuthPolicy", { user: user.name, type: user.type, secretName: secretName, action: action })
            .then(function (result) { return result.GetAuthPolicyResult; });
    };
    /** @inheritdoc */
    SecretService.prototype.DoesSecretExist = function (user, secretName) {
        return this.endpoint
            .get("DoesSecretExist", { user: user.name, type: user.type, secretName: secretName })
            .then(function (result) { return result.DoesSecretExistResult; });
    };
    /** @inheritdoc */
    SecretService.prototype.ReadSecret = function (ticket, secretName) {
        return this.endpoint
            .post("ReadSecret", null, { ticket: ticket, secretName: secretName })
            .then(function (result) { return result.ReadSecretResult; });
    };
    /** @inheritdoc */
    SecretService.prototype.WriteSecret = function (ticket, secretName, secretData) {
        return this.endpoint
            .put("WriteSecret", null, { ticket: ticket, secretName: secretName, secretData: secretData });
    };
    /** @inheritdoc */
    SecretService.prototype.DeleteSecret = function (ticket, secretName) {
        return this.endpoint
            .del("DeleteSecret", null, { ticket: ticket, secretName: secretName });
    };
    return SecretService;
}(Service));
export { SecretService };
//# sourceMappingURL=service.js.map