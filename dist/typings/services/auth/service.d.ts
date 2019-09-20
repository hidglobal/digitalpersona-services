import { User, Ticket, Credential, CredentialId, Base64UrlString } from '@digitalpersona/core';
import { ExtendedAuthResult } from './extendedResult';
import { Service } from '../../private';
/** Branded alias type for an authentication handle. */
export declare type AuthenticationHandle = number & {
    brand?: "dp.services.AuthenticationHandle";
};
/** DigitalPersona Web Authentication (DPWebAuth) service interface. */
export interface IAuthService {
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    Identify(credential: Credential): Promise<Ticket>;
    Authenticate(identity: User | Ticket, credential: Credential): Promise<Ticket>;
    CustomAction(actionId: number, ticket: Ticket, user: User, credential: Credential): Promise<Base64UrlString>;
    CreateAuthentication(identity: User | Ticket | null, credentialId: CredentialId): Promise<AuthenticationHandle>;
    ContinueAuthentication(auth: AuthenticationHandle, data: string): Promise<ExtendedAuthResult>;
    DestroyAuthentication(auth: AuthenticationHandle): Promise<void>;
}
/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
export declare class AuthService extends Service implements IAuthService {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string);
    /** @inheritdoc */
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    /** @inheritdoc */
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    /** @inheritdoc */
    Identify(credential: Credential): Promise<Ticket>;
    /** @inheritdoc */
    Authenticate(identity: User | Ticket, credential: Credential): Promise<Ticket>;
    /** @inheritdoc */
    CustomAction(actionId: number, ticket?: Ticket, user?: User, credential?: Credential): Promise<Base64UrlString>;
    /** @inheritdoc */
    CreateAuthentication(identity: User | Ticket | null, credentialId: CredentialId): Promise<AuthenticationHandle>;
    /** @inheritdoc */
    ContinueAuthentication(authId: AuthenticationHandle, authData: string): Promise<ExtendedAuthResult>;
    /** @inheritdoc */
    DestroyAuthentication(authId: AuthenticationHandle): Promise<void>;
}
