import { __awaiter } from "tslib";
import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError } from '../../common';
import { AuthService, AuthenticationStatus } from '.';
import { ServerStatus, HttpStatus } from '../../test';
const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;
describe("AuthService:", () => {
    const app = "http://test.local";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const ticket = new Ticket("=====ticket=====");
    const creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    let service;
    beforeEach(() => {
        service = new AuthService(app);
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
    describe("IdentifyUser", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = ticket;
            FetchMock.postOnce(`path:/IdentifyUser`, { IdentifyUserResult: result });
            yield expectAsync(service.Identify(fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.Identify(fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("AuthenticateUser", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = ticket;
            FetchMock.postOnce(`path:/AuthenticateUser`, { AuthenticateUserResult: result });
            yield expectAsync(service.Authenticate(user, fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.Authenticate(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("AuthenticateUserTicket", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = ticket;
            FetchMock.postOnce(`path:/AuthenticateUserTicket`, { AuthenticateUserTicketResult: result });
            yield expectAsync(service.Authenticate(ticket, fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.Authenticate(ticket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CustomAction", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = "====custom action result====";
            FetchMock.postOnce(`path:/CustomAction`, { CustomActionResult: result });
            yield expectAsync(service.CustomAction(101, ticket, user, fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must succeed, returns nothing', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.postOnce(`*`, { CustomActionResult: null });
            yield expectAsync(service.CustomAction(101, ticket, user, fingerprints))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CustomAction(101, ticket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CreateUserAuthentication", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = 12345;
            FetchMock.postOnce(`path:/CreateUserAuthentication`, { CreateUserAuthenticationResult: result });
            yield expectAsync(service.CreateAuthentication(user, Credential.Fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CreateAuthentication(user, Credential.Fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("CreateTicketAuthentication", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = 12345;
            FetchMock.postOnce(`path:/CreateTicketAuthentication`, { CreateTicketAuthenticationResult: result });
            yield expectAsync(service.CreateAuthentication(ticket, Credential.Fingerprints))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.CreateAuthentication(ticket, Credential.Fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("ContinueAuthentication", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = Object.assign(Object.assign({}, ticket), { status: AuthenticationStatus.Continue, authData: "==== auth data ====" });
            FetchMock.postOnce(`path:/ContinueAuthentication`, { ContinueAuthenticationResult: result });
            yield expectAsync(service.ContinueAuthentication(12345, ticket.jwt))
                .toBeResolvedTo(result);
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.ContinueAuthentication(12345, ticket.jwt))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
    describe("DestroyAuthentication", () => {
        it('must succeed', () => __awaiter(void 0, void 0, void 0, function* () {
            FetchMock.deleteOnce(`path:/DestroyAuthentication`, HttpStatus.Ok);
            yield expectAsync(service.DestroyAuthentication(12345))
                .toBeResolved();
        }));
        it('must fail', () => __awaiter(void 0, void 0, void 0, function* () {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`, new Response(JSON.stringify(fault), HttpStatus.NotFound));
            yield expectAsync(service.DestroyAuthentication(12345))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        }));
    });
});
//# sourceMappingURL=service.spec.js.map