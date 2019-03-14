import { User, Ticket, Credential, CredentialId, Base64String } from '@common';
import { ExtendedAuthResult } from './extendedResult';
import { Service } from '@private';

export type AuthenticationHandle = number;

export interface IAuthService
{
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64String>;
    IdentifyUser(credential: Credential): Promise<Ticket>;
    AuthenticateUser(user: User, credential: Credential): Promise<Ticket>;
    AuthenticateTicket(ticket: Ticket, credential: Credential): Promise<Ticket>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64String|boolean>;
    CreateUserAuthentication(user: User, credentialId: CredentialId): Promise<AuthenticationHandle>;
    CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): Promise<AuthenticationHandle>;
    ContinueAuthentication(auth: AuthenticationHandle, data: string): Promise<ExtendedAuthResult>;
    DestroyAuthentication(auth: AuthenticationHandle): Promise<boolean>;
}

export class AuthService extends Service implements IAuthService
{
    constructor(endpointUrl: string) {
        super(endpointUrl)
    }

    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint.get("GetUserCredentials"
            , { user: user.name, type: user.type });
    }
    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64String>
    {
        return this.endpoint.get("GetEnrollmentData"
            , { user: user.name, type: user.type, cred_id: credentialId });
    };
    public IdentifyUser(credential: Credential): Promise<Ticket>
    {
        return this.endpoint.post("IdentifyUser"
            , null
            , { body: JSON.stringify({ credential }) });
    }
    public AuthenticateUser(user: User, credential: Credential): Promise<Ticket>
    {
        return this.endpoint.post("AuthenticateUser"
            , null
            , { body: JSON.stringify({ user, credential }) });
    }

    public AuthenticateTicket(ticket: Ticket, credential: Credential): Promise<Ticket>
    {
        return this.endpoint.post("AuthenticateTicket"
            , null
            , { body: JSON.stringify({ ticket, credential }) });
    }
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64String|boolean>
    {
        return this.endpoint.post("CustomAction"
            , null
            , { body: JSON.stringify({ ticket, user, credential, actionId }) }
            , true);
    }
    public CreateUserAuthentication(user: User, credentialId: CredentialId): Promise<AuthenticationHandle>
    {
        return this.endpoint.post("CreateUserAuthentication"
            , null
            , { body: JSON.stringify({ user, credentialId }) });
    }
    public CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): Promise<AuthenticationHandle>
    {
        return this.endpoint.post("CreateTicketAuthentication"
            , null
            , { body: JSON.stringify({ ticket, credentialId }) });
    }
    public ContinueAuthentication(authId: AuthenticationHandle, authData: string): Promise<ExtendedAuthResult>
    {
        return this.endpoint.post("ContinueAuthentication"
            , null
            , { body: JSON.stringify({ authId, authData }) });
    }
    public DestroyAuthentication(authId: AuthenticationHandle): Promise<boolean>
    {
        return this.endpoint.delete("DestroyAuthentication"
            , null,
            { body: JSON.stringify({ authId }) }
            , true);
    }

}
