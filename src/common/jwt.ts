import { Utf16, Base64Url } from './encoder';

export interface IJWTHeader {
    typ: string;
    alg: string;
}

export class JWT
{
    private readonly header: IJWTHeader;
    private readonly payload: any;
    private readonly signature: string; // TODO: should it be an ArrayBuffer or Uint8Array?

    private constructor(header: IJWTHeader, payload: any, signature: string) {
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
    public static fromBase64(b64encoded: string): JWT  {
        const [header, payload, signature ] = b64encoded.split('.');
        // TODO: verify signature
        return new JWT(
            JSON.parse(Utf16.fromBase64Url(header)),
            JSON.parse(Utf16.fromBase64Url(payload)),
            JSON.parse(Utf16.fromBase64Url(signature)));
    }

    public static fromJSON(o: string): JWT {
        return this.fromBase64(o);
    }
    public toJSON(): string {
        return [
            Base64Url.fromUtf16(JSON.stringify(this.header)),
            Base64Url.fromUtf16(JSON.stringify(this.payload)),
            Base64Url.fromUtf16(JSON.stringify(this.signature)),
        ].join(".");
    }

    public static async create(header: IJWTHeader, payload: any) {
        const content = btoa(JSON.stringify(header)) + "." + btoa(JSON.stringify(payload));
        const encoder = new TextEncoder();

        const sig = await crypto.subtle.digest(header.alg, encoder.encode(content));
        const hexsig = String.fromCharCode(...new Uint8Array(sig));
        return new JWT(header, payload, hexsig);
    }

    public async verifySignature() {
        const content = btoa(JSON.stringify(this.header)) + "." + btoa(JSON.stringify(this.payload));
        const encoder = new TextEncoder();

        const sig = await crypto.subtle.digest(this.header.alg, encoder.encode(content));
        const hexsig = String.fromCharCode(...new Uint8Array(sig));
        return hexsig === this.signature;
    }
}
