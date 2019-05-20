import { AuthenticationStatus } from "./status";
import { Ticket } from '@digitalpersona/core';

export interface ExtendedAuthResult extends Ticket
{
    readonly status: AuthenticationStatus;
    readonly authData?: string;
}
