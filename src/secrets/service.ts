import { User, Ticket, ResourceActions, Policy, Base64String } from '@common';
import { Service } from '@private';

export interface ISecretService
{
    GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>;
    DoesSecretExist(user: User, secretName: string): Promise<boolean>;
    ReadSecret(ticket: Ticket, secretName: string): Promise<Base64String>;
    WriteSecret(ticket: Ticket, secretName: string, secretData: Base64String): Promise<void>;
    DeleteSecret(ticket: Ticket, secretName: string): Promise<void>;
}

export class SecretService extends Service implements ISecretService
{
    constructor(endpointUrl: string) {
        super(endpointUrl)
    }

    public GetAuthPolicy(user: User, secretName: string, action: ResourceActions): Promise<Policy[]>
    {
        return this.endpoint
            .get("GetAuthPolicy", { user: user.name, type: user.type, secretName, action })
            .then(result => result.GetAuthPolicyResult);
    }
    public DoesSecretExist(user: User, secretName: string): Promise<boolean>
    {
        return this.endpoint
            .get("DoesSecretExist", { user: user.name, type: user.type, secretName })
            .then(result => result.DoesSecretExistResult);
    }
    public ReadSecret(ticket: Ticket, secretName: string): Promise<Base64String>
    {
        return this.endpoint
            .post("ReadSecret", null, { ticket, secretName })
            .then(result => result.ReadSecretResult);
    }
    public WriteSecret(ticket: Ticket, secretName: string, secretData: Base64String): Promise<void>
    {
        return this.endpoint
            .put("WriteSecret", null, { ticket, secretName, secretData });
    }

    public DeleteSecret(ticket: Ticket, secretName: string): Promise<void>
    {
        return this.endpoint
            .delete("DeleteSecret", null, { ticket, secretName });
    }
}
