export interface ServiceFault
{
    error_code: number;
    description: string;
}

export class ServiceError extends Error
{
    public readonly code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public isHttpError(): boolean { return this.code < 0x8000000; }
}

export interface IService
{
    Ping(): PromiseLike<boolean>;
}
