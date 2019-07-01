import { CredentialId } from '@digitalpersona/core';

/**
 * A single authentication policy element.
 * Used to match {@CredentialUsed | used credentials} against the policy.\
 * The policy element is satisfied when a list of {@CredentialUsed | used credentials}
 * contains the {@link PolicyElement.cred_id}.
 */
export interface PolicyElement
{
    /** {@link CredentialId} to match against a list of {@CredentialUsed | used credentials}. */
    cred_id: CredentialId;
}

/**
 * A single authentication policy rule, as a list of {@link PolicyElement | policy elements}.
 * When matching a list of {@CredentialUsed | used credentials} against the policy,
 * the policy is satisfied when **every** {@link PolicyElement | policy elements} in the list
 * is satisfied too.
 */
export interface Policy
{
    /** A list of {@link PolicyElement | policy elements} to match against
     * a list of {@CredentialUsed | used credentials}.
     */
    policy: PolicyElement[];
}
