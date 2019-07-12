(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@digitalpersona/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@digitalpersona/core'], factory) :
    (global = global || self, factory((global.dp = global.dp || {}, global.dp.services = global.dp.services || {}), global.dp.core));
}(this, function (exports, core) { 'use strict';

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

    var Url = /** @class */ (function () {
        function Url(base, path, query) {
            this.href = Url.create(base, path, query);
        }
        Url.getSanitizedQuery = function (query) {
            return Object
                .keys(query)
                .map(function (key) { return [key, query[key]]
                .map(encodeURIComponent)
                .join("="); })
                .join("&");
        };
        Url.create = function (base, path, query) {
            return base
                + (path ? "/" + encodeURIComponent(path) : "")
                + (query ? "?" + Url.getSanitizedQuery(query) : "");
        };
        return Url;
    }());

    var ServiceEndpoint = /** @class */ (function () {
        function ServiceEndpoint(endpointUrl, defaultRequest) {
            this.defaultRequest = {
                cache: "no-cache",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "application/json"
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
            return fetch(Url.create(this.endpointUrl, path, query), __assign({}, this.defaultRequest, request, { method: 'GET' }))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.post = function (path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), __assign({}, this.defaultRequest, request, { method: 'POST' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.put = function (path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), __assign({}, this.defaultRequest, request, { method: 'PUT' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        // cannot use "delete" as it is a reserved Javascript word
        ServiceEndpoint.prototype.del = function (path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), __assign({}, this.defaultRequest, request, { method: 'DELETE' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        };
        ServiceEndpoint.prototype.ping = function (path) {
            if (path === void 0) { path = 'Ping'; }
            return fetch(Url.create(this.endpointUrl, path), __assign({}, this.defaultRequest, { method: "GET" }))
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
                .then(function (response) { return response.IdentifyUserResult; });
        };
        /** @inheritdoc */
        AuthService.prototype.Authenticate = function (identity, credential) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("AuthenticateUserTicket", null, { ticket: identity, credential: credential })
                    .then(function (response) { return response.AuthenticateUserTicketResult; })
                : this.endpoint
                    .post("AuthenticateUser", null, { user: identity, credential: credential })
                    .then(function (response) { return response.AuthenticateUserResult; });
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
     * Enumerates supported identity databases.
     */
    (function (Database) {
        /** ActiveDirectory (AD) */
        Database["AD"] = "AD";
        /** Lightweight Directory Service (LDS) */
        Database["LDS"] = "ADLDS";
    })(exports.Database || (exports.Database = {}));
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
    (function (AttributeType) {
        /** The attribute can have a boolean value. */
        AttributeType[AttributeType["Boolean"] = 1] = "Boolean";
        /** The attribute can have an integer value. */
        AttributeType[AttributeType["Integer"] = 2] = "Integer";
        /** The attribute can have a text value. */
        AttributeType[AttributeType["String"] = 3] = "String";
        /** The attribute can have a binary object value. */
        AttributeType[AttributeType["Blob"] = 4] = "Blob";
    })(exports.AttributeType || (exports.AttributeType = {}));
    /**
     * Represents a single attribute in an identity database.
     */
    var Attribute = /** @class */ (function () {
        function Attribute(
        /** An attribute type. */
        type, 
        /** A list of attribute values. */
        values) {
            this.type = type;
            this.values = values;
        }
        return Attribute;
    }());

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
                .then(function (result) { return result.GetUserAttributeResult; });
        };
        /** @inheritdoc */
        EnrollService.prototype.PutUserAttribute = function (ticket, user, attributeName, action, attributeData) {
            return this.endpoint
                .put("PutUserAttribute", null, { ticket: ticket, user: user, attributeName: attributeName, action: action, attributeData: attributeData });
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

    /*! Copyright 2019 HID Global Inc. */

    exports.Attribute = Attribute;
    exports.AuthService = AuthService;
    exports.AuthenticationData = AuthenticationData;
    exports.ClaimRequest = ClaimRequest;
    exports.ClaimsService = ClaimsService;
    exports.ContextualInfo = ContextualInfo;
    exports.EnrollService = EnrollService;
    exports.PolicyService = PolicyService;
    exports.SecretService = SecretService;
    exports.ServiceError = ServiceError;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
