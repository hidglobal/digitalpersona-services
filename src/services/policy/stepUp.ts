export class ContextualInfo
{
    behavior?: boolean;
    ip?: boolean;
    device?: boolean;
    altusInstalled?: boolean;
    computer?: string;
    domain?: string;
    user?: string;
    insideFirewall?: boolean;
    remoteSession?: boolean;
}

export enum TriggerName
{
    Behavior = 'behavior',
    IP = 'ip',
    Device = 'device',
    AltusInstalled = 'altusInstalled',
    Computer = 'computer',
    Domain = 'domain',
    User = 'user',
    InsideFirewall = 'insideFirewall',
    RemoteSession = 'remoteSession',
}
export type TriggerNames = { [K in keyof ContextualInfo]: ContextualInfo[K] extends Function ? never : K }[keyof ContextualInfo];

export interface PolicyTrigger
{
    trigger: TriggerNames;
}
