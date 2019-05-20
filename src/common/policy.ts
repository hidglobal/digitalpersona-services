import { CredentialId } from '@digitalpersona/core';

export interface PolicyElement
{
    cred_id: CredentialId;
}

export interface Policy
{
    policy: PolicyElement[];
}
