import { User } from '@digitalpersona/core';
import { ResourceActions, ServiceError } from '../../common';
import { PolicyService } from '.';
import { ServerStatus, HttpStatus } from '../../test';

const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe('PolicyService: ', () =>
{
    const app = "http://test.local";
    const resource = "http://test.local/resource";
    const user = new User('john_doe+test@test.local', 5);
    const context = {
        ip: true,
    };

    let service: PolicyService;

    beforeEach(() => {
        service = new PolicyService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });

    describe('GetPolicyinfo', () =>
    {
        it('must succeed', async () => {
            const result = {
                policyList: [],
                policyTriggers: [],
            };
            FetchMock.postOnce(`path:/GetPolicyInfo`
                , { GetPolicyInfoResult: result });
            await expectAsync(
                service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
                .toBeResolvedTo(result);
        });

        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetPolicyInfo(user, resource, ResourceActions.Read, context))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
});
