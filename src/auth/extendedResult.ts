import { AuthenticationStatus } from "./status";
import { JSONWebToken } from "../common/jwt";

export class ExtendedAuthResult
{
    public readonly status: AuthenticationStatus;
    public readonly authData?: string;
    public readonly jwt?: JSONWebToken;

    constructor(status: AuthenticationStatus, authData?: string, jwt?: JSONWebToken) {
        this.status = status;
        this.authData = authData;
        this.jwt = jwt;
    }
}
