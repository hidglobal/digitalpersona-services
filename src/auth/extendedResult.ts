import { AuthenticationStatus } from "./status";
import { JWT } from "../common/jwt";

export class ExtendedAuthResult
{
    public readonly status: AuthenticationStatus;
    public readonly authData: string;
    public readonly jwt: JWT;

    constructor(status: AuthenticationStatus, authData: string, jwt: JWT) {
        this.status = status;
        this.authData = authData;
        this.jwt = jwt;
    }
}
