/** DPCA Useraccount control flags. */
export enum UACFlags
{
    RevertToWindows       = 0x01,     // Password only
    PasswordNotAllowed    = 0x02,     // Randomized password
    PinRequired           = 0x04,     // Fingerprint AND PIN
    FingerprintRequired   = 0x08,     // Fingerprint AND Password
    FingerprintOnly       = 0x10,     // Fingerprint only
    OtpAndPwd             = 0x40,     // OTP AND Password
    OtpAndFingerprint     = 0x80,     // OTP AND Fingerprint
}
export enum UserAccountType
{
    /** User account type is unknown. */
    Unknown = 0,
    /** A local user account. */
    Local = 1,
    /** ActiveDirectory user */
    ActiveDirectory = 2,
    /** AD LDS (DPCA) user.  */
    ADLDS = 3,
}

export interface UserInfo
{
    /** User's unuque identifier (UID), stored in the `objectGUID` attribute of the user's LDAP record. */
    uid: string;
    /** User's display name, stored in the `displayName` attribute of the user's LDAP record. */
    displayName: string;
    /** User account type. */
    type: UserAccountType;
    /** User account control bits, stored in the `dpUserAccountControl` attribute of the user's LDAP record. */
    accountControl: UACFlags;
    /** `true` if user account locked. */
    locked: boolean;
    /** `true` if the user holds DPCA license. */
    licensed: boolean;
}
