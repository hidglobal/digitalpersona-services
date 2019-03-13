import { Policy } from '@common';
import { PolicyTrigger } from './stepUp';

export interface PolicyInfo
{
    policyList: Policy[];
    policyTriggers: PolicyTrigger[];
}
