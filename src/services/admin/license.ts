export enum LicenseType
{
    ADUser = 1,
    LDSUser = 2,
}

export interface LicenseInfo
{
    type: LicenseType;
    licenses_deployed: number;
    licenses_used: number;
}
