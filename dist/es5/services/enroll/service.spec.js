var _this = this;
import * as tslib_1 from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError, VarType, AttributeAction } from '../../common';
import { EnrollService } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("EnrollService:", function () {
    var app = "http://test.local";
    var user = new User("john.doe@test.local", UserNameType.UPN);
    var officerTicket = new Ticket("===== security officer's ticket=====");
    var userTicket = new Ticket("===== user's officer ticket=====");
    var attribute = {
        type: VarType.String,
        values: ["Domain Users", "Authenticated Users"],
    };
    var creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    var fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    var service;
    beforeEach(function () {
        service = new EnrollService(app);
    });
    afterEach(function () {
        FetchMock.restore();
    });
    describe("GetUserCredentials", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = creds;
                        FetchMock.getOnce("path:/GetUserCredentials", { GetUserCredentialsResult: result });
                        return [4 /*yield*/, expectAsync(service.GetUserCredentials(user))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.getOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetUserCredentials(user))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetEnrollmentData", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "==== enrollment data =====";
                        FetchMock.getOnce("path:/GetEnrollmentData", { GetEnrollmentDataResult: result });
                        return [4 /*yield*/, expectAsync(service.GetEnrollmentData(user, Credential.Password))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.getOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetEnrollmentData(user, Credential.Password))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("CreateUser", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("path:/CreateUser", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.CreateUser(officerTicket, user, "password"))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.CreateUser(officerTicket, user, "password"))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DeleteUser", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("path:/DeleteUser", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.DeleteUser(officerTicket, user))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.deleteOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.DeleteUser(officerTicket, user))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("EnrollUserCredentials", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("path:/EnrollUserCredentials", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DeleteUserCredentials", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("path:/DeleteUserCredentials", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.deleteOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("EnrollAltusUserCredentials", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("path:/EnrollAltusUserCredentials", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DeleteAltusUserCredentials", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("path:/DeleteAltusUserCredentials", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.deleteOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetUserAttribute", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            name: "group",
                            data: attribute,
                        };
                        FetchMock.postOnce("path:/GetUserAttribute", { GetUserAttributeResult: attribute });
                        return [4 /*yield*/, expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PutUserAttribute", function () {
        var attr = {
            name: "group",
            data: attribute,
        };
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("path:/PutUserAttribute", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.putOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("UnlockUser", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/UnlockUser", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.UnlockUser(user, fingerprints))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.UnlockUser(user, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("CustomAction", function () {
        var result = "==== custom action result ===";
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/CustomAction", { CustomActionResult: result });
                        return [4 /*yield*/, expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("IsEnrollmentAllowed", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("path:/IsEnrollmentAllowed", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                                .toBeResolved()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fault;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fault = ServerStatus.E_FAIL;
                        FetchMock.postOnce("*", new Response(JSON.stringify(fault), HttpStatus.NotFound));
                        return [4 /*yield*/, expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
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