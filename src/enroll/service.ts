import { User, CredentialId, Ticket, Credential, Base64UrlString } from '@common';
import { Service } from '@private';
import { AttributeName } from '@claims';
import { Attribute, AttributeAction } from './attribute';

export interface IEnrollService
{
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    CreateUser(securityOfficer: Ticket, user: User, password: string): Promise<boolean>;
    DeleteUser(securityOfficer: Ticket, user: User): Promise<boolean>;
    EnrollUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>;
    DeleteUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>;
    EnrollAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>;
    DeleteAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>;
    GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): Promise<Attribute>;
    PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): Promise<boolean>;
    UnlockUser(user: User, credential: Credential): Promise<boolean>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>;
    IsEnrollmentAllowed(securityOfficer: Ticket, user: User, credentialId: CredentialId): Promise<boolean>;
}

export class EnrollService extends Service implements IEnrollService
{
    constructor(endpointUrl: string) {
        super(endpointUrl)
    }

    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint.get("GetUserCredentials"
            , { user: user.name, type: user.type });
    }

    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>
    {
        return this.endpoint.get("GetEnrollmentData"
            , { user: user.name, type: user.type, cred_id: credentialId });
    }
    public CreateUser(secOfficer: Ticket, user: User, password: string): Promise<boolean>
    {
        return this.endpoint.put("CreateUser"
            , null
            , { body: JSON.stringify({ secOfficer, user, password }) }
            , true);
    }
    public DeleteUser(secOfficer: Ticket, user: User): Promise<boolean>
    {
        return this.endpoint.delete("DeleteUser"
            , null
            , { body: JSON.stringify({ secOfficer, user }) }
            , true);
    }
    public EnrollUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>
    {
        return this.endpoint.put("EnrollUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
    }
    public DeleteUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>
    {
        return this.endpoint.delete("DeleteUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
}
    public EnrollAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>
    {
        return this.endpoint.put("EnrollAltusUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
}
    public DeleteAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<boolean>
    {
        return this.endpoint.delete("DeleteAltusUserCredentials"
            , null
            , { body: JSON.stringify({ secOfficer, owner, credential }) }
            , true);
}
    public GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): Promise<Attribute>
    {
        return this.endpoint.post("GetUserAttribute"
            , null
            , { body: JSON.stringify({ ticket, user, attributeName }) });
    }
    public PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): Promise<boolean>
    {
        return this.endpoint.put("PutUserAttribute"
            , null
            , { body: JSON.stringify({ ticket, user, attributeName, action, attributeData }) }
            , true);

    }
    public UnlockUser(user: User, credential: Credential): Promise<boolean>
    {
        return this.endpoint.post("UnlockUser"
            , null
            , { body: JSON.stringify({ user, credential }) }
            , true);
    }
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>
    {
        return this.endpoint.post("CustomAction"
            , null
            , { body: JSON.stringify({ ticket, user, credential, actionId }) }
            , "");
    }
    public IsEnrollmentAllowed(secOfficer: Ticket, user: User, credentialId: CredentialId): Promise<boolean>
    {
        return this.endpoint.post("IsEnrollmentAllowed"
            , null
            , { body: JSON.stringify({ secOfficer, user, credentialId }) }
            , true);
        }

}
