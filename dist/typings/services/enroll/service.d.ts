import { User, CredentialId, Ticket, Credential, Base64UrlString } from '@digitalpersona/core';
import { Service } from '../../private';
import { Attribute, AttributeAction } from '../../common';
/**
 * DigitalPersona Web Enroll (DPWebEnroll) service interface.
 */
export interface IEnrollService {
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    CreateUser(securityOfficer: Ticket, user: User, password: string): Promise<void>;
    DeleteUser(securityOfficer: Ticket, user: User): Promise<void>;
    EnrollUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    DeleteUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    EnrollAltusUserCredentials(securityOfficer: Ticket, user: User, credential: Credential): Promise<void>;
    DeleteAltusUserCredentials(securityOfficer: Ticket, user: User, credential: Credential): Promise<void>;
    GetUserAttribute(ticket: Ticket, user: User, attributeName: string): Promise<Attribute>;
    PutUserAttribute(ticket: Ticket, user: User, attribute: Attribute, action: AttributeAction): Promise<void>;
    UnlockUser(user: User, credential: Credential): Promise<void>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>;
    IsEnrollmentAllowed(securityOfficer: Ticket, user: User, credentialId: CredentialId): Promise<void>;
}
/**
 * DigitalPersona Web Enroll (DPWebEnroll) service client wrapper.
 */
export declare class EnrollService extends Service implements IEnrollService {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string);
    /** @inheritdoc */
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    /** @inheritdoc */
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    /** @inheritdoc */
    CreateUser(secOfficer: Ticket, user: User, password: string): Promise<void>;
    /** @inheritdoc */
    DeleteUser(secOfficer: Ticket, user: User): Promise<void>;
    /** @inheritdoc */
    EnrollUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    /** @inheritdoc */
    DeleteUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    /** @inheritdoc */
    EnrollAltusUserCredentials(secOfficer: Ticket, user: User, credential: Credential): Promise<void>;
    /** @inheritdoc */
    DeleteAltusUserCredentials(secOfficer: Ticket, user: User, credential: Credential): Promise<void>;
    /** @inheritdoc */
    GetUserAttribute(ticket: Ticket, user: User, attributeName: string): Promise<Attribute>;
    /** @inheritdoc */
    PutUserAttribute(ticket: Ticket, user: User, attribute: Attribute, action: AttributeAction): Promise<void>;
    /** @inheritdoc */
    UnlockUser(user: User, credential: Credential): Promise<void>;
    /** @inheritdoc */
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>;
    /** @inheritdoc */
    IsEnrollmentAllowed(secOfficer: Ticket, user: User, credentialId: CredentialId): Promise<void>;
}
