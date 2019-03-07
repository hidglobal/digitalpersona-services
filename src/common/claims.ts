export class CredentialUsed {
    public readonly id: string;
    public readonly time: number;

    constructor(id: string, time: number) {
        this.id = id;
        this.time = time;
    }
}

export class JWTClaim {

    public static IssuerDomain = (name: string) => new JWTClaim("dom", name);
    public static IssuerName = (name: string) => new JWTClaim("iss", name);
    public static IssuedAt = (time: number) => new JWTClaim("iat", time);
    public static ExpiresAfter = (time: number) => new JWTClaim("exp", time);
    public static SubjectName = (name: string) => new JWTClaim("sub", name);
    public static SubjectUid = (value: string) => new JWTClaim("uid", value);
    public static TokensId = (id: string) => new JWTClaim("jti", id);
    public static CredentialsUsed = (creds: CredentialUsed[]) => new JWTClaim("crd", creds);
    public static WindowsAccountName = (name: string) => new JWTClaim("wan", name);
    public static T24Principal = (name: string) => new JWTClaim("t24", name);

    public readonly name: string;
    public readonly value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

export interface IJWTClaimSet {
    jti: string;
    dom: string;
    iss: string;
    iat: number;
    exp: number;
    sub: string;
    uid: string;
    crd?: CredentialUsed[];
    t24?: string;
}

export class JWTClaimSet {
    private readonly claims: IJWTClaimSet;

    constructor(claims: IJWTClaimSet) {
        this.claims = claims;
    }
    public get IssuerDomain() { return this.claims.dom; }
    public get IssuerName() { return this.claims.iss; }
    public get IssuedAt() { return this.claims.iat; }
    public get ExpiresAfter() { return this.claims.exp; }
    public get SubjectName() { return this.claims.sub; }
    public get SubjectUid() { return this.claims.uid; }
    public get TokensId() { return this.claims.jti; }
    public get CredentialsUsed() { return this.claims.crd; }
    public get T24Principal() { return this.claims.t24; }
}
