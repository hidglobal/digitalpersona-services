import { IService } from "../common";
import { ServiceEndpoint } from './endpoint';

export class Service implements IService
{
    protected endpoint: ServiceEndpoint;

    public constructor(endpoint: string) {
        this.endpoint = new ServiceEndpoint(endpoint);
    }

    public Ping(): Promise<boolean> {
        return this.endpoint.ping();
    }
}
