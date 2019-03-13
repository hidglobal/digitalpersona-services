import { IService } from "@common";
import { ServiceEndpoint } from './endpoint';

export abstract class Service implements IService
{
    protected endpoint: ServiceEndpoint;

    public constructor(endpoint: string) {
        this.endpoint = new ServiceEndpoint(endpoint);
    }

    public Ping(): PromiseLike<boolean> {
        return this.endpoint.ping();
    }
}
