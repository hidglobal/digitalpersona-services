import { Base64UrlString } from '@digitalpersona/core'
import { AuthenticationData} from './data';

export interface IAuthenticationClient
{
    init(): Promise<AuthenticationData>;
    continue(handle: number, data: string): Promise<Base64UrlString>;
    term(handle: number): Promise<void>;
}
