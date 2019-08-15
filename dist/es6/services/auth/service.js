import { Ticket } from '@digitalpersona/core';
import { Service } from '../../private';
/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
export class AuthService extends Service {
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
            .then(response => new Ticket(response.IdentifyUserResult.jwt));
    }
    /** @inheritdoc */
    Authenticate(identity, credential) {
        return (identity instanceof Ticket) ?
            this.endpoint
                .post("AuthenticateUserTicket", null, { ticket: identity, credential })
                .then(response => new Ticket(response.AuthenticateUserTicketResult.jwt))
            : this.endpoint
                .post("AuthenticateUser", null, { user: identity, credential })
                .then(response => new Ticket(response.AuthenticateUserResult.jwt));
    }
    /** @inheritdoc */
    CustomAction(actionId, ticket, user, credential) {
        return this.endpoint
            .post("CustomAction", null, { actionId, ticket, user, credential })
            .then(response => response.CustomActionResult);
    }
    /** @inheritdoc */
    CreateAuthentication(identity, credentialId) {
        return (identity instanceof Ticket) ?
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
//# sourceMappingURL=service.js.map