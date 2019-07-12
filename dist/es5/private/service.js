import { ServiceEndpoint } from './endpoint';
var Service = /** @class */ (function () {
    function Service(endpoint) {
        this.endpoint = new ServiceEndpoint(endpoint);
    }
    Service.prototype.Ping = function () {
        return this.endpoint.ping();
    };
    return Service;
}());
export { Service };
//# sourceMappingURL=service.js.map