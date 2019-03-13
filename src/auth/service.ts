import { User, Ticket, Credential, CredentialId, Base64String } from '@common';
import { ExtendedAuthResult } from './extendedResult';
import { Service } from '@private';

export type AuthenticationHandle = number;

export interface IAuthService
{
    GetUserCredentials(user: User): PromiseLike<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): PromiseLike<Base64String>;
    IdentifyUser(credential: Credential): PromiseLike<Ticket>;
    AuthenticateUser(user: User, credential: Credential): PromiseLike<Ticket>;
    AuthenticateTicket(ticket: Ticket, credential: Credential): PromiseLike<Ticket>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): PromiseLike<Base64String|boolean>;
    CreateUserAuthentication(user: User, credentialId: CredentialId): PromiseLike<AuthenticationHandle>;
    CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): PromiseLike<AuthenticationHandle>;
    ContinueAuthentication(auth: AuthenticationHandle, data: string): PromiseLike<ExtendedAuthResult>;
    DestroyAuthentication(auth: AuthenticationHandle): PromiseLike<boolean>;
}

export class AuthService extends Service implements IAuthService
{
    public GetUserCredentials(user: User): PromiseLike<CredentialId[]>
    {
        return this.endpoint.get("GetUserCredentials"
            , { user: user.name, type: user.type });
    }
    public GetEnrollmentData(user: User, credentialId: CredentialId): PromiseLike<Base64String>
    {
        return this.endpoint.get("GetEnrollmentData"
            , { user: user.name, type: user.type, cred_id: credentialId });
    };
    public IdentifyUser(credential: Credential): PromiseLike<Ticket>
    {
        return this.endpoint.post("IdentifyUser"
            , null
            , { body: JSON.stringify({ credential }) });
    }
    public AuthenticateUser(user: User, credential: Credential): PromiseLike<Ticket>
    {
        return this.endpoint.post("AuthenticateUser"
            , null
            , { body: JSON.stringify({ user, credential }) });
    }

    public AuthenticateTicket(ticket: Ticket, credential: Credential): PromiseLike<Ticket>
    {
        return this.endpoint.post("AuthenticateTicket"
            , null
            , { body: JSON.stringify({ ticket, credential }) });
    }
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): PromiseLike<Base64String|boolean>
    {
        return this.endpoint.post("CustomAction"
            , null
            , { body: JSON.stringify({ ticket, user, credential, actionId }) }
            , true);
    }
    public CreateUserAuthentication(user: User, credentialId: CredentialId): PromiseLike<AuthenticationHandle>
    {
        return this.endpoint.post("CreateUserAuthentication"
            , null
            , { body: JSON.stringify({ user, credentialId }) });
    }
    public CreateTicketAuthentication(ticket: Ticket, credentialId: CredentialId): PromiseLike<AuthenticationHandle>
    {
        return this.endpoint.post("CreateTicketAuthentication"
            , null
            , { body: JSON.stringify({ ticket, credentialId }) });
    }
    public ContinueAuthentication(authId: AuthenticationHandle, authData: string): PromiseLike<ExtendedAuthResult>
    {
        return this.endpoint.post("ContinueAuthentication"
            , null
            , { body: JSON.stringify({ authId, authData }) });
    }
    public DestroyAuthentication(authId: AuthenticationHandle): PromiseLike<boolean>
    {
        return this.endpoint.delete("DestroyAuthentication"
            , null,
            { body: JSON.stringify({ authId }) });
    }

}
