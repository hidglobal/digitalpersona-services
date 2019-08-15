import { Service } from '../../private';
/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
export class AdminService extends Service {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    ExecuteSearch(ticket, query) {
        return this.endpoint
            .post("ExecuteSearch", null, Object.assign({ ticket }, query))
            .then(response => JSON.parse(response.ExecuteSearchResult));
    }
    /** @inheritdoc */
    PSKCImport(ticket, PSKCData, PSKCFileName, password, sharedKey) {
        return this.endpoint
            .post("PSKCImport", null, { ticket, PSKCData, PSKCFileName, password, sharedKey })
            .then(response => response.PSKCImportResult);
    }
    /** @inheritdoc */
    GetServerSettings(ticket, user, settings) {
        return this.endpoint
            .post("GetServerSettings", null, { ticket, user, settings })
            .then(response => response.GetServerSettingsResult);
    }
    /** @inheritdoc */
    SetServerSettings(ticket, type, settings) {
        return this.endpoint
            .put("SetServerSettings", null, { ticket, type, settings });
    }
    /** @inheritdoc */
    GetLicenseInfo(type) {
        return this.endpoint
            .get("GetLicenseInfo", { type })
            .then(response => response.GetLicenseInfoResult);
    }
    /** @inheritdoc */
    GetUserRecoveryPassword(ticket, user, encryptedPwd) {
        return this.endpoint
            .post("GetUserRecoveryPassword", null, { ticket, user, encryptedPwd })
            .then(response => response.GetUserRecoveryPasswordResult);
    }
    /** @inheritdoc */
    AdminDeleteUserCredentials(ticket, user, credentials) {
        return this.endpoint
            .del("AdminDeleteUserCredentials", null, { ticket, user, credentials });
    }
    /** @inheritdoc */
    GetUserInfo(ticket, user) {
        return this.endpoint
            .post("GetUserInfo", null, { ticket, user })
            .then(response => response.GetUserInfoResult);
    }
    /** @inheritdoc */
    UnlockUserAccount(ticket, user) {
        return this.endpoint
            .put("UnlockUserAccount", null, { ticket, user });
    }
    /** @inheritdoc */
    SetUserAccountControl(ticket, user, control) {
        return this.endpoint
            .put("SetUserAccountControl", null, { ticket, user, control });
    }
}
//# sourceMappingURL=service.js.map