var _this = this;
import * as tslib_1 from "tslib";
import { ClaimName } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { ClaimsService, Database } from '.';
import { ServerStatus, HttpStatus } from '../../test';
import { ClaimRequest } from './claim';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("ClaimsService:", function () {
    var app = "http://test.local/service";
    var ticket = {
        jwt: "=====ticket=====",
    };
    var service;
    beforeEach(function () {
        service = new ClaimsService(app);
    });
    afterEach(function () {
        FetchMock.restore();
    });
    describe("GetConfiguredClaims", function () {
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            ticket: ticket,
                        };
                        FetchMock.postOnce("*", { GetConfiguredClaimsResult: result });
                        return [4 /*yield*/, expectAsync(service.GetConfiguredClaims(ticket))
                                .toBeResolvedTo(ticket)];
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
                        return [4 /*yield*/, expectAsync(service.GetConfiguredClaims(ticket))
                                .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GetClaims", function () {
        var request = [
            new ClaimRequest(ClaimName.Group, Database.AD, "memberOf")
        ];
        it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {
                            ticket: ticket,
                        };
                        FetchMock.postOnce("*", { GetClaimsResult: result });
                        return [4 /*yield*/, expectAsync(service.GetClaims(ticket, request))
                                .toBeResolvedTo(ticket)];
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
                        return [4 /*yield*/, expectAsync(service.GetClaims(ticket, request))
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