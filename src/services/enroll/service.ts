import { User, CredentialId, Ticket, Credential, Base64UrlString } from '@digitalpersona/core';
import { Service } from '../../private';
import { Attribute, AttributeAction } from '../../common';

/**
 * DigitalPersona Web Enroll (DPWebEnroll) service interface.
 */
export interface IEnrollService
{
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
export class EnrollService extends Service implements IEnrollService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    public GetUserCredentials(user: User): Promise<CredentialId[]>
    {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(result => result.GetUserCredentialsResult);
    }
    /** @inheritdoc */
    public GetEnrollmentData(user: User, credentialId: CredentialId): Promise<Base64UrlString>
    {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(result => result.GetEnrollmentDataResult);
    }
    /** @inheritdoc */
    public CreateUser(secOfficer: Ticket, user: User, password: string): Promise<void>
    {
        return this.endpoint
            .put("CreateUser", null, { secOfficer, user, password });
    }
    /** @inheritdoc */
    public DeleteUser(secOfficer: Ticket, user: User): Promise<void>
    {
        return this.endpoint
            .del("DeleteUser", null, { secOfficer, user });
    }
    /** @inheritdoc */
    public EnrollUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .put("EnrollUserCredentials", null, { secOfficer, owner, credential });
    }
    /** @inheritdoc */
    public DeleteUserCredentials(secOfficer: Ticket, owner: Ticket, credential: Credential): Promise<void>
    {
        return this.endpoint
            .del("DeleteUserCredentials", null, { secOfficer, owner, credential });
    }
    /** @inheritdoc */
    public EnrollAltusUserCredentials(secOfficer: Ticket, user: User, credential: Credential): Promise<void>
    {
        return this.endpoint
            .put("EnrollAltusUserCredentials", null, { secOfficer, user, credential });
    }
    /** @inheritdoc */
    public DeleteAltusUserCredentials(secOfficer: Ticket, user: User, credential: Credential): Promise<void>
    {
        return this.endpoint
            .del("DeleteAltusUserCredentials", null, { secOfficer, user, credential });
    }
    /** @inheritdoc */
    public GetUserAttribute(ticket: Ticket, user: User, attributeName: string): Promise<Attribute>
    {
        return this.endpoint
            .post("GetUserAttribute", null, { ticket, user, attributeName })
            .then(result => ({
                name: attributeName,
                data: result.GetUserAttributeResult,
            }));
    }
    /** @inheritdoc */
    public PutUserAttribute(
        ticket: Ticket,
        user: User,
        attribute: Attribute,
        action: AttributeAction,
    ): Promise<void>
    {
        return this.endpoint
            .put("PutUserAttribute", null, {
                ticket, user, action,
                attributeName: attribute.name,
                attributeData: attribute.data });
    }
    /** @inheritdoc */
    public UnlockUser(user: User, credential: Credential): Promise<void>
    {
        return this.endpoint
            .post("UnlockUser", null, { user, credential });
    }
    /** @inheritdoc */
    public CustomAction(ticket: Ticket, user: User, credential: Credential, actionId: number): Promise<Base64UrlString>
    {
        return this.endpoint
            .post("CustomAction", null, { ticket, user, credential, actionId })
            .then(result => result.CustomActionResult);
    }
    /** @inheritdoc */
    public IsEnrollmentAllowed(secOfficer: Ticket, user: User, credentialId: CredentialId): Promise<void>
    {
        return this.endpoint
            .post("IsEnrollmentAllowed", null, { secOfficer, user, credentialId });
    }

}
