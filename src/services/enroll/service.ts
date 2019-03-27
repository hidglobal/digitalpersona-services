import { User, CredentialId, Ticket, Credential, Base64UrlString } from '../../common';
import { Service } from '../../private';
import { AttributeName } from '../../services';
import { Attribute, AttributeAction } from './attribute';

export interface IEnrollService
{
    GetUserCredentials(user: User): Promise<CredentialId[]>;
    GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>;
    CreateUser(securityOfficer: Ticket, user: User, password: string): Promise<void>;
    DeleteUser(securityOfficer: Ticket, user: User): Promise<void>;
    EnrollUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    DeleteUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    EnrollAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    DeleteAltusUserCredentials(securityOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>;
    GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): Promise<Attribute>;
    PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): Promise<void>;
    UnlockUser(user: User, credential: Credential): Promise<void>;
    CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>;
    IsEnrollmentAllowed(securityOfficer: Ticket, user: User, credentialId: CredentialId): Promise<void>;
}

export class EnrollService extends Service implements IEnrollService
{
    constructor(endpointUrl: string) {
        super(endpointUrl)
    }

    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(result => result.GetUserCredentialsResult);
    }

    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>
    {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(result => result.GetEnrollmentDataResult);
    }
    public CreateUser(secOfficer: Ticket, user: User, password: string): Promise<void>
    {
        return this.endpoint
            .put("CreateUser", null, { secOfficer, user, password });
    }
    public DeleteUser(secOfficer: Ticket, user: User): Promise<void>
    {
        return this.endpoint
            .del("DeleteUser", null, { secOfficer, user });
    }
    public EnrollUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .put("EnrollUserCredentials", null, { secOfficer, owner, credential });
    }
    public DeleteUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .del("DeleteUserCredentials", null, { secOfficer, owner, credential });
    }
    public EnrollAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .put("EnrollAltusUserCredentials", null, { secOfficer, owner, credential });
    }
    public DeleteAltusUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .del("DeleteAltusUserCredentials", null, { secOfficer, owner, credential });
    }
    public GetUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName): Promise<Attribute>
    {
        return this.endpoint
            .post("GetUserAttribute", null, { ticket, user, attributeName })
            .then(result => result.GetUserAttributeResult);
    }
    public PutUserAttribute(ticket: Ticket, user: User, attributeName: AttributeName, action: AttributeAction, attributeData: Attribute): Promise<void>
    {
        return this.endpoint
            .put("PutUserAttribute", null, { ticket, user, attributeName, action, attributeData });
    }
    public UnlockUser(user: User, credential: Credential): Promise<void>
    {
        return this.endpoint
            .post("UnlockUser", null, { user, credential });
    }
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>
    {
        return this.endpoint
            .post("CustomAction", null, { ticket, user, credential, actionId })
            .then(result => result.CustomActionResult);
    }
    public IsEnrollmentAllowed(secOfficer: Ticket, user: User, credentialId: CredentialId): Promise<void>
    {
        return this.endpoint
            .post("IsEnrollmentAllowed", null, { secOfficer, user, credentialId });
    }

}
