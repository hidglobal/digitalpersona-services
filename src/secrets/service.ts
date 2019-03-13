import { User, Ticket, ResourceActions, Policy, Base64String } from '@common';
import { Service } from '@private';

export interface ISecretService
{
    GetAuthPolicy(user: User, secretName: string, action: ResourceActions): PromiseLike<Policy[]>;
    DoesSecretExist(user: User, secretName: string): PromiseLike<boolean>;
    ReadSecret(ticket: Ticket, secretName: string): PromiseLike<Base64String>;
    WriteSecret(ticket: Ticket, secretName: string, secretData: Base64String): PromiseLike<boolean>;
    DeleteSecret(ticket: Ticket, secretName: string): PromiseLike<boolean>;
}

export class SecretService extends Service implements ISecretService
{
    public GetAuthPolicy(user: User, secretName: string, action: ResourceActions): PromiseLike<Policy[]>
    {
        return this.endpoint.get("GetAuthPolicy"
            , { user: user.name, type: user.type, secretName, action });
    }
    public DoesSecretExist(user: User, secretName: string): PromiseLike<boolean>
    {
        return this.endpoint.get("DoesSecretExist"
            , { user: user.name, type: user.type, secretName });
    }
    public ReadSecret(ticket: Ticket, secretName: string): PromiseLike<Base64String>
    {
        return this.endpoint.post("ReadSecret"
            , null
            , { body: JSON.stringify({ ticket, secretName }) });
    }
    public WriteSecret(ticket: Ticket, secretName: string, secretData: Base64String): PromiseLike<boolean>
    {
        return this.endpoint.put("WriteSecret"
            , null
            , { body: JSON.stringify({ ticket, secretName, secretData }) }
            , true);
    }

    public DeleteSecret(ticket: Ticket, secretName: string): PromiseLike<boolean>
    {
        return this.endpoint.delete("DeleteSecret"
            , null
            , { body: JSON.stringify({ ticket, secretName }) });
    }
}
