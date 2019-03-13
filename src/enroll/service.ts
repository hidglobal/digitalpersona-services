import { User, CredentialId, Ticket, Credential, Base64UrlString } from '@common';
import { Service } from '@private';
import { AttributeName } from '@claims';
import { Attribute, AttributeAction } from './attribute';

export interface IEnrollService
{
    GetUserCredentials(user: User): PromiseLike<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): PromiseLike<Base64UrlString>;
    CreateUser(securityOfficer: Ticket, user: User, password: string): PromiseLike<boolean>;
    DeleteUser(securityOfficer: Ticket, user: User): PromiseLike<boolean>;
    EnrollUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>;
    DeleteUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>;
    EnrollAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>;
    DeleteAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>;
    GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): PromiseLike<Attribute>;
    PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): PromiseLike<boolean>;
    UnlockUser(user: User, credential: Credential): PromiseLike<boolean>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): PromiseLike<Base64UrlString|boolean>;
    IsEnrollmentAllowed(securityOfficer: Ticket, user: User, credentialId: CredentialId): PromiseLike<boolean>;
}

export class EnrollService extends Service implements IEnrollService
{
    public GetUserCredentials(user: User): PromiseLike<CredentialId[]>
    {
        return this.endpoint.get("GetUserCredentials"
            , { user: user.name, type: user.type });
    }

    public GetEnrollmentData(user: User, credentialId: CredentialId): PromiseLike<Base64UrlString>
    {
        return this.endpoint.get("GetEnrollmentData"
            , { user: user.name, type: user.type, cred_id: credentialId });
    }
    public CreateUser(secOfficer: Ticket, user: User, password: string): PromiseLike<boolean>
    {
        return this.endpoint.put("CreateUser"
            , null
            , { body: JSON.stringify({ secOfficer, user, password }) }
            , true);
    }
    public DeleteUser(secOfficer: Ticket, user: User): PromiseLike<boolean>
    {
        return this.endpoint.delete("DeleteUser"
            , null
            , { body: JSON.stringify({ secOfficer, user }) });
    }
    public EnrollUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>
    {
        return this.endpoint.put("EnrollUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
    }
    public DeleteUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>
    {
        return this.endpoint.delete("DeleteUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) });
}
    public EnrollAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>
    {
        return this.endpoint.put("EnrollAltusUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
}
    public DeleteAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): PromiseLike<boolean>
    {
        return this.endpoint.delete("DeleteAltusUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) });
}
    public GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): PromiseLike<Attribute>
    {
        return this.endpoint.post("GetUserAttribute"
            , null
            , { body: JSON.stringify({ ticket, user, attributeName }) });
    }
    public PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): PromiseLike<boolean>
    {
        return this.endpoint.put("PutUserAttribute"
            , null
            , { body: JSON.stringify({ ticket, user, attributeName, action, attributeData }) }
            , true);

    }
    public UnlockUser(user: User, credential: Credential): PromiseLike<boolean>
    {
        return this.endpoint.post("UnlockUser"
            , null
            , { body: JSON.stringify({ user, credential }) }
            , true);
    }
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): PromiseLike<Base64UrlString|boolean>
    {
        return this.endpoint.post("CustomAction"
            , null
            , { body: JSON.stringify({ ticket, user, credential, actionId }) }
            , true)
;
}
    public IsEnrollmentAllowed(secOfficer: Ticket, user: User, credentialId: CredentialId): PromiseLike<boolean>
    {
        return this.endpoint.post("IsEnrollmentAllowed"
            , null
            , { body: JSON.stringify({ secOfficer, user, credentialId }) }
            , true);
        }

}
