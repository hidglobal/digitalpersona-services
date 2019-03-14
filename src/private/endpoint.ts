import { ServiceFault, ServiceError } from '@common';
import { Url } from './url';

export class ServiceEndpoint
{
    private readonly endpointUrl: string;
    private readonly defaultRequest: RequestInit = {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json; charset=utf-8"
        },
    }

    public constructor(endpointUrl: string, defaultRequest?: RequestInit) {
        this.endpointUrl = endpointUrl;
        this.defaultRequest = defaultRequest || this.defaultRequest;
    }

    private static getResult<T>(response: Response, dataName?: string, defaultValue?: T): Promise<T> {
        return (response.ok) ?
            ServiceEndpoint.handleSuccess(response, dataName, defaultValue) :
            ServiceEndpoint.handleError(response);
    }

    private static handleSuccess<T>(response: Response, dataName?: string, defaultValue?: T|void): Promise<T>
    {
        return response.json().then(data =>
//            !dataName        ?  (defaultValue || (()=>{})()) :
            data && dataName ?  data[dataName] as T :  // result returned in a body as a JSON object
            defaultValue     ?  defaultValue :         // no result returned in a body, use default value
                                (()=>{throw new Error('missing data and no default value');})()
        );
    }
    private static handleError<T>(response: Response): Promise<T> {
        if (response.status === 404) {
            // DP WebServices dump all errors under a single 404 error
            // (which is not a best choice as the same error may indicate wrong URL path).
            // So we first try to get a "fault" JSON object from the response and use its
            // error code and message. If the response is empty, we fallback to a
            // regular HTTP response code and status text.
            return response.json()
                .then((fault: ServiceFault) => {
                    throw (fault) ?
                        new ServiceError(fault.error_code, fault.description) :
                        new ServiceError(response.status, response.statusText);
                });
        }
        throw new ServiceError(response.status, response.statusText);
    }

    public get<ResultT>(path: string, query?: object | null, request?: RequestInit, defaultValue?: ResultT): Promise<ResultT>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query),
            { ...this.defaultRequest, ...request, method: 'GET' })
        .then(response =>
            ServiceEndpoint.getResult(response, `${path}Result`, defaultValue));
    }

    public post<ResultT>(path: string, query: object | null, request: RequestInit, defaultValue?: ResultT): Promise<ResultT>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query),
            { ...this.defaultRequest, ...request, method: 'POST', mode: 'cors' })
        .then(response =>
            ServiceEndpoint.getResult(response, `${path}Result`, defaultValue));
    }

    public put<ResultT>(path: string, query: object | null, request: RequestInit, defaultValue?: ResultT): PromiseLike<ResultT>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query),
            { ...this.defaultRequest, ...request, method: 'PUT', mode: 'cors' })
        .then(response =>
            ServiceEndpoint.getResult(response, `${path}Result`, defaultValue));
    }

    public delete<ResultT>(path: string, query: object | null, request: RequestInit, defaultValue?: ResultT): Promise<ResultT>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query),
            { ...this.defaultRequest, ...request, method: 'DELETE', mode: 'cors' })
        .then(response =>
            ServiceEndpoint.getResult(response, "", defaultValue));
    }

    public ping(path: string = 'Ping'): Promise<boolean> {
        return fetch(
            Url.create(this.endpointUrl, path),
            { ...this.defaultRequest, method: "GET" })
        .then(response => response.ok)
        .catch(reason => false);
    }

}
