import { User, ResourceActions } from '@common';
import { Service } from '@private';
import { PolicyInfo } from './policyInfo';
import { ContextualInfo } from './stepUp';

export interface IPolicyService
{
    // TODO: how browser should create a ContextualInfo?
    GetPolicyInfo(user: User, resourceUri: string, action: ResourceActions, info: ContextualInfo) : PromiseLike<PolicyInfo>;
}

export class PolicyService extends Service implements IPolicyService
{
    public GetPolicyInfo(user: User, resourceUri: string, action: ResourceActions, info: ContextualInfo) : PromiseLike<PolicyInfo>
    {
        return this.endpoint.get("GetPolicyInfo"
            , { user: user.name, type: user.type, resourceUri, action, info });
    }
}
