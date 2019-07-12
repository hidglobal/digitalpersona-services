import * as tslib_1 from "tslib";
import { ClaimName } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { ClaimsService, Database } from '.';
import { ServerStatus, HttpStatus } from '../../test';
import { ClaimRequest } from './claim';
const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("ClaimsService:", () => {
    const app = "http://test.local/service";
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
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = {
                ticket,
            };
            FetchMock.postOnce(`*`, { GetConfiguredClaimsResult: result });
            yield expectAsync(service.GetConfiguredClaims(ticket))
                .toBeResolvedTo(ticket);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetConfiguredClaims(ticket))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetClaims", () => {
        const request = [
            new ClaimRequest(ClaimName.Group, Database.AD, "memberOf")
        ];
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = {
                ticket,
            };
            FetchMock.postOnce(`*`, { GetClaimsResult: result });
            yield expectAsync(service.GetClaims(ticket, request))
                .toBeResolvedTo(ticket);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetClaims(ticket, request))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
});
//# sourceMappingURL=service.spec.js.map