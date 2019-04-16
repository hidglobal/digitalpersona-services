// A server fault object.
// When server error occurs, the server returns the fault object in a response body.
export interface ServiceFault
{
    error_code: number;
    description: string;
}

// Maps service faults on the Javascript exception model
export class ServiceError extends Error
{
    public readonly code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public static fromServiceFault(fault: ServiceFault): ServiceError {
        return new ServiceError(fault.error_code, fault.description);
    }

    public isHttpError(): boolean { return this.code >= 400 && this.code < 600 }
}

export interface IService
{
    // Pings the service endpoint to detect connectivity status.
    // Returns `true` on success, `false` on failure. The promise is never rejected.
    Ping(): Promise<boolean>;
}
