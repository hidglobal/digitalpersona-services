/**
 * Enumerated possible authentication statuses.
 */
export enum AuthenticationStatus
{
    /** Authentication failed. */
    Error = 0,

    /** Authentication is in progress. */
    Continue = 1,

    /** Authentication is complete. */
    Completed = 2,
}
