var _this = this;
import * as tslib_1 from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ResourceActions, ServiceError } from '../../common';
import { SecretService } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("SecretService:", function () {
    var app = "http://test.local/service";
    var user = new User("john.doe@test.local", UserNameType.UPN);
    var officerTicket = new Ticket("===== security officer's ticket=====");
    var userTicket = new Ticket("===== user's officer ticket=====");
    var creds = [
        Credential.Password,
        Credential.Fingerprints
    ];
    var fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    var policySet = [
        { policy: [
                { cred_id: Credential.Password },
                { cred_id: Credential.Fingerprints },
            ] },
    ];
    var secret = "==== secret data ====;";
    var service;
    beforeEach(function () {
        service = new SecretService(app);
    });
    afterEach(function () {
        FetchMock.restore();
    });
    describe("GetAuthPolicy", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = policySet;
                        FetchMock.getOnce("*", { GetAuthPolicyResult: result });
                        return [4 /*yield*/, expectAsync(service.GetAuthPolicy(user, "DPSECRET", ResourceActions.Read))
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
                        return [4 /*yield*/, expectAsync(service.GetAuthPolicy(user, "DPSECRET", ResourceActions.Read))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DoesSecretExist", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        FetchMock.getOnce("*", { DoesSecretExistResult: result });
                        return [4 /*yield*/, expectAsync(service.DoesSecretExist(user, "DPSECRET"))
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
                        return [4 /*yield*/, expectAsync(service.DoesSecretExist(user, "DPSECRET"))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ReadSecret", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = secret;
                        FetchMock.postOnce("*", { ReadSecretResult: result });
                        return [4 /*yield*/, expectAsync(service.ReadSecret(userTicket, "DPSECRET"))
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
                        return [4 /*yield*/, expectAsync(service.ReadSecret(userTicket, "DPSECRET"))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("WriteSecret", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.putOnce("*", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.WriteSecret(userTicket, "DPSECRET", secret))
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
                        return [4 /*yield*/, expectAsync(service.WriteSecret(userTicket, "DPSECRET", secret))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DeleteSecret", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FetchMock.deleteOnce("*", HttpStatus.Ok);
                        return [4 /*yield*/, expectAsync(service.DeleteSecret(userTicket, "DPSECRET"))
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
                        return [4 /*yield*/, expectAsync(service.DeleteSecret(userTicket, "DPSECRET"))
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