import { CredentialId } from '@common';

export interface PolicyElement
{
    cred_id: CredentialId;
}

export interface Policy
{
    policy: PolicyElement[];
}
