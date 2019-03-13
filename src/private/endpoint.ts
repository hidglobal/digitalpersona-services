import { ServiceFault, ServiceError } from '@common';

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

    private static getSanitizedQuery(query: object) {
        return Object
            .keys(query)
            .map(key => [key, query[key]]
                .map(encodeURIComponent)
                .join("="))
            .join("&")
    }
    private getSanitizedUrl(path: string, query?: object | null) {
        return encodeURI(
            `${this.endpointUrl}/${encodeURIComponent(path)}` +
            (query ? `?${ServiceEndpoint.getSanitizedQuery(query)}` : "")
        );
    }
    private static getResult<T>(response: Response, dataName?: string, defaultValue?: T): PromiseLike<T> {
        if (response.ok) {
            return response.json().then(data =>
                data && dataName ?  data[dataName] as T :  // result returned in a body as a JSON object
                defaultValue     ?  defaultValue :         // no result returned in a body, use default value
                                    (()=>{throw new Error('missing data and no default value');})()
            );
        } else {
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
    }

    public get<ResultT>(path: string, query?: object | null, request?: RequestInit, defaultValue?: ResultT): PromiseLike<ResultT>
    {
        return fetch(
            this.getSanitizedUrl(path, query),
            { ...this.defaultRequest, ...request, method: 'GET' })
        .then(response =>
            ServiceEndpoint.getResult<ResultT>(response, `${path}Result`, defaultValue));
    }

    public post<ResultT>(path: string, query: object | null, request: RequestInit, defaultValue?: ResultT): PromiseLike<ResultT>
    {
        return fetch(
            this.getSanitizedUrl(path, query),
            { ...this.defaultRequest, ...request, method: 'POST', mode: 'cors' })
        .then(response =>
            ServiceEndpoint.getResult<ResultT>(response, `${path}Result`, defaultValue));
    }

    public put<ResultT>(path: string, query: object | null, request: RequestInit, defaultValue?: ResultT): PromiseLike<ResultT>
    {
        return fetch(
            this.getSanitizedUrl(path, query),
            { ...this.defaultRequest, ...request, method: 'PUT', mode: 'cors' })
        .then(response =>
            ServiceEndpoint.getResult<ResultT>(response, `${path}Result`, defaultValue));
    }

    public delete(path: string, query: object | null, request: RequestInit): PromiseLike<boolean>
    {
        return fetch(
            this.getSanitizedUrl(path, query),
            { ...this.defaultRequest, ...request, method: 'DELETE', mode: 'cors' })
        .then(response => response.ok)
        .catch(reason => false);
    }

    public ping(path: string = 'Ping'): PromiseLike<boolean> {
        return fetch(`${this.endpointUrl}/${path}`, { method: "GET", ...this.defaultRequest})
        .then(response => response.ok)
        .catch(reason => false);
    }

}
