import { User, Ticket, Base64UrlString } from '@digitalpersona/core';
import { ResourceActions, Policy } from '../../common';
import { Service } from '../../private';
/**
 * DigitalPersona Web Secret (DPWebSecret) service interface.
 */
export interface ISecretService {
    GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>;
    DoesSecretExist(user: User, secretName: string): Promise<boolean>;
    ReadSecret(ticket: Ticket, secretName: string): Promise<Base64UrlString>;
    WriteSecret(ticket: Ticket, secretName: string, secretData: Base64UrlString): Promise<void>;
    DeleteSecret(ticket: Ticket, secretName: string): Promise<void>;
}
/**
 * DigitalPersona Web Secret (DPWebSecret) service client wrapper.
 */
export declare class SecretService extends Service implements ISecretService {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string);
    /** @inheritdoc */
    GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>;
    /** @inheritdoc */
    DoesSecretExist(user: User, secretName: string): Promise<boolean>;
    /** @inheritdoc */
    ReadSecret(ticket: Ticket, secretName: string): Promise<Base64UrlString>;
    /** @inheritdoc */
    WriteSecret(ticket: Ticket, secretName: string, secretData: Base64UrlString): Promise<void>;
    /** @inheritdoc */
    DeleteSecret(ticket: Ticket, secretName: string): Promise<void>;
}
