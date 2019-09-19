import { __awaiter } from "tslib";
import { ClaimName } from '@digitalpersona/core';
import { ServiceError, DatabaseType } from '../../common';
import { ClaimsService, ClaimRequest } from '.';
import { ServerStatus, HttpStatus } from '../../test';
const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("ClaimsService:", () => {
    const app = "http://test.local";
    const ticket = {
        jwt: "=====ticket=====",
    };
    let service;
    beforeEach(() => {
        service = new ClaimsService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });
    describe("GetConfiguredClaims", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = {
                ticket,
            };
            FetchMock.postOnce(`path:/GetConfiguredClaims`, { GetConfiguredClaimsResult: result });
            yield expectAsync(service.GetConfiguredClaims(ticket))
                .toBeResolvedTo(ticket);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetConfiguredClaims(ticket))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetClaims", () => {
        const request = [
            new ClaimRequest(ClaimName.Group, DatabaseType.AD, "memberOf"),
        ];
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = {
                ticket,
            };
            FetchMock.postOnce(`path:/GetClaims`, { GetClaimsResult: result });
            yield expectAsync(service.GetClaims(ticket, request))
                .toBeResolvedTo(ticket);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetClaims(ticket, request))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
});
//# sourceMappingURL=service.spec.js.map