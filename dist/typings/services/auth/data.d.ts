import { AuthenticationHandle } from "./service";
/**
 * Client-side authentication data used by the {@link IAuthenticationClient} during authentication handshake.
 */
export declare class AuthenticationData {
    /** An authentication handle.
     * The client must create the handle on {@link IAuthenticationClient.init},
     * and destroy on {@link IAuthenticationClient.done}.
     */
    readonly handle: AuthenticationHandle;
    /** Client's authentication data to pass to the server. */
    readonly data: string;
}
