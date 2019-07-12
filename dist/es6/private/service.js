import { ServiceEndpoint } from './endpoint';
export class Service {
    constructor(endpoint) {
        this.endpoint = new ServiceEndpoint(endpoint);
    }
    Ping() {
        return this.endpoint.ping();
    }
}
//# sourceMappingURL=service.js.map