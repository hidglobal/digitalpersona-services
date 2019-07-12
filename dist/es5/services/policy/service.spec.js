var _this = this;
import * as tslib_1 from "tslib";
import { User } from '@digitalpersona/core';
import { ResourceActions, ServiceError } from '../../common';
import { PolicyService } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe('PolicyService: ', function () {
    var app = "http://test.local/service";
    var resource = "http://test.local/resource";
    var user = new User('john_doe+test@test.local', 5);
    var context = {
        ip: true
    };
    var service;
    beforeEach(function () {
        service = new PolicyService(app);
    });
    afterEach(function () {
        FetchMock.restore();
    });
    it('must succeed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        policyList: [],
                        policyTriggers: []
                    };
                    FetchMock.getOnce("*", { GetPolicyInfoResult: result });
                    return [4 /*yield*/, expectAsync(service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
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
                    return [4 /*yield*/, expectAsync(service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
                            .toBeRejectedWith(ServiceError.fromServiceFault(fault))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=service.spec.js.map