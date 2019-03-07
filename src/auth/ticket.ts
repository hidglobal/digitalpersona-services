import { JWT } from './../common/jwt';

export class Ticket
{
    public readonly jwt: JWT;

    public constructor(jwt: JWT)
    {
        this.jwt = jwt;
    }
}
