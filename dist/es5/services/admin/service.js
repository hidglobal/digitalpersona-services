import { __assign, __extends } from "tslib";
import { Service } from '../../private';
/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
var AdminService = /** @class */ (function (_super) {
    __extends(AdminService, _super);
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    function AdminService(endpointUrl) {
        return _super.call(this, endpointUrl) || this;
    }
    /** @inheritdoc */
    AdminService.prototype.ExecuteSearch = function (ticket, query) {
        return this.endpoint
            .post("ExecuteSearch", null, __assign({ ticket: ticket }, query))
            .then(function (response) { return JSON.parse(response.ExecuteSearchResult); });
    };
    /** @inheritdoc */
    AdminService.prototype.PSKCImport = function (ticket, PSKCData, PSKCFileName, password, sharedKey) {
        return this.endpoint
            .post("PSKCImport", null, { ticket: ticket, PSKCData: PSKCData, PSKCFileName: PSKCFileName, password: password, sharedKey: sharedKey })
            .then(function (response) { return response.PSKCImportResult; });
    };
    /** @inheritdoc */
    AdminService.prototype.GetServerSettings = function (ticket, user, settings) {
        return this.endpoint
            .post("GetServerSettings", null, { ticket: ticket, user: user, settings: settings })
            .then(function (response) { return response.GetServerSettingsResult; });
    };
    /** @inheritdoc */
    AdminService.prototype.SetServerSettings = function (ticket, type, settings) {
        return this.endpoint
            .put("SetServerSettings", null, { ticket: ticket, type: type, settings: settings });
    };
    /** @inheritdoc */
    AdminService.prototype.GetLicenseInfo = function (type) {
        return this.endpoint
            .get("GetLicenseInfo", { type: type })
            .then(function (response) { return response.GetLicenseInfoResult; });
    };
    /** @inheritdoc */
    AdminService.prototype.GetUserRecoveryPassword = function (ticket, user, encryptedPwd) {
        return this.endpoint
            .post("GetUserRecoveryPassword", null, { ticket: ticket, user: user, encryptedPwd: encryptedPwd })
            .then(function (response) { return response.GetUserRecoveryPasswordResult; });
    };
    /** @inheritdoc */
    AdminService.prototype.AdminDeleteUserCredentials = function (ticket, user, credentials) {
        return this.endpoint
            .del("AdminDeleteUserCredentials", null, { ticket: ticket, user: user, credentials: credentials });
    };
    /** @inheritdoc */
    AdminService.prototype.GetUserInfo = function (ticket, user) {
        return this.endpoint
            .post("GetUserInfo", null, { ticket: ticket, user: user })
            .then(function (response) { return response.GetUserInfoResult; });
    };
    /** @inheritdoc */
    AdminService.prototype.UnlockUserAccount = function (ticket, user) {
        return this.endpoint
            .put("UnlockUserAccount", null, { ticket: ticket, user: user });
    };
    /** @inheritdoc */
    AdminService.prototype.SetUserAccountControl = function (ticket, user, control) {
        return this.endpoint
            .put("SetUserAccountControl", null, { ticket: ticket, user: user, control: control });
    };
    return AdminService;
}(Service));
export { AdminService };
//# sourceMappingURL=service.js.map