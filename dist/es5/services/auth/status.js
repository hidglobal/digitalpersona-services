/**
 * Enumerated possible authentication statuses.
 */
export var AuthenticationStatus;
(function (AuthenticationStatus) {
    /** Authentication failed. */
    AuthenticationStatus[AuthenticationStatus["Error"] = 0] = "Error";
    /** Authentication is in progress. */
    AuthenticationStatus[AuthenticationStatus["Continue"] = 1] = "Continue";
    /** Authentication is complete. */
    AuthenticationStatus[AuthenticationStatus["Completed"] = 2] = "Completed";
})(AuthenticationStatus || (AuthenticationStatus = {}));
//# sourceMappingURL=status.js.map