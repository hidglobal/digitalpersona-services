import { Ticket } from '@common';
import { Service } from '@private';
import { ClaimRequest } from './claim';

// This service allows to request additional claims to be added
// to the JSON Web Token issued by the AuthService
export interface IClaimsService
{
    GetConfiguredClaims(ticket: Ticket): Promise<Ticket>;
    GetClaims(ticket: Ticket, request: ClaimRequest[]): Promise<Ticket>;
}

export class ClaimsService extends Service implements IClaimsService
{
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }

    public GetConfiguredClaims(ticket: Ticket ): Promise<Ticket>
    {
        return this.endpoint.post("GetConfiguredClaims"
            , null
            , { body: JSON.stringify({ ticket }) })
        .then(result => result["ticket"]);
    }
    public GetClaims(ticket: Ticket, request: ClaimRequest[]): Promise<Ticket>
    {
        return this.endpoint.post("GetClaims"
            , null
            , { body: JSON.stringify({ ticket, request}) })
        .then(result => result["ticket"]);
        }
}
