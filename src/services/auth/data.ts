/**
 * Client-side authentication data used by the {@link IAuthenticationClient} during authentication handshake.
 */
export class AuthenticationData
{
    /** An authentication handle.
     * The client must create the handle on {@link IAuthenticationClient.init},
     * and destroy on {@link IAuthenticationClient.done}.
     */
    public readonly handle: number;

    /** Client's authentication data to pass to the server. */
    public readonly data: string;
}
