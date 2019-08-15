export enum ServerSettingType
{
    /** Unknown Server Settings Type. */
    Unknown = 0,
    /** Server Settings will be accessible only for Domain Administrators. */
    Admin = 1,
    /** Server Settings will be accessible for anybody (public). */
    Public = 2,
}

export enum ServerSettings
{
    "LockoutThreshold",
    "LockoutDuration",
    "LockoutReset",
}
