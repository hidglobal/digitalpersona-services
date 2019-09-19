(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@digitalpersona/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@digitalpersona/core'], factory) :
    (global = global || self, factory((global.dp = global.dp || {}, global.dp.services = global.dp.services || {}), global.dp.core));
}(this, function (exports, core) { 'use strict';

    (function (VarType) {
        /** The variant holds a boolean value. */
        VarType[VarType["Boolean"] = 1] = "Boolean";
        /** The variant holds an integer value. */
        VarType[VarType["Integer"] = 2] = "Integer";
        /** The variant holds a string value.  */
        VarType[VarType["String"] = 3] = "String";
        /** The variant holds a binary object (in a form of a Base64Url-encoded string). */
        VarType[VarType["Blob"] = 4] = "Blob";
    })(exports.VarType || (exports.VarType = {}));
    /** A variant data holding a boolean value. */
    class VarBool {
        constructor(values) {
            this.values = values;
            this.type = exports.VarType.Boolean;
        }
    }
    /** A variant data holding an integer value. */
    class VarInt {
        constructor(values) {
            this.values = values;
            this.type = exports.VarType.Integer;
        }
    }
    /** A variant data holding a string value.  */
    class VarString {
        constructor(values) {
            this.values = values;
            this.type = exports.VarType.String;
        }
    }
    /** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
    class VarBlob {
        constructor(values) {
            this.values = values;
            this.type = exports.VarType.Blob;
        }
    }

    /** Enumerates supported actions that can be performed on user's attributes. */
    (function (AttributeAction) {
        /** Clear an attribute's value. */
        AttributeAction[AttributeAction["Clear"] = 1] = "Clear";
        /** Update an attribute's value.  */
        AttributeAction[AttributeAction["Update"] = 2] = "Update";
        /** Append a value to the existing multi-value attribute. */
        AttributeAction[AttributeAction["Append"] = 3] = "Append";
        /** Delete an attribute. */
        AttributeAction[AttributeAction["Delete"] = 4] = "Delete";
    })(exports.AttributeAction || (exports.AttributeAction = {}));

    /**
     * Enumerates supported resource actions.
     */
    (function (ResourceActions) {
        /** Reading of a resource. */
        ResourceActions[ResourceActions["Read"] = 0] = "Read";
        /** Modifying a resource. */
        ResourceActions[ResourceActions["Write"] = 1] = "Write";
        /** Deleting a resource. */
        ResourceActions[ResourceActions["Delete"] = 2] = "Delete";
    })(exports.ResourceActions || (exports.ResourceActions = {}));

    /**
     * Maps Web Access service faults to the Javascript exception model
     */
    class ServiceError extends Error {
        /** Constructs the object. */
        constructor(code, message) {
            super(message);
            this.code = code;
            Object.setPrototypeOf(this, new.target.prototype);
        }
        /** Creates a service error object from a {@link ServiceFault | service fault}. */
        static fromServiceFault(fault) {
            return new ServiceError(fault.error_code, fault.description);
        }
        /** Allows to distinguish transport errors (HTTP) from {@link ServiceFault | service faults}.
         * @returns `true` if the error was a transport error (HTTP),
         *          `false` if it was a {@link ServiceFault | service fault}.
         */
        isHttpError() { return this.code >= 400 && this.code < 600; }
    }

    /**
     * Enumerates supported identity databases.
     */
    (function (DatabaseType) {
        /** ActiveDirectory (AD) */
        DatabaseType["AD"] = "AD";
        /** Lightweight Directory Service (LDS) */
        DatabaseType["LDS"] = "ADLDS";
    })(exports.DatabaseType || (exports.DatabaseType = {}));

    /**
     * Client-side authentication data used by the {@link IAuthenticationClient} during authentication handshake.
     */
    class AuthenticationData {
    }

    /**
     * Enumerated possible authentication statuses.
     */
    (function (AuthenticationStatus) {
        /** Authentication failed. */
        AuthenticationStatus[AuthenticationStatus["Error"] = 0] = "Error";
        /** Authentication is in progress. */
        AuthenticationStatus[AuthenticationStatus["Continue"] = 1] = "Continue";
        /** Authentication is complete. */
        AuthenticationStatus[AuthenticationStatus["Completed"] = 2] = "Completed";
    })(exports.AuthenticationStatus || (exports.AuthenticationStatus = {}));

    class ServiceEndpoint {
        constructor(endpointUrl, defaultRequest) {
            this.defaultRequest = {
                cache: "no-cache",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "application/json",
                },
            };
            this.endpointUrl = endpointUrl;
            this.defaultRequest = defaultRequest || this.defaultRequest;
        }
        static handleResponse(response) {
            return (response.ok) ?
                response.json() :
                ServiceEndpoint.handleError(response);
        }
        static handleError(response) {
            if (response.status === 404) {
                // DP WebServices dump all errors under a single 404 error
                // (which is not a best choice as the same error may indicate wrong URL path).
                // So we first try to get a "fault" JSON object from the response and use its
                // error code and message. If the response is empty, we fallback to a
                // regular HTTP response code and status text.
                return response.json()
                    .then((fault) => {
                    throw (fault) ?
                        new ServiceError(fault.error_code, fault.description) :
                        new ServiceError(response.status, response.statusText);
                });
            }
            throw new ServiceError(response.status, response.statusText);
        }
        get(path, query, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'GET' }))
                .then(ServiceEndpoint.handleResponse);
        }
        post(path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'POST' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        put(path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'PUT' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        // cannot use "delete" as it is a reserved Javascript word
        del(path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'DELETE' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        ping(path = 'Ping') {
            return fetch(core.Url.create(this.endpointUrl, path), Object.assign(Object.assign({}, this.defaultRequest), { method: "GET" }))
                .then(response => response.ok)
                .catch(reason => false);
        }
    }

    class Service {
        constructor(endpoint) {
            this.endpoint = new ServiceEndpoint(endpoint);
        }
        Ping() {
            return this.endpoint.ping();
        }
    }

    /** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
    class AuthService extends Service {
        /** Constructs a service wrapper.
         * @param endpointUrl - a URL to the DPWebClaims service.
         */
        constructor(endpointUrl) {
            super(endpointUrl);
        }
        /** @inheritdoc */
        GetUserCredentials(user) {
            return this.endpoint
                .get("GetUserCredentials", { user: user.name, type: user.type })
                .then(response => response.GetUserCredentialsResult);
        }
        /** @inheritdoc */
        GetEnrollmentData(user, credentialId) {
            return this.endpoint
                .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
                .then(response => response.GetEnrollmentDataResult);
        }
        /** @inheritdoc */
        Identify(credential) {
            return this.endpoint
                .post("IdentifyUser", null, { credential })
                .then(response => new core.Ticket(response.IdentifyUserResult.jwt));
        }
        /** @inheritdoc */
        Authenticate(identity, credential) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("AuthenticateUserTicket", null, { ticket: identity, credential })
                    .then(response => new core.Ticket(response.AuthenticateUserTicketResult.jwt))
                : this.endpoint
                    .post("AuthenticateUser", null, { user: identity, credential })
                    .then(response => new core.Ticket(response.AuthenticateUserResult.jwt));
        }
        /** @inheritdoc */
        CustomAction(actionId, ticket, user, credential) {
            return this.endpoint
                .post("CustomAction", null, { actionId, ticket, user, credential })
                .then(response => response.CustomActionResult);
        }
        /** @inheritdoc */
        CreateAuthentication(identity, credentialId) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("CreateTicketAuthentication", null, { ticket: identity, credentialId })
                    .then(response => response.CreateTicketAuthenticationResult)
                : this.endpoint
                    .post("CreateUserAuthentication", null, { user: identity, credentialId })
                    .then(response => response.CreateUserAuthenticationResult);
        }
        /** @inheritdoc */
        ContinueAuthentication(authId, authData) {
            return this.endpoint
                .post("ContinueAuthentication", null, { authId, authData })
                .then(response => response.ContinueAuthenticationResult);
        }
        /** @inheritdoc */
        DestroyAuthentication(authId) {
            return this.endpoint
                .del("DestroyAuthentication", null, { authId });
        }
    }

    /**
     * A request for a identity claim.
     * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
     * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
     */
    class ClaimRequest {
        /** Constructs a claim request. */
        constructor(
        /** A name of a claim to return. */
        name, 
        /** A database to search for an attribute. */
        db, 
        /** An attribute name to search. */
        attr) {
            this.name = name;
            this.db = db;
            this.attr = attr;
        }
    }

    /**
     * DigitalPersona Web Claims (DPWebClaims) service client wrapper.
     */
    class ClaimsService extends Service {
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

    /**
     * DigitalPersona Web Enroll (DPWebEnroll) service client wrapper.
     */
    class EnrollService extends Service {
        /** Constructs a service wrapper.
         * @param endpointUrl - a URL to the DPWebClaims service.
         */
        constructor(endpointUrl) {
            super(endpointUrl);
        }
        /** @inheritdoc */
        GetUserCredentials(user) {
            return this.endpoint
                .get("GetUserCredentials", { user: user.name, type: user.type })
                .then(result => result.GetUserCredentialsResult);
        }
        /** @inheritdoc */
        GetEnrollmentData(user, credentialId) {
            return this.endpoint
                .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
                .then(result => result.GetEnrollmentDataResult);
        }
        /** @inheritdoc */
        CreateUser(secOfficer, user, password) {
            return this.endpoint
                .put("CreateUser", null, { secOfficer, user, password });
        }
        /** @inheritdoc */
        DeleteUser(secOfficer, user) {
            return this.endpoint
                .del("DeleteUser", null, { secOfficer, user });
        }
        /** @inheritdoc */
        EnrollUserCredentials(secOfficer, owner, credential) {
            return this.endpoint
                .put("EnrollUserCredentials", null, { secOfficer, owner, credential });
        }
        /** @inheritdoc */
        DeleteUserCredentials(secOfficer, owner, credential) {
            return this.endpoint
                .del("DeleteUserCredentials", null, { secOfficer, owner, credential });
        }
        /** @inheritdoc */
        EnrollAltusUserCredentials(secOfficer, user, credential) {
            return this.endpoint
                .put("EnrollAltusUserCredentials", null, { secOfficer, user, credential });
        }
        /** @inheritdoc */
        DeleteAltusUserCredentials(secOfficer, user, credential) {
            return this.endpoint
                .del("DeleteAltusUserCredentials", null, { secOfficer, user, credential });
        }
        /** @inheritdoc */
        GetUserAttribute(ticket, user, attributeName) {
            return this.endpoint
                .post("GetUserAttribute", null, { ticket, user, attributeName })
                .then(result => ({
                name: attributeName,
                data: result.GetUserAttributeResult,
            }));
        }
        /** @inheritdoc */
        PutUserAttribute(ticket, user, attribute, action) {
            return this.endpoint
                .put("PutUserAttribute", null, {
                ticket, user, action,
                attributeName: attribute.name,
                attributeData: attribute.data
            });
        }
        /** @inheritdoc */
        UnlockUser(user, credential) {
            return this.endpoint
                .post("UnlockUser", null, { user, credential });
        }
        /** @inheritdoc */
        CustomAction(ticket, user, credential, actionId) {
            return this.endpoint
                .post("CustomAction", null, { ticket, user, credential, actionId })
                .then(result => result.CustomActionResult);
        }
        /** @inheritdoc */
        IsEnrollmentAllowed(secOfficer, user, credentialId) {
            return this.endpoint
                .post("IsEnrollmentAllowed", null, { secOfficer, user, credentialId });
        }
    }

    /**
     * A context of an authentication.
     */
    class ContextualInfo {
    }
    (function (TriggerName) {
        TriggerName["Behavior"] = "behavior";
        TriggerName["IP"] = "ip";
        TriggerName["Device"] = "device";
        TriggerName["AltusInstalled"] = "altusInstalled";
        TriggerName["Computer"] = "computer";
        TriggerName["Domain"] = "domain";
        TriggerName["User"] = "user";
        TriggerName["InsideFirewall"] = "insideFirewall";
        TriggerName["RemoteSession"] = "remoteSession";
    })(exports.TriggerName || (exports.TriggerName = {}));

    /**
     * DigitalPersona Web Policy (DPWebPolicy) service client wrapper.
     */
    class PolicyService extends Service {
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

    /**
     * DigitalPersona Web Secret (DPWebSecret) service client wrapper.
     */
    class SecretService extends Service {
        /** Constructs a service wrapper.
         * @param endpointUrl - a URL to the DPWebClaims service.
         */
        constructor(endpointUrl) {
            super(endpointUrl);
        }
        /** @inheritdoc */
        GetAuthPolicy(user, secretName, action) {
            return this.endpoint
                .get("GetAuthPolicy", { user: user.name, type: user.type, secretName, action })
                .then(result => result.GetAuthPolicyResult);
        }
        /** @inheritdoc */
        DoesSecretExist(user, secretName) {
            return this.endpoint
                .get("DoesSecretExist", { user: user.name, type: user.type, secretName })
                .then(result => result.DoesSecretExistResult);
        }
        /** @inheritdoc */
        ReadSecret(ticket, secretName) {
            return this.endpoint
                .post("ReadSecret", null, { ticket, secretName })
                .then(result => result.ReadSecretResult);
        }
        /** @inheritdoc */
        WriteSecret(ticket, secretName, secretData) {
            return this.endpoint
                .put("WriteSecret", null, { ticket, secretName, secretData });
        }
        /** @inheritdoc */
        DeleteSecret(ticket, secretName) {
            return this.endpoint
                .del("DeleteSecret", null, { ticket, secretName });
        }
    }

    (function (LicenseType) {
        LicenseType[LicenseType["ADUser"] = 1] = "ADUser";
        LicenseType[LicenseType["LDSUser"] = 2] = "LDSUser";
    })(exports.LicenseType || (exports.LicenseType = {}));

    (function (SearchScope) {
        SearchScope[SearchScope["Base"] = 0] = "Base";
        SearchScope[SearchScope["OneLevel"] = 1] = "OneLevel";
        SearchScope[SearchScope["Subtree"] = 2] = "Subtree";
    })(exports.SearchScope || (exports.SearchScope = {}));

    (function (ServerSettingType) {
        /** Unknown Server Settings Type. */
        ServerSettingType[ServerSettingType["Unknown"] = 0] = "Unknown";
        /** Server Settings will be accessible only for Domain Administrators. */
        ServerSettingType[ServerSettingType["Admin"] = 1] = "Admin";
        /** Server Settings will be accessible for anybody (public). */
        ServerSettingType[ServerSettingType["Public"] = 2] = "Public";
    })(exports.ServerSettingType || (exports.ServerSettingType = {}));
    (function (ServerSettings) {
        ServerSettings[ServerSettings["LockoutThreshold"] = 0] = "LockoutThreshold";
        ServerSettings[ServerSettings["LockoutDuration"] = 1] = "LockoutDuration";
        ServerSettings[ServerSettings["LockoutReset"] = 2] = "LockoutReset";
    })(exports.ServerSettings || (exports.ServerSettings = {}));

    /** DPCA Useraccount control flags. */
    (function (UACFlags) {
        UACFlags[UACFlags["RevertToWindows"] = 1] = "RevertToWindows";
        UACFlags[UACFlags["PasswordNotAllowed"] = 2] = "PasswordNotAllowed";
        UACFlags[UACFlags["PinRequired"] = 4] = "PinRequired";
        UACFlags[UACFlags["FingerprintRequired"] = 8] = "FingerprintRequired";
        UACFlags[UACFlags["FingerprintOnly"] = 16] = "FingerprintOnly";
        UACFlags[UACFlags["OtpAndPwd"] = 64] = "OtpAndPwd";
        UACFlags[UACFlags["OtpAndFingerprint"] = 128] = "OtpAndFingerprint";
    })(exports.UACFlags || (exports.UACFlags = {}));
    (function (UserAccountType) {
        /** User account type is unknown. */
        UserAccountType[UserAccountType["Unknown"] = 0] = "Unknown";
        /** A local user account. */
        UserAccountType[UserAccountType["Local"] = 1] = "Local";
        /** ActiveDirectory user */
        UserAccountType[UserAccountType["ActiveDirectory"] = 2] = "ActiveDirectory";
        /** AD LDS (DPCA) user.  */
        UserAccountType[UserAccountType["ADLDS"] = 3] = "ADLDS";
    })(exports.UserAccountType || (exports.UserAccountType = {}));

    /** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
    class AdminService extends Service {
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

    exports.AdminService = AdminService;
    exports.AuthService = AuthService;
    exports.AuthenticationData = AuthenticationData;
    exports.ClaimRequest = ClaimRequest;
    exports.ClaimsService = ClaimsService;
    exports.ContextualInfo = ContextualInfo;
    exports.EnrollService = EnrollService;
    exports.PolicyService = PolicyService;
    exports.SecretService = SecretService;
    exports.ServiceError = ServiceError;
    exports.VarBlob = VarBlob;
    exports.VarBool = VarBool;
    exports.VarInt = VarInt;
    exports.VarString = VarString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
