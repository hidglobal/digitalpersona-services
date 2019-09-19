import { __assign } from "tslib";
import { ServiceError } from '../common';
import { Url } from '@digitalpersona/core';
var ServiceEndpoint = /** @class */ (function () {
    function ServiceEndpoint(endpointUrl, defaultRequest) {
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
    ServiceEndpoint.handleResponse = function (response) {
        return (response.ok) ?
            response.json() :
            ServiceEndpoint.handleError(response);
    };
    ServiceEndpoint.handleError = function (response) {
        if (response.status === 404) {
            // DP WebServices dump all errors under a single 404 error
            // (which is not a best choice as the same error may indicate wrong URL path).
            // So we first try to get a "fault" JSON object from the response and use its
            // error code and message. If the response is empty, we fallback to a
            // regular HTTP response code and status text.
            return response.json()
                .then(function (fault) {
                throw (fault) ?
                    new ServiceError(fault.error_code, fault.description) :
                    new ServiceError(response.status, response.statusText);
            });
        }
        throw new ServiceError(response.status, response.statusText);
    };
    ServiceEndpoint.prototype.get = function (path, query, request) {
        return fetch(Url.create(this.endpointUrl, path, query), __assign(__assign(__assign({}, this.defaultRequest), request), { method: 'GET' }))
            .then(ServiceEndpoint.handleResponse);
    };
    ServiceEndpoint.prototype.post = function (path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'POST' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    };
    ServiceEndpoint.prototype.put = function (path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'PUT' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    };
    // cannot use "delete" as it is a reserved Javascript word
    ServiceEndpoint.prototype.del = function (path, query, body, request) {
        return fetch(Url.create(this.endpointUrl, path, query), __assign(__assign(__assign(__assign({}, this.defaultRequest), request), { method: 'DELETE' }), (body ? { body: JSON.stringify(body) } : {})))
            .then(ServiceEndpoint.handleResponse);
    };
    ServiceEndpoint.prototype.ping = function (path) {
        if (path === void 0) { path = 'Ping'; }
        return fetch(Url.create(this.endpointUrl, path), __assign(__assign({}, this.defaultRequest), { method: "GET" }))
            .then(function (response) { return response.ok; })
            .catch(function (reason) { return false; });
    };
    return ServiceEndpoint;
}());
export { ServiceEndpoint };
//# sourceMappingURL=endpoint.js.map