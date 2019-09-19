import { __awaiter, __generator } from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError, VarType, VarString, VarInt } from '../../common';
import { ServerStatus, HttpStatus } from '../../test';
import { AdminService, SearchScope, ServerSettingType, LicenseType, UserAccountType, UACFlags } from '.';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("AdminService:", function () {
    var app = "http://test.local";
    var user = new User("john.doe@test.local", UserNameType.UPN);
    var officerTicket = new Ticket("===== security officer's ticket=====");
    var userTicket = new Ticket("===== user's officer ticket=====");
    var attribute = {
        type: VarType.String,
        values: ["Domain Users", "Authenticated Users"],
    };
    var service;
    beforeEach(function () {
        service = new AdminService(app);
    });
    afterEach(function () {
        FetchMock.restore();
    });
    describe("ExecuteSearch", function () {
        var query = {
            scope: SearchScope.Base,
            filter: "(&(objectClass=user)(objectCategory=person))",
            attributes: ["cn", "memberOf", "dpUserAccounControl"],
            sort: "cn",
        };
        var searchResult = [
            [{ name: "cn",
                    data: new VarString(["John Doe"]),
                },
                { name: "memberOf",
                    data: new VarString([
                        "CN=Blue Group,CN=Users,DC=test,DC=local",
                        "CN=Engineering,OU=Groups,DC=test,DC=local",
                    ]),
                },
                { name: "dpUserAccountControl",
                    data: new VarInt([2]),
                },
            ],
            [{ name: "cn",
                    data: new VarString(["Jane Doe"]),
                },
                { name: "memberOf",
                    data: new VarString([
                        "CN=Red Group,CN=Users,DC=test,DC=local",
                        "CN=Engineering,OU=Groups,DC=test,DC=local",
                    ]),
                },
                { name: "dpUserAccountControl",
                    data: null,
                },
            ],
        ];
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/ExecuteSearch", { ExecuteSearchResult: JSON.stringify(searchResult) });
                        return [4 /*yield*/, expectAsync(service.ExecuteSearch(officerTicket, query))
                                .toBeResolvedTo(JSON.parse(JSON.stringify(searchResult)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.ExecuteSearch(officerTicket, query))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PSKCImport", function () {
        var input = "==== PSKC Data ====";
        var output = [
            { serial_number: "1234" },
            { error: 9876, error_text: "Error 9876" },
        ];
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce('path:/PSKCImport', { PSKCImportResult: output });
                        return [4 /*yield*/, expectAsync(service.PSKCImport(officerTicket, input))
                                .toBeResolvedTo(output)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.PSKCImport(officerTicket, input))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetServerSettings", function () {
        var settingNames = ["LockoutThreshold", "LockoutDuration", "LockoutReset"];
        var output = [
            { name: "LockoutThreshold", data: new VarInt([0]) },
            { name: "LockoutDuration", data: new VarInt([30]) },
            { name: "LockoutReset", data: new VarInt([5]) },
        ];
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce('path:/GetServerSettings', { GetServerSettingsResult: output });
                        return [4 /*yield*/, expectAsync(service.GetServerSettings(officerTicket, user, settingNames))
                                .toBeResolvedTo(JSON.parse(JSON.stringify(output)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetServerSettings(officerTicket, user, settingNames))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("SetServerSettings", function () {
        var settings = [
            { name: "LockoutThreshold", data: new VarInt([0]) },
            { name: "LockoutDuration", data: new VarInt([30]) },
            { name: "LockoutReset", data: new VarInt([5]) },
        ];
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce('path:/SetServerSettings', HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.SetServerSettings(officerTicket, ServerSettingType.Admin, settings))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.SetServerSettings(officerTicket, ServerSettingType.Admin, settings))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetLicenseInfo", function () {
        var result = {
            type: LicenseType.ADUser,
            licenses_deployed: 100,
            licenses_used: 50,
        };
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.getOnce(app + "/GetLicenseInfo?type=1", { GetLicenseInfoResult: result });
                        return [4 /*yield*/, expectAsync(service.GetLicenseInfo(LicenseType.ADUser))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.getOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetLicenseInfo(LicenseType.ADUser))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetUserRecoveryPassword", function () {
        var encPassword = "==== Encrypted Password ===";
        var result = "==== Recovery Password ===";
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/GetUserRecoveryPassword", { GetUserRecoveryPasswordResult: result });
                        return [4 /*yield*/, expectAsync(service.GetUserRecoveryPassword(officerTicket, user, encPassword))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetUserRecoveryPassword(officerTicket, user, encPassword))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("AdminDeleteUserCredentials", function () {
        var credentials = [
            new Credential(Credential.Password),
            new Credential(Credential.Fingerprints),
        ];
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("path:/AdminDeleteUserCredentials", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.AdminDeleteUserCredentials(officerTicket, user, credentials))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.deleteOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.AdminDeleteUserCredentials(officerTicket, user, credentials))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetUserInfo", function () {
        var result = {
            uid: "UID",
            displayName: "John Doe",
            type: UserAccountType.ActiveDirectory,
            accountControl: UACFlags.OtpAndFingerprint,
            locked: false,
            licensed: true,
        };
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/GetUserInfo", { GetUserInfoResult: result });
                        return [4 /*yield*/, expectAsync(service.GetUserInfo(officerTicket, user))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetUserInfo(officerTicket, user))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("UnlockUserAccount", function () {
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("path:/UnlockUserAccount", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.UnlockUserAccount(officerTicket, user))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.UnlockUserAccount(officerTicket, user))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("SetUserAccountControl", function () {
        var control = UACFlags.OtpAndFingerprint;
        it('must succeed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce('path:/SetUserAccountControl', HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.SetUserAccountControl(officerTicket, user, control))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return __awaiter(void 0, void 0, void 0, function () {
            var fault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.SetUserAccountControl(officerTicket, user, control))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=service.spec.js.map