import { Base64String } from './encoders';

export type CredentialId = string;

export class Credential
{
    public readonly id: CredentialId;
    public readonly data: Base64String;

    public constructor(id: string, data: string) {
        this.id = id;
        this.data = data;
    }
}
