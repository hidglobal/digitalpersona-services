import { User } from '@digitalpersona/core';
import { ResourceActions } from '../../common';
import { Service } from '../../private';
import { PolicyInfo } from './policyInfo';
import { ContextualInfo } from './stepUp';

export interface IPolicyService
{
    // TODO: how browser should create a ContextualInfo?
    GetPolicyInfo(user: User, resourceUri: string, action: ResourceActions, info: ContextualInfo) : Promise<PolicyInfo>;
}

export class PolicyService extends Service implements IPolicyService
{
    constructor (endpointUrl: string) {
        super(endpointUrl)
    }
    public GetPolicyInfo(user: User, resourceUri: string, action: ResourceActions, info: ContextualInfo) : Promise<PolicyInfo>
    {
        return this.endpoint
            .post("GetPolicyInfo", null, { user, resourceUri, action, info })
            .then(result => result.GetPolicyInfoResult);
    }
}
