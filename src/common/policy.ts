import { CredentialId } from './credential';

export interface PolicyElement
{
    cred_id: CredentialId;
}

export interface Policy
{
    policy: PolicyElement[];
}
