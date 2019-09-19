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
    var VarBool = /** @class */ (function () {
        function VarBool(values) {
            this.values = values;
            this.type = exports.VarType.Boolean;
        }
        return VarBool;
    }());
    /** A variant data holding an integer value. */
    var VarInt = /** @class */ (function () {
        function VarInt(values) {
            this.values = values;
            this.type = exports.VarType.Integer;
        }
        return VarInt;
    }());
    /** A variant data holding a string value.  */
    var VarString = /** @class */ (function () {
        function VarString(values) {
            this.values = values;
            this.type = exports.VarType.String;
        }
        return VarString;
    }());
    /** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
    var VarBlob = /** @class */ (function () {
        function VarBlob(values) {
            this.values = values;
            this.type = exports.VarType.Blob;
        }
        return VarBlob;
    }());

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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * Maps Web Access service faults to the Javascript exception model
     */
    var ServiceError = /** @class */ (function (_super) {
        __extends(ServiceError, _super);
        /** Constructs the object. */
        function ServiceError(code, message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            _this.code = code;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        /** Creates a service error object from a {@link ServiceFault | service fault}. */
        ServiceError.fromServiceFault = function (fault) {
            return new ServiceError(fault.error_code, fault.description);
        };
        /** Allows to distinguish transport errors (HTTP) from {@link ServiceFault | service faults}.
         * @returns `true` if the error was a transport error (HTTP),
         *          `false` if it was a {@link ServiceFault | service fault}.
         */
        ServiceError.prototype.isHttpError = function () { return this.code >= 400 && this.code < 600; };
        return ServiceError;
    }(Error));

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
    var AuthenticationData = /** @class */ (function () {
        function AuthenticationData() {
        }
        return AuthenticationData;
    }());

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

    var ServiceEndpoint = /** @class */ (function () {
        function ServiceEndpoint(endpointUrl, defaultRequest) {
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
        ServiceEndpoint.handleResponse = function (response) {
            return (response.ok) ?
                response.json() :
                ServiceEndpoint.handleError(response);
        };
        ServiceEndpoint.handleError = function (response) {
            if (response.status === 404) {
                // DP WebServices dump all errors under a single 404 error
                // (which is not a best choice as the same error may indicate wrong URL path).
                // So we first try to get a "fault" JSON object from the response and use its
                // error code and message. If the response is empty, we fallback to a
                // regular HTTP response code and status text.
                return response.json()
                    .then(function (fault) {
                    throw (fault) ?
                        new ServiceError(fault.error_code, fault.description) :
                        new ServiceError(response.status, response.statusText);
                });
            }
            throw new ServiceError(response.status, response.statusText);
        };
        ServiceEndpoint.prototype.get = function (path, query, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), __assign(__assign(__assign({}, this.defaultRequest), request), { method: 'GET' }))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.post = function (path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'POST' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.put = function (path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'PUT' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        // cannot use "delete" as it is a reserved Javascript word
        ServiceEndpoint.prototype.del = function (path, query, body, request) {
            return fetch(core.Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'DELETE' }), (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.ping = function (path) {
            if (path === void 0) { path = 'Ping'; }
            return fetch(core.Url.create(this.endpointUrl, path), __assign(__assign({}, this.defaultRequest), { method: "GET" }))
                .then(function (response) { return response.ok; })
                .catch(function (reason) { return false; });
        };
        return ServiceEndpoint;
    }());

    var Service = /** @class */ (function () {
        function Service(endpoint) {
            this.endpoint = new ServiceEndpoint(endpoint);
        }
        Service.prototype.Ping = function () {
            return this.endpoint.ping();
        };
        return Service;
    }());

    /** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
    var AuthService = /** @class */ (function (_super) {
        __extends(AuthService, _super);
        /** Constructs a service wrapper.
         * @param endpointUrl - a URL to the DPWebClaims service.
         */
        function AuthService(endpointUrl) {
            return _super.call(this, endpointUrl) || this;
        }
        /** @inheritdoc */
        AuthService.prototype.GetUserCredentials = function (user) {
            return this.endpoint
                .get("GetUserCredentials", { user: user.name, type: user.type })
                .then(function (response) { return response.GetUserCredentialsResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.GetEnrollmentData = function (user, credentialId) {
            return this.endpoint
                .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
                .then(function (response) { return response.GetEnrollmentDataResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.Identify = function (credential) {
            return this.endpoint
                .post("IdentifyUser", null, { credential: credential })
                .then(function (response) { return new core.Ticket(response.IdentifyUserResult.jwt); });
        };
        /** @inheritdoc */
        AuthService.prototype.Authenticate = function (identity, credential) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("AuthenticateUserTicket", null, { ticket: identity, credential: credential })
                    .then(function (response) { return new core.Ticket(response.AuthenticateUserTicketResult.jwt); })
                : this.endpoint
                    .post("AuthenticateUser", null, { user: identity, credential: credential })
                    .then(function (response) { return new core.Ticket(response.AuthenticateUserResult.jwt); });
        };
        /** @inheritdoc */
        AuthService.prototype.CustomAction = function (actionId, ticket, user, credential) {
            return this.endpoint
                .post("CustomAction", null, { actionId: actionId, ticket: ticket, user: user, credential: credential })
                .then(function (response) { return response.CustomActionResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.CreateAuthentication = function (identity, credentialId) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("CreateTicketAuthentication", null, { ticket: identity, credentialId: credentialId })
                    .then(function (response) { return response.CreateTicketAuthenticationResult; })
                : this.endpoint
                    .post("CreateUserAuthentication", null, { user: identity, credentialId: credentialId })
                    .then(function (response) { return response.CreateUserAuthenticationResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.ContinueAuthentication = function (authId, authData) {
            return this.endpoint
                .post("ContinueAuthentication", null, { authId: authId, authData: authData })
                .then(function (response) { return response.ContinueAuthenticationResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.DestroyAuthentication = function (authId) {
            return this.endpoint
                .del("DestroyAuthentication", null, { authId: authId });
        };
        return AuthService;
    }(Service));

    /**
     * A request for a identity claim.
     * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
     * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
     */
    var ClaimRequest = /** @class */ (function () {
        /** Constructs a claim request. */
        function ClaimRequest(
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
        return ClaimRequest;
    }());

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

    /**
     * A context of an authentication.
     */
    var ContextualInfo = /** @class */ (function () {
        function ContextualInfo() {
        }
        return ContextualInfo;
    }());
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
