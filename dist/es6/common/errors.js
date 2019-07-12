/**
 * Maps Web Access service faults to the Javascript exception model
 */
export class ServiceError extends Error {
    /** Constructs the object. */
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    /** Creates a service error object from a {@link ServiceFault | service fault}. */
    static fromServiceFault(fault) {
        return new ServiceError(fault.error_code, fault.description);
    }
    /** Allows to distinguish transport errors (HTTP) from {@link ServiceFault | service faults}.
     * @returns `true` if the error was a transport error (HTTP),
     *          `false` if it was a {@link ServiceFault | service fault}.
     */
    isHttpError() { return this.code >= 400 && this.code < 600; }
}
//# sourceMappingURL=errors.js.map