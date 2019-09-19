import { ServiceFault, ServiceError } from '../common';
import { Url } from '@digitalpersona/core';

export class ServiceEndpoint
{
    private readonly endpointUrl: string;
    private readonly defaultRequest: RequestInit = {
        cache: "no-cache",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json",
        },
    };

    public constructor(endpointUrl: string, defaultRequest?: RequestInit) {
        this.endpointUrl = endpointUrl;
        this.defaultRequest = defaultRequest || this.defaultRequest;
    }

    private static handleResponse(response: Response): Promise<any> {
        return (response.ok) ?
            response.json() :
            ServiceEndpoint.handleError(response);
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

    public get(path: string, query?: object|null, request?: RequestInit): Promise<any>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query)
            , { ...this.defaultRequest
                , ...request
                , method: 'GET',
            })
            .then(ServiceEndpoint.handleResponse);
    }

    public post(path: string, query: object|null, body: object|null, request?: RequestInit): Promise<any>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query)
            , { ...this.defaultRequest
                , ...request
                , method: 'POST'
                , ...(body ? { body: JSON.stringify(body) } : {}),
            })
            .then(ServiceEndpoint.handleResponse);
        }

    public put(path: string, query: object|null, body: object|null, request?: RequestInit): Promise<any>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query)
            , { ...this.defaultRequest
                , ...request
                , method: 'PUT'
                , ...(body ? { body: JSON.stringify(body) } : {}),
            })
            .then(ServiceEndpoint.handleResponse);
        }

    // cannot use "delete" as it is a reserved Javascript word
    public del(path: string, query: object|null, body: object|null, request?: RequestInit): Promise<any>
    {
        return fetch(
            Url.create(this.endpointUrl, path, query)
            , { ...this.defaultRequest
                , ...request
                , method: 'DELETE'
                , ...(body ? { body: JSON.stringify(body) } : {}),
            })
            .then(ServiceEndpoint.handleResponse);
        }

    public ping(path: string = 'Ping'): Promise<boolean> {
        return fetch(
            Url.create(this.endpointUrl, path),
            { ...this.defaultRequest, method: "GET" })
        .then(response => response.ok)
        .catch(reason => false);
    }

}
