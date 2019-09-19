import { __awaiter } from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError, VarType, AttributeAction } from '../../common';
import { EnrollService } from '.';
import { ServerStatus, HttpStatus } from '../../test';
const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("EnrollService:", () => {
    const app = "http://test.local";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const officerTicket = new Ticket("===== security officer's ticket=====");
    const userTicket = new Ticket("===== user's officer ticket=====");
    const attribute = {
        type: VarType.String,
        values: ["Domain Users", "Authenticated Users"],
    };
    const creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    let service;
    beforeEach(() => {
        service = new EnrollService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });
    describe("GetUserCredentials", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = creds;
            FetchMock.getOnce(`path:/GetUserCredentials`, { GetUserCredentialsResult: result });
            yield expectAsync(service.GetUserCredentials(user))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetUserCredentials(user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetEnrollmentData", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = "==== enrollment data =====";
            FetchMock.getOnce(`path:/GetEnrollmentData`, { GetEnrollmentDataResult: result });
            yield expectAsync(service.GetEnrollmentData(user, Credential.Password))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetEnrollmentData(user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CreateUser", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.putOnce(`path:/CreateUser`, HttpStatus.Ok);
            yield expectAsync(service.CreateUser(officerTicket, user, "password"))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CreateUser(officerTicket, user, "password"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteUser", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.deleteOnce(`path:/DeleteUser`, HttpStatus.Ok);
            yield expectAsync(service.DeleteUser(officerTicket, user))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteUser(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("EnrollUserCredentials", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.putOnce(`path:/EnrollUserCredentials`, HttpStatus.Ok);
            yield expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteUserCredentials", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.deleteOnce(`path:/DeleteUserCredentials`, HttpStatus.Ok);
            yield expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("EnrollAltusUserCredentials", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.putOnce(`path:/EnrollAltusUserCredentials`, HttpStatus.Ok);
            yield expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteAltusUserCredentials", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.deleteOnce(`path:/DeleteAltusUserCredentials`, HttpStatus.Ok);
            yield expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetUserAttribute", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = {
                name: "group",
                data: attribute,
            };
            FetchMock.postOnce(`path:/GetUserAttribute`, { GetUserAttributeResult: attribute });
            yield expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("PutUserAttribute", () => {
        const attr = {
            name: "group",
            data: attribute,
        };
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.putOnce(`path:/PutUserAttribute`, HttpStatus.Ok);
            yield expectAsync(service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("UnlockUser", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.postOnce(`path:/UnlockUser`, HttpStatus.Ok);
            yield expectAsync(service.UnlockUser(user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.UnlockUser(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CustomAction", () => {
        const result = "==== custom action result ===";
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.postOnce(`path:/CustomAction`, { CustomActionResult: result });
            yield expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("IsEnrollmentAllowed", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.postOnce(`path:/IsEnrollmentAllowed`, HttpStatus.Ok);
            yield expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
});
//# sourceMappingURL=service.spec.js.map