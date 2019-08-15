/** DPCA Useraccount control flags. */
export declare enum UACFlags {
    RevertToWindows = 1,
    PasswordNotAllowed = 2,
    PinRequired = 4,
    FingerprintRequired = 8,
    FingerprintOnly = 16,
    OtpAndPwd = 64,
    OtpAndFingerprint = 128
}
export declare enum UserAccountType {
    /** User account type is unknown. */
    Unknown = 0,
    /** A local user account. */
    Local = 1,
    /** ActiveDirectory user */
    ActiveDirectory = 2,
    /** AD LDS (DPCA) user.  */
    ADLDS = 3
}
export interface UserInfo {
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
