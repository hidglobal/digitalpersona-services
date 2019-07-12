import * as tslib_1 from "tslib";
import { User } from '@digitalpersona/core';
import { ResourceActions, ServiceError } from '../../common';
import { PolicyService } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe('PolicyService: ', () => {
    const app = "http://test.local/service";
    const resource = "http://test.local/resource";
    const user = new User('john_doe+test@test.local', 5);
    const context = {
        ip: true
    };
    let service;
    beforeEach(() => {
        service = new PolicyService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });
    it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = {
            policyList: [],
            policyTriggers: []
        };
        FetchMock.getOnce(`*`, { GetPolicyInfoResult: result });
        yield expectAsync(service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
            .toBeResolvedTo(result);
    }));
    it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const fault = ServerStatus.E_FAIL;
        FetchMock.getOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
        yield expectAsync(service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
            .toBeRejectedWith(ServiceError.fromServiceFault(fault));
    }));
});
//# sourceMappingURL=service.spec.js.map