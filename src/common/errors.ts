/**
 * A server fault object.
 * When server error occurs, the server returns the fault object in a response body.
 */
export interface ServiceFault
{
    /** A numeric code of the error. */
    error_code: number;

    /** A text describing the error. */
    description: string;
}

/**
 * Maps Web Access service faults to the Javascript exception model
 */
export class ServiceError extends Error
{
    /** Numeric code of the error.
     * In case of HTTP error the code will be an HTTP status code.
     * In case of {@link ServiceFault | service fault} the code will be an HRESULT server code.
     */
    public readonly code: number;

    /** Constructs the object. */
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /** Creates a service error object from a {@link ServiceFault | service fault}. */
    public static fromServiceFault(fault: ServiceFault): ServiceError {
        return new ServiceError(fault.error_code, fault.description);
    }

    /** Allows to distinguish transport errors (HTTP) from {@link ServiceFault | service faults}.
     * @returns `true` if the error was a transport error (HTTP),
     *          `false` if it was a {@link ServiceFault | service fault}.
     */
    public isHttpError(): boolean { return this.code >= 400 && this.code < 600; }
}
