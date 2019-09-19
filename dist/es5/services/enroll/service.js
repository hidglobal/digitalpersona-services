import { __extends } from "tslib";
import { Service } from '../../private';
/**
 * DigitalPersona Web Enroll (DPWebEnroll) service client wrapper.
 */
var EnrollService = /** @class */ (function (_super) {
    __extends(EnrollService, _super);
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    function EnrollService(endpointUrl) {
        return _super.call(this, endpointUrl) || this;
    }
    /** @inheritdoc */
    EnrollService.prototype.GetUserCredentials = function (user) {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(function (result) { return result.GetUserCredentialsResult; });
    };
    /** @inheritdoc */
    EnrollService.prototype.GetEnrollmentData = function (user, credentialId) {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(function (result) { return result.GetEnrollmentDataResult; });
    };
    /** @inheritdoc */
    EnrollService.prototype.CreateUser = function (secOfficer, user, password) {
        return this.endpoint
            .put("CreateUser", null, { secOfficer: secOfficer, user: user, password: password });
    };
    /** @inheritdoc */
    EnrollService.prototype.DeleteUser = function (secOfficer, user) {
        return this.endpoint
            .del("DeleteUser", null, { secOfficer: secOfficer, user: user });
    };
    /** @inheritdoc */
    EnrollService.prototype.EnrollUserCredentials = function (secOfficer, owner, credential) {
        return this.endpoint
            .put("EnrollUserCredentials", null, { secOfficer: secOfficer, owner: owner, credential: credential });
    };
    /** @inheritdoc */
    EnrollService.prototype.DeleteUserCredentials = function (secOfficer, owner, credential) {
        return this.endpoint
            .del("DeleteUserCredentials", null, { secOfficer: secOfficer, owner: owner, credential: credential });
    };
    /** @inheritdoc */
    EnrollService.prototype.EnrollAltusUserCredentials = function (secOfficer, user, credential) {
        return this.endpoint
            .put("EnrollAltusUserCredentials", null, { secOfficer: secOfficer, user: user, credential: credential });
    };
    /** @inheritdoc */
    EnrollService.prototype.DeleteAltusUserCredentials = function (secOfficer, user, credential) {
        return this.endpoint
            .del("DeleteAltusUserCredentials", null, { secOfficer: secOfficer, user: user, credential: credential });
    };
    /** @inheritdoc */
    EnrollService.prototype.GetUserAttribute = function (ticket, user, attributeName) {
        return this.endpoint
            .post("GetUserAttribute", null, { ticket: ticket, user: user, attributeName: attributeName })
            .then(function (result) { return ({
            name: attributeName,
            data: result.GetUserAttributeResult,
        }); });
    };
    /** @inheritdoc */
    EnrollService.prototype.PutUserAttribute = function (ticket, user, attribute, action) {
        return this.endpoint
            .put("PutUserAttribute", null, {
            ticket: ticket, user: user, action: action,
            attributeName: attribute.name,
            attributeData: attribute.data
        });
    };
    /** @inheritdoc */
    EnrollService.prototype.UnlockUser = function (user, credential) {
        return this.endpoint
            .post("UnlockUser", null, { user: user, credential: credential });
    };
    /** @inheritdoc */
    EnrollService.prototype.CustomAction = function (ticket, user, credential, actionId) {
        return this.endpoint
            .post("CustomAction", null, { ticket: ticket, user: user, credential: credential, actionId: actionId })
            .then(function (result) { return result.CustomActionResult; });
    };
    /** @inheritdoc */
    EnrollService.prototype.IsEnrollmentAllowed = function (secOfficer, user, credentialId) {
        return this.endpoint
            .post("IsEnrollmentAllowed", null, { secOfficer: secOfficer, user: user, credentialId: credentialId });
    };
    return EnrollService;
}(Service));
export { EnrollService };
//# sourceMappingURL=service.js.map