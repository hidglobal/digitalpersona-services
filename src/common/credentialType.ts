export class CredentialType
{
    public static Password        = new CredentialType("D1A1F561-E14A-4699-9138-2EB523E132CC");
    public static Fingerprints    = new CredentialType("AC184A13-60AB-40e5-A514-E10F777EC2F9");
    public static PIN             = new CredentialType("8A6FCEC3-3C8A-40c2-8AC0-A039EC01BA05");
    public static SmartCard       = new CredentialType("D66CC98D-4153-4987-8EBE-FB46E848EA98");
    public static ProximityCard   = new CredentialType("1F31360C-81C0-4EE0-9ACD-5A4400F66CC2");
    public static ContactlesCard  = new CredentialType("7BF3E290-5BA5-4C2D-AA33-24B48C189399");
    public static LifeQuestions   = new CredentialType("B49E99C6-6C94-42DE-ACD7-FD6B415DF503");
    public static Bluetooth       = new CredentialType("E750A180-577B-47f7-ACD9-F89A7E27FA49");

    public static fromJSON(o: { type: string}): CredentialType {
        return new CredentialType(o.type);
    }
    public toJSON(): string { return this.type; }

    private readonly type: string;

    private constructor(type: string) {
        // TODO: canonicalize/verify
        this.type = type;
    }

    public toGuid(): string {
        return `{${this.type}}`;
    }
}
