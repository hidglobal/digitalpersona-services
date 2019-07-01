/**
 * A context of an authentication.
 */
export class ContextualInfo
{
    public behavior?: boolean;
    public ip?: boolean;
    public device?: boolean;
    public altusInstalled?: boolean;
    public computer?: string;
    public domain?: string;
    public user?: string;
    public insideFirewall?: boolean;
    public remoteSession?: boolean;
}

/** Enumerates step-up triggers. */
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

/** Alias type for supported step-up trigger names. */
export type TriggerNames =
    { [K in keyof ContextualInfo]: ContextualInfo[K] extends Function ? never : K }[keyof ContextualInfo];

/** A policy step-up trigger. */
export interface PolicyTrigger
{
    trigger: TriggerNames;
}
