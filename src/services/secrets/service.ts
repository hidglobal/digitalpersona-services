import { User, Ticket, Base64UrlString } from '@digitalpersona/core';
import { ResourceActions, Policy } from '../../common';
import { Service } from '../../private';

/**
 * DigitalPersona Web Secret (DPWebSecret) service interface.
 */
export interface ISecretService
{
    GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>;
    DoesSecretExist(user: User, secretName: string): Promise<boolean>;
    ReadSecret(ticket: Ticket, secretName: string): Promise<Base64UrlString>;
    WriteSecret(ticket: Ticket, secretName: string, secretData: Base64UrlString): Promise<void>;
    DeleteSecret(ticket: Ticket, secretName: string): Promise<void>;
}

/**
 * DigitalPersona Web Secret (DPWebSecret) service client wrapper.
 */
export class SecretService extends Service implements ISecretService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    public GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>
    {
        return this.endpoint
            .get("GetAuthPolicy", { user: user.name, type: user.type, secretName, action })
            .then(result => result.GetAuthPolicyResult);
    }
    /** @inheritdoc */
    public DoesSecretExist(user: User, secretName: string): Promise<boolean>
    {
        return this.endpoint
            .get("DoesSecretExist", { user: user.name, type: user.type, secretName })
            .then(result => result.DoesSecretExistResult);
    }
    /** @inheritdoc */
    public ReadSecret(ticket: Ticket, secretName: string): Promise<Base64UrlString>
    {
        return this.endpoint
            .post("ReadSecret", null, { ticket, secretName })
            .then(result => result.ReadSecretResult);
    }
    /** @inheritdoc */
    public WriteSecret(ticket: Ticket, secretName: string, secretData: Base64UrlString): Promise<void>
    {
        return this.endpoint
            .put("WriteSecret", null, { ticket, secretName, secretData });
    }
    /** @inheritdoc */
    public DeleteSecret(ticket: Ticket, secretName: string): Promise<void>
    {
        return this.endpoint
            .del("DeleteSecret", null, { ticket, secretName });
    }
}
