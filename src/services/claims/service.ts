import { Ticket } from '@digitalpersona/core';
import { Service } from '../../private';
import { ClaimRequest } from './claim';

/**
 * DigitalPersona Web Claims (DPWebClaims) service interface.
 *
 * This service allows to request additional claims to be added
 * to the JSON Web Token issued by the AuthService.
 */
export interface IClaimsService
{
    GetConfiguredClaims(ticket: Ticket): Promise<Ticket>;
    GetClaims(ticket: Ticket, request: ClaimRequest[]): Promise<Ticket>;
}

/**
 * DigitalPersona Web Claims (DPWebClaims) service client wrapper.
 */
export class ClaimsService extends Service implements IClaimsService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }

    /** @inheritdoc */
    public GetConfiguredClaims(ticket: Ticket ): Promise<Ticket>
    {
        return this.endpoint
            .post("GetConfiguredClaims", null, { ticket })
            .then(result => result.GetConfiguredClaimsResult.ticket);
    }

    /** @inheritdoc */
    public GetClaims(ticket: Ticket, request: ClaimRequest[]): Promise<Ticket>
    {
        return this.endpoint
            .post("GetClaims", null, { ticket, request})
            .then(result => result.GetClaimsResult.ticket);
    }
}
