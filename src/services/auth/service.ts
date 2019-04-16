import { User, Ticket, Credential, CredentialId, Base64String } from '../../common';
import { ExtendedAuthResult } from './extendedResult';
import { Service } from '../../private';

export type AuthenticationHandle = number;

export interface IAuthService
{
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64String>;
    IdentifyUser(credential: Credential): Promise<Ticket>;
    AuthenticateUser(user: User, credential: Credential): Promise<Ticket>;
    AuthenticateTicket(ticket: Ticket, credential: Credential): Promise<Ticket>;
    CustomAction(actionId: number, ticket: Ticket, user: User, credential: Credential): Promise<Base64String>;
    CreateUserAuthentication(user: User|null, credentialId: CredentialId): Promise<AuthenticationHandle>;
    CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): Promise<AuthenticationHandle>;
    ContinueAuthentication(auth: AuthenticationHandle, data: string): Promise<ExtendedAuthResult>;
    DestroyAuthentication(auth: AuthenticationHandle): Promise<void>;
}

export class AuthService extends Service implements IAuthService
{
    constructor(endpointUrl: string) {
        super(endpointUrl)
    }

    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(response => response.GetUserCredentialsResult);
    }
    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64String>
    {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(response => response.GetEnrollmentDataResult);
    };
    public IdentifyUser(credential: Credential): Promise<Ticket>
    {
        return this.endpoint
            .post("IdentifyUser", null, { credential })
            .then(response => response.IdentifyUserResult);
    }
    public AuthenticateUser(user: User, credential: Credential): Promise<Ticket>
    {
        return this.endpoint
            .post("AuthenticateUser", null, { user, credential })
            .then(response => response.AuthenticateUserResult);
    }

    public AuthenticateTicket(ticket: Ticket, credential: Credential): Promise<Ticket>
    {
        return this.endpoint
            .post("AuthenticateTicket", null, { ticket, credential })
            .then(response => response.AuthenticateTicketResult);
    }
    public CustomAction(actionId: number, ticket?: Ticket, user?: User, credential?: Credential): Promise<Base64String>
    {
        return this.endpoint
            .post("CustomAction", null, { actionId, ticket, user, credential })
            .then(response => response.CustomActionResult);
    }
    public CreateUserAuthentication(user: User|null, credentialId: CredentialId): Promise<AuthenticationHandle>
    {
        return this.endpoint
            .post("CreateUserAuthentication", null, { user, credentialId })
            .then(response => response.CreateUserAuthenticationResult);
    }
    public CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): Promise<AuthenticationHandle>
    {
        return this.endpoint
            .post("CreateTicketAuthentication", null, { ticket, credentialId })
            .then(response => response.CreateTicketAuthenticationResult);
    }
    public ContinueAuthentication(authId: AuthenticationHandle, authData: string): Promise<ExtendedAuthResult>
    {
        return this.endpoint
            .post("ContinueAuthentication", null, { authId, authData })
            .then(response => response.ContinueAuthenticationResult);
    }
    public DestroyAuthentication(authId: AuthenticationHandle): Promise<void>
    {
        return this.endpoint
            .del("DestroyAuthentication", null, { authId });
    }

}
