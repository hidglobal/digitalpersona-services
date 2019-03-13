import { Ticket } from '@common';
import { Service } from '@private';
import { ClaimRequest } from './claim';

// This service allows to request additional claims to be added
// to the JSON Web Token issued by the AuthService
export interface IClaimsService
{
    GetConfiguredClaims(ticket: Ticket): PromiseLike<Ticket>;
    GetClaims(ticket: Ticket, request: ClaimRequest[]): PromiseLike<Ticket>;
}

export class ClaimsService extends Service implements IClaimsService
{
    public GetConfiguredClaims(ticket: Ticket ): PromiseLike<Ticket>
    {
        return this.endpoint.post("GetConfiguredClaims"
            , null
            , { body: JSON.stringify({ ticket }) });
    }
    public GetClaims(ticket: Ticket, request: ClaimRequest[]): PromiseLike<Ticket>
    {
        return this.endpoint.post("GetClaims"
            , null
            , { body: JSON.stringify({ ticket, request}) });
    }
}
