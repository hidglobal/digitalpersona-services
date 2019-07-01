import { User } from '@digitalpersona/core';
import { ResourceActions } from '../../common';
import { Service } from '../../private';
import { PolicyInfo } from './policyInfo';
import { ContextualInfo } from './stepUp';

/**
 * DigitalPersona Web Policy (DPWebPolicy) service interface.
 */
export interface IPolicyService
{
    // TODO: how browser should create a ContextualInfo?
    GetPolicyInfo(user: User, resourceUri: string, action: ResourceActions, info: ContextualInfo): Promise<PolicyInfo>;
}

/**
 * DigitalPersona Web Policy (DPWebPolicy) service client wrapper.
 */
export class PolicyService extends Service implements IPolicyService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }
    /** @inheritdoc */
    public GetPolicyInfo(
        user: User,
        resourceUri: string,
        action: ResourceActions,
        info: ContextualInfo,
    ): Promise<PolicyInfo>
    {
        return this.endpoint
            .post("GetPolicyInfo", null, { user, resourceUri, action, info })
            .then(result => result.GetPolicyInfoResult);
    }
}
