/** DPCA Useraccount control flags. */
export var UACFlags;
(function (UACFlags) {
    UACFlags[UACFlags["RevertToWindows"] = 1] = "RevertToWindows";
    UACFlags[UACFlags["PasswordNotAllowed"] = 2] = "PasswordNotAllowed";
    UACFlags[UACFlags["PinRequired"] = 4] = "PinRequired";
    UACFlags[UACFlags["FingerprintRequired"] = 8] = "FingerprintRequired";
    UACFlags[UACFlags["FingerprintOnly"] = 16] = "FingerprintOnly";
    UACFlags[UACFlags["OtpAndPwd"] = 64] = "OtpAndPwd";
    UACFlags[UACFlags["OtpAndFingerprint"] = 128] = "OtpAndFingerprint";
})(UACFlags || (UACFlags = {}));
export var UserAccountType;
(function (UserAccountType) {
    /** User account type is unknown. */
    UserAccountType[UserAccountType["Unknown"] = 0] = "Unknown";
    /** A local user account. */
    UserAccountType[UserAccountType["Local"] = 1] = "Local";
    /** ActiveDirectory user */
    UserAccountType[UserAccountType["ActiveDirectory"] = 2] = "ActiveDirectory";
    /** AD LDS (DPCA) user.  */
    UserAccountType[UserAccountType["ADLDS"] = 3] = "ADLDS";
})(UserAccountType || (UserAccountType = {}));
//# sourceMappingURL=uac.js.map