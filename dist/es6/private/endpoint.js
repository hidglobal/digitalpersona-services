import { ServiceError } from '../common';
import { Url } from '@digitalpersona/core';
export class ServiceEndpoint {
    constructor(endpointUrl, defaultRequest) {
        this.defaultRequest = {
            cache: "no-cache",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json",
            },
        };
        this.endpointUrl = endpointUrl;
        this.defaultRequest = defaultRequest || this.defaultRequest;
    }
    static handleResponse(response) {
        return (response.ok) ?
            response.json() :
            ServiceEndpoint.handleError(response);
    }
    static handleError(response) {
        if (response.status === 404) {
            // DP WebServices dump all errors under a single 404 error
            // (which is not a best choice as the same error may indicate wrong URL path).
            // So we first try to get a "fault" JSON object from the response and use its
            // error code and message. If the response is empty, we fallback to a
            // regular HTTP response code and status text.
            return response.json()
                .then((fault) => {
                throw (fault) ?
                    new ServiceError(fault.error_code, fault.description) :
                    new ServiceError(response.status, response.statusText);
            });
        }
        throw new ServiceError(response.status, response.statusText);
    }
    get(path, query, request) {
        return fetch(Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'GET' }))
            .then(ServiceEndpoint.handleResponse);
    }
    post(path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'POST' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    }
    put(path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'PUT' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    }
    // cannot use "delete" as it is a reserved Javascript word
    del(path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultRequest), request), { method: 'DELETE' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    }
    ping(path = 'Ping') {
        return fetch(Url.create(this.endpointUrl, path), Object.assign(Object.assign({}, this.defaultRequest), { method: "GET" }))
            .then(response => response.ok)
            .catch(reason => false);
    }
}
//# sourceMappingURL=endpoint.js.map