var _this = this;
import * as tslib_1 from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { AuthService, AuthenticationStatus } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("AuthService:", function () {
    var app = "http://test.local";
    var user = new User("john.doe@test.local", UserNameType.UPN);
    var ticket = new Ticket("=====ticket=====");
    var creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    var fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    var service;
    beforeEach(function () {
        service = new AuthService(app);
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
    describe("IdentifyUser", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = ticket;
                        FetchMock.postOnce("path:/IdentifyUser", { IdentifyUserResult: result });
                        return [4 /*yield*/, expectAsync(service.Identify(fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.Identify(fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("AuthenticateUser", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = ticket;
                        FetchMock.postOnce("path:/AuthenticateUser", { AuthenticateUserResult: result });
                        return [4 /*yield*/, expectAsync(service.Authenticate(user, fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.Authenticate(user, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("AuthenticateUserTicket", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = ticket;
                        FetchMock.postOnce("path:/AuthenticateUserTicket", { AuthenticateUserTicketResult: result });
                        return [4 /*yield*/, expectAsync(service.Authenticate(ticket, fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.Authenticate(ticket, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("CustomAction", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "====custom action result====";
                        FetchMock.postOnce("path:/CustomAction", { CustomActionResult: result });
                        return [4 /*yield*/, expectAsync(service.CustomAction(101, ticket, user, fingerprints))
                                .toBeResolvedTo(result)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('must succeed, returns nothing', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.postOnce("*", { CustomActionResult: null });
                        return [4 /*yield*/, expectAsync(service.CustomAction(101, ticket, user, fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.CustomAction(101, ticket, user, fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("CreateUserAuthentication", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = 12345;
                        FetchMock.postOnce("path:/CreateUserAuthentication", { CreateUserAuthenticationResult: result });
                        return [4 /*yield*/, expectAsync(service.CreateAuthentication(user, Credential.Fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.CreateAuthentication(user, Credential.Fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("CreateTicketAuthentication", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = 12345;
                        FetchMock.postOnce("path:/CreateTicketAuthentication", { CreateTicketAuthenticationResult: result });
                        return [4 /*yield*/, expectAsync(service.CreateAuthentication(ticket, Credential.Fingerprints))
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
                        return [4 /*yield*/, expectAsync(service.CreateAuthentication(ticket, Credential.Fingerprints))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ContinueAuthentication", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = tslib_1.__assign({}, ticket, { status: AuthenticationStatus.Continue, authData: "==== auth data ====" });
                        FetchMock.postOnce("path:/ContinueAuthentication", { ContinueAuthenticationResult: result });
                        return [4 /*yield*/, expectAsync(service.ContinueAuthentication(12345, ticket.jwt))
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
                        return [4 /*yield*/, expectAsync(service.ContinueAuthentication(12345, ticket.jwt))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DestroyAuthentication", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("path:/DestroyAuthentication", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.DestroyAuthentication(12345))
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
                        return [4 /*yield*/, expectAsync(service.DestroyAuthentication(12345))
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