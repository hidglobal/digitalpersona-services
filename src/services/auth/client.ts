import { Base64UrlString } from '@digitalpersona/core';
import { AuthenticationData} from './data';

/**
 * Set of methods to support an authentication handshake protocol on a client side.
 */
export interface IAuthenticationClient
{
    /** Initiates an authentication handshake.
     * @returns a promise to return an {@link AuthenticationData} when ready to continue.
     */
    init(): Promise<AuthenticationData>;

    /** Continues the handshake.
     * This method may be called several times until the {@link IAuthenticationClient.done} is called.
     * @param handle - an authentication handle
     * @param data - a server portion of the authentication handshake
     * @returns a promise to return a client portion of authentication handshake data (Base64url-encoded).
     */
    continue(handle: number, data: string): Promise<Base64UrlString>;

    /** Finalizes the authentication handshake.
     * @param handle - an authentication handle to close.
     */
    term(handle: number): Promise<void>;
}
