import { User, Ticket, Credential, CredentialId, Base64UrlString } from '@digitalpersona/core';
import { ExtendedAuthResult } from './extendedResult';
import { Service } from '../../private';

/** Branded alias type for an authentication handle. */
export type AuthenticationHandle = number
                                 & { brand?: "dp.services.AuthenticationHandle" };

/** DigitalPersona Web Authentication (DPWebAuth) service interface. */
export interface IAuthService
{
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    Identify(credential: Credential): Promise<Ticket>;
    Authenticate(identity: User|Ticket, credential: Credential): Promise<Ticket>;
    CustomAction(actionId: number, ticket: Ticket, user: User, credential: Credential): Promise<Base64UrlString>;
    CreateAuthentication(identity: User|Ticket|null, credentialId: CredentialId): Promise<AuthenticationHandle>;
    ContinueAuthentication(auth: AuthenticationHandle, data: string): Promise<ExtendedAuthResult>;
    DestroyAuthentication(auth: AuthenticationHandle): Promise<void>;
}

/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
export class AuthService extends Service implements IAuthService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }

    /** @inheritdoc */
    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(response => response.GetUserCredentialsResult);
    }
    /** @inheritdoc */
    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>
    {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(response => response.GetEnrollmentDataResult);
    }
    /** @inheritdoc */
    public Identify(credential: Credential): Promise<Ticket>
    {
        return this.endpoint
            .post("IdentifyUser", null, { credential })
            .then(response => new Ticket(response.IdentifyUserResult.jwt));
    }
    /** @inheritdoc */
    public Authenticate(identity: User|Ticket, credential: Credential): Promise<Ticket>
    {
        return (identity instanceof Ticket) ?
            this.endpoint
                .post("AuthenticateUserTicket", null, { ticket: identity, credential })
                .then(response => new Ticket(response.AuthenticateUserTicketResult.jwt))
        :   this.endpoint
                .post("AuthenticateUser", null, { user: identity, credential })
                .then(response => new Ticket(response.AuthenticateUserResult.jwt));
    }
    /** @inheritdoc */
    public CustomAction(actionId: number, ticket?: Ticket, user?: User, credential?: Credential)
    : Promise<Base64UrlString>
    {
        return this.endpoint
            .post("CustomAction", null, { actionId, ticket, user, credential })
            .then(response => response.CustomActionResult);
    }
    /** @inheritdoc */
    public CreateAuthentication(identity: User|Ticket|null, credentialId: CredentialId): Promise<AuthenticationHandle>
    {
        return (identity instanceof Ticket) ?
            this.endpoint
                .post("CreateTicketAuthentication", null, { ticket: identity, credentialId })
                .then(response => response.CreateTicketAuthenticationResult)
        :   this.endpoint
                .post("CreateUserAuthentication", null, { user: identity, credentialId })
                .then(response => response.CreateUserAuthenticationResult);
    }
    /** @inheritdoc */
    public ContinueAuthentication(authId: AuthenticationHandle, authData: string): Promise<ExtendedAuthResult>
    {
        return this.endpoint
            .post("ContinueAuthentication", null, { authId, authData })
            .then(response => response.ContinueAuthenticationResult);
    }
    /** @inheritdoc */
    public DestroyAuthentication(authId: AuthenticationHandle): Promise<void>
    {
        return this.endpoint
            .del("DestroyAuthentication", null, { authId });
    }
}
