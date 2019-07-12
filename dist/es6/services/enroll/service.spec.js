import * as tslib_1 from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { EnrollService, AttributeType, Attribute, AttributeAction } from '.';
import { ServerStatus, HttpStatus } from '../../test';
var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("EnrollService:", () => {
    const app = "http://test.local/service";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const officerTicket = new Ticket("===== security officer's ticket=====");
    const userTicket = new Ticket("===== user's officer ticket=====");
    const attribute = new Attribute(AttributeType.String, ["Domain Users", "Authenticated Users"]);
    const creds = [
        Credential.Password,
        Credential.Fingerprints
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
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = creds;
            FetchMock.getOnce(`*`, { GetUserCredentialsResult: result });
            yield expectAsync(service.GetUserCredentials(user))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetUserCredentials(user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetEnrollmentData", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = "==== enrollment data =====";
            FetchMock.getOnce(`*`, { GetEnrollmentDataResult: result });
            yield expectAsync(service.GetEnrollmentData(user, Credential.Password))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetEnrollmentData(user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CreateUser", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.CreateUser(officerTicket, user, "password"))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CreateUser(officerTicket, user, "password"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteUser", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.DeleteUser(officerTicket, user))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteUser(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("EnrollUserCredentials", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteUserCredentials", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("EnrollAltusUserCredentials", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DeleteAltusUserCredentials", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("GetUserAttribute", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = attribute;
            FetchMock.postOnce(`*`, { GetUserAttributeResult: result });
            yield expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.GetUserAttribute(officerTicket, user, "group"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("PutUserAttribute", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.PutUserAttribute(officerTicket, user, "group", AttributeAction.Update, attribute))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.PutUserAttribute(officerTicket, user, "group", AttributeAction.Update, attribute))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("UnlockUser", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.postOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.UnlockUser(user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.UnlockUser(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CustomAction", () => {
        const result = "==== custom action result ===";
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.postOnce(`*`, { CustomActionResult: result });
            yield expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("IsEnrollmentAllowed", () => {
        it('must succeed', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            FetchMock.postOnce(`*`, HttpStatus.Ok);
            yield expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeResolved();
        }));
        it('must fail', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
});
//# sourceMappingURL=service.spec.js.map