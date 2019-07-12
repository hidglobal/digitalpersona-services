import { IService } from "../common";
import { ServiceEndpoint } from './endpoint';
export declare class Service implements IService {
    protected endpoint: ServiceEndpoint;
    constructor(endpoint: string);
    Ping(): Promise<boolean>;
}
