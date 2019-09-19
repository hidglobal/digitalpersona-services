import { __extends } from "tslib";
import { Ticket } from '@digitalpersona/core';
import { Service } from '../../private';
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
            .then(function (response) { return new Ticket(response.IdentifyUserResult.jwt); });
    };
    /** @inheritdoc */
    AuthService.prototype.Authenticate = function (identity, credential) {
        return (identity instanceof Ticket) ?
            this.endpoint
                .post("AuthenticateUserTicket", null, { ticket: identity, credential: credential })
                .then(function (response) { return new Ticket(response.AuthenticateUserTicketResult.jwt); })
            : this.endpoint
                .post("AuthenticateUser", null, { user: identity, credential: credential })
                .then(function (response) { return new Ticket(response.AuthenticateUserResult.jwt); });
    };
    /** @inheritdoc */
    AuthService.prototype.CustomAction = function (actionId, ticket, user, credential) {
        return this.endpoint
            .post("CustomAction", null, { actionId: actionId, ticket: ticket, user: user, credential: credential })
            .then(function (response) { return response.CustomActionResult; });
    };
    /** @inheritdoc */
    AuthService.prototype.CreateAuthentication = function (identity, credentialId) {
        return (identity instanceof Ticket) ?
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
export { AuthService };
//# sourceMappingURL=service.js.map