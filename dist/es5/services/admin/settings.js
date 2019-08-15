export var ServerSettingType;
(function (ServerSettingType) {
    /** Unknown Server Settings Type. */
    ServerSettingType[ServerSettingType["Unknown"] = 0] = "Unknown";
    /** Server Settings will be accessible only for Domain Administrators. */
    ServerSettingType[ServerSettingType["Admin"] = 1] = "Admin";
    /** Server Settings will be accessible for anybody (public). */
    ServerSettingType[ServerSettingType["Public"] = 2] = "Public";
})(ServerSettingType || (ServerSettingType = {}));
export var ServerSettings;
(function (ServerSettings) {
    ServerSettings[ServerSettings["LockoutThreshold"] = 0] = "LockoutThreshold";
    ServerSettings[ServerSettings["LockoutDuration"] = 1] = "LockoutDuration";
    ServerSettings[ServerSettings["LockoutReset"] = 2] = "LockoutReset";
})(ServerSettings || (ServerSettings = {}));
//# sourceMappingURL=settings.js.map