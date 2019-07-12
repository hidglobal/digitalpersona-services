import { Service } from '../../private';
/**
 * DigitalPersona Web Secret (DPWebSecret) service client wrapper.
 */
export class SecretService extends Service {
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    GetAuthPolicy(user, secretName, action) {
        return this.endpoint
            .get("GetAuthPolicy", { user: user.name, type: user.type, secretName, action })
            .then(result => result.GetAuthPolicyResult);
    }
    /** @inheritdoc */
    DoesSecretExist(user, secretName) {
        return this.endpoint
            .get("DoesSecretExist", { user: user.name, type: user.type, secretName })
            .then(result => result.DoesSecretExistResult);
    }
    /** @inheritdoc */
    ReadSecret(ticket, secretName) {
        return this.endpoint
            .post("ReadSecret", null, { ticket, secretName })
            .then(result => result.ReadSecretResult);
    }
    /** @inheritdoc */
    WriteSecret(ticket, secretName, secretData) {
        return this.endpoint
            .put("WriteSecret", null, { ticket, secretName, secretData });
    }
    /** @inheritdoc */
    DeleteSecret(ticket, secretName) {
        return this.endpoint
            .del("DeleteSecret", null, { ticket, secretName });
    }
}
//# sourceMappingURL=service.js.map