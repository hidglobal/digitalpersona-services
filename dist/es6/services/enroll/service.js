import { Service } from '../../private';
/**
 * DigitalPersona Web Enroll (DPWebEnroll) service client wrapper.
 */
export class EnrollService extends Service {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    GetUserCredentials(user) {
        return this.endpoint
            .get("GetUserCredentials", { user: user.name, type: user.type })
            .then(result => result.GetUserCredentialsResult);
    }
    /** @inheritdoc */
    GetEnrollmentData(user, credentialId) {
        return this.endpoint
            .get("GetEnrollmentData", { user: user.name, type: user.type, cred_id: credentialId })
            .then(result => result.GetEnrollmentDataResult);
    }
    /** @inheritdoc */
    CreateUser(secOfficer, user, password) {
        return this.endpoint
            .put("CreateUser", null, { secOfficer, user, password });
    }
    /** @inheritdoc */
    DeleteUser(secOfficer, user) {
        return this.endpoint
            .del("DeleteUser", null, { secOfficer, user });
    }
    /** @inheritdoc */
    EnrollUserCredentials(secOfficer, owner, credential) {
        return this.endpoint
            .put("EnrollUserCredentials", null, { secOfficer, owner, credential });
    }
    /** @inheritdoc */
    DeleteUserCredentials(secOfficer, owner, credential) {
        return this.endpoint
            .del("DeleteUserCredentials", null, { secOfficer, owner, credential });
    }
    /** @inheritdoc */
    EnrollAltusUserCredentials(secOfficer, user, credential) {
        return this.endpoint
            .put("EnrollAltusUserCredentials", null, { secOfficer, user, credential });
    }
    /** @inheritdoc */
    DeleteAltusUserCredentials(secOfficer, user, credential) {
        return this.endpoint
            .del("DeleteAltusUserCredentials", null, { secOfficer, user, credential });
    }
    /** @inheritdoc */
    GetUserAttribute(ticket, user, attributeName) {
        return this.endpoint
            .post("GetUserAttribute", null, { ticket, user, attributeName })
            .then(result => ({
            name: attributeName,
            data: result.GetUserAttributeResult,
        }));
    }
    /** @inheritdoc */
    PutUserAttribute(ticket, user, attribute, action) {
        return this.endpoint
            .put("PutUserAttribute", null, {
            ticket, user, action,
            attributeName: attribute.name,
            attributeData: attribute.data
        });
    }
    /** @inheritdoc */
    UnlockUser(user, credential) {
        return this.endpoint
            .post("UnlockUser", null, { user, credential });
    }
    /** @inheritdoc */
    CustomAction(ticket, user, credential, actionId) {
        return this.endpoint
            .post("CustomAction", null, { ticket, user, credential, actionId })
            .then(result => result.CustomActionResult);
    }
    /** @inheritdoc */
    IsEnrollmentAllowed(secOfficer, user, credentialId) {
        return this.endpoint
            .post("IsEnrollmentAllowed", null, { secOfficer, user, credentialId });
    }
}
//# sourceMappingURL=service.js.map