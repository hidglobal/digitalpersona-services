import { Policy } from '../../common';
import { PolicyTrigger } from './stepUp';
/**
 * An information about authentication policy.
 */
export interface PolicyInfo {
    /** A list of policy rules.
     * The policy is satisfied when **any** of the rules in the list is satisfied.
     */
    policyList: Policy[];
    /** A list of step-up triggers. */
    policyTriggers: PolicyTrigger[];
}
