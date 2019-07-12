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

    class Url {
        constructor(base, path, query) {
            this.href = Url.create(base, path, query);
        }
        static getSanitizedQuery(query) {
            return Object
                .keys(query)
                .map(key => [key, query[key]]
                .map(encodeURIComponent)
                .join("="))
                .join("&");
        }
        static create(base, path, query) {
            return base
                + (path ? `/${encodeURIComponent(path)}` : "")
                + (query ? `?${Url.getSanitizedQuery(query)}` : "");
        }
    }

    class ServiceEndpoint {
        constructor(endpointUrl, defaultRequest) {
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
            return fetch(Url.create(this.endpointUrl, path, query), Object.assign({}, this.defaultRequest, request, { method: 'GET' }))
                .then(ServiceEndpoint.handleResponse);
        }
        post(path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), Object.assign({}, this.defaultRequest, request, { method: 'POST' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        put(path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), Object.assign({}, this.defaultRequest, request, { method: 'PUT' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        // cannot use "delete" as it is a reserved Javascript word
        del(path, query, body, request) {
            return fetch(Url.create(this.endpointUrl, path, query), Object.assign({}, this.defaultRequest, request, { method: 'DELETE' }, (body ? { body: JSON.stringify(body) } : {})))
                .then(ServiceEndpoint.handleResponse);
        }
        ping(path = 'Ping') {
            return fetch(Url.create(this.endpointUrl, path), Object.assign({}, this.defaultRequest, { method: "GET" }))
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
                .then(response => response.IdentifyUserResult);
        }
        /** @inheritdoc */
        Authenticate(identity, credential) {
            return (identity instanceof core.Ticket) ?
                this.endpoint
                    .post("AuthenticateUserTicket", null, { ticket: identity, credential })
                    .then(response => response.AuthenticateUserTicketResult)
                : this.endpoint
                    .post("AuthenticateUser", null, { user: identity, credential })
                    .then(response => response.AuthenticateUserResult);
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
    class Attribute {
        constructor(
        /** An attribute type. */
        type, 
        /** A list of attribute values. */
        values) {
            this.type = type;
            this.values = values;
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
                .then(result => result.GetUserAttributeResult);
        }
        /** @inheritdoc */
        PutUserAttribute(ticket, user, attributeName, action, attributeData) {
            return this.endpoint
                .put("PutUserAttribute", null, { ticket, user, attributeName, action, attributeData });
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
