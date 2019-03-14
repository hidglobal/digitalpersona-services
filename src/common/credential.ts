import { Base64String } from './encoders';

export type CredentialId = string;

export class Credential
{
    public static Password        : CredentialId = "D1A1F561-E14A-4699-9138-2EB523E132CC";
    public static Fingerprints    : CredentialId = "AC184A13-60AB-40e5-A514-E10F777EC2F9";
    public static PIN             : CredentialId = "8A6FCEC3-3C8A-40c2-8AC0-A039EC01BA05";
    public static SmartCard       : CredentialId = "D66CC98D-4153-4987-8EBE-FB46E848EA98";
    public static ProximityCard   : CredentialId = "1F31360C-81C0-4EE0-9ACD-5A4400F66CC2";
    public static ContactlesCard  : CredentialId = "7BF3E290-5BA5-4C2D-AA33-24B48C189399";
    public static LifeQuestions   : CredentialId = "B49E99C6-6C94-42DE-ACD7-FD6B415DF503";
    public static Bluetooth       : CredentialId = "E750A180-577B-47f7-ACD9-F89A7E27FA49";
    public static OneTimePassword : CredentialId = "324C38BD-0B51-4E4D-BD75-200DA0C8177F";

    public readonly id: CredentialId;
    public readonly data: Base64String;

    public constructor(id: string, data: string) {
        this.id = id;
        this.data = data;
    }
}
