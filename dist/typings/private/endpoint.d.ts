export declare class ServiceEndpoint {
    private readonly endpointUrl;
    private readonly defaultRequest;
    constructor(endpointUrl: string, defaultRequest?: RequestInit);
    private static handleResponse;
    private static handleError;
    get(path: string, query?: object | null, request?: RequestInit): Promise<any>;
    post(path: string, query: object | null, body: object | null, request?: RequestInit): Promise<any>;
    put(path: string, query: object | null, body: object | null, request?: RequestInit): Promise<any>;
    del(path: string, query: object | null, body: object | null, request?: RequestInit): Promise<any>;
    ping(path?: string): Promise<boolean>;
}
