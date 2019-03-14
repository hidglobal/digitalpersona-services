import { AuthenticationStatus } from "./status";
import { Ticket } from '@common';

export interface ExtendedAuthResult extends Ticket
{
    readonly status: AuthenticationStatus;
    readonly authData?: string;
}
