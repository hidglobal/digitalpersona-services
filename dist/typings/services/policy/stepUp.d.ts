/**
 * A context of an authentication.
 */
export declare class ContextualInfo {
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
/** Enumerates step-up triggers. */
export declare enum TriggerName {
    Behavior = "behavior",
    IP = "ip",
    Device = "device",
    AltusInstalled = "altusInstalled",
    Computer = "computer",
    Domain = "domain",
    User = "user",
    InsideFirewall = "insideFirewall",
    RemoteSession = "remoteSession"
}
/** Alias type for supported step-up trigger names. */
export declare type TriggerNames = {
    [K in keyof ContextualInfo]: ContextualInfo[K] extends Function ? never : K;
}[keyof ContextualInfo];
/** A policy step-up trigger. */
export interface PolicyTrigger {
    trigger: TriggerNames;
}
