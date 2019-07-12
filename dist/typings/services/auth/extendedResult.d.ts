import { AuthenticationStatus } from "./status";
import { Ticket } from '@digitalpersona/core';
/**
 * Result of authentication handshake containing {@link AuthenticationsStatus} and optional authentication data payload.
 */
export interface ExtendedAuthResult extends Ticket {
    /** An authentication status. */
    readonly status: AuthenticationStatus;
    /** Authentication payload data. */
    readonly authData?: string;
}
