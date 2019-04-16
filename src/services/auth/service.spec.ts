import { User, UserNameType, Credential, Ticket, ServiceError } from '../../common';
import { AuthService, AuthenticationHandle, AuthenticationStatus } from '.';
import { ServerStatus, HttpStatus } from '../../test';

var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("AuthService:", ()=>
{
    const app = "http://test.local/service";
    const user: User = {
        name: "john.doe@test.local",
        type: UserNameType.UPN
    }
    const ticket: Ticket = {
        jwt: "=====ticket====="
    }
    const creds = [
        Credential.Password,
        Credential.Fingerprints
    ]
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");

    let service: AuthService;

    beforeEach(()=>{
        service = new AuthService(app);
    })
    afterEach(()=>{
        FetchMock.restore();
    })

    describe("GetUserCredentials", ()=>
    {
        it('must succeed', async () => {
            const result = creds;
            FetchMock.getOnce(`*`
                , { GetUserCredentialsResult: result });
            await expectAsync(
                service.GetUserCredentials(user))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserCredentials(user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("GetEnrollmentData", ()=>
    {
        it('must succeed', async () => {
            const result = "==== enrollment data =====";
            FetchMock.getOnce(`*`
                , { GetEnrollmentDataResult: result });
            await expectAsync(
                service.GetEnrollmentData(user, Credential.Password))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetEnrollmentData(user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("IdentifyUser", ()=>
    {
        it('must succeed', async () => {
            const result = ticket;
            FetchMock.postOnce(`*`
                , { IdentifyUserResult: result });
            await expectAsync(
                service.IdentifyUser(fingerprints))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.IdentifyUser(fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("AuthenticateUser", ()=>
    {
        it('must succeed', async () => {
            const result = ticket;
            FetchMock.postOnce(`*`
                , { AuthenticateUserResult: result });
            await expectAsync(
                service.AuthenticateUser(user, fingerprints))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.AuthenticateUser(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("AuthenticateTicket", ()=>
    {
        it('must succeed', async () => {
            const result = ticket;
            FetchMock.postOnce(`*`
                , { AuthenticateTicketResult: result });
            await expectAsync(
                service.AuthenticateTicket(ticket, fingerprints))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.AuthenticateTicket(ticket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("CustomAction", ()=>
    {
        it('must succeed', async () => {
            const result = "====custom action result====";
            FetchMock.postOnce(`*`
                , { CustomActionResult: result });
            await expectAsync(
                service.CustomAction(101, ticket, user, fingerprints))
                .toBeResolvedTo(result);
        })
        it('must succeed, returns nothing', async () => {
            FetchMock.postOnce(`*`
                , { CustomActionResult: null });
            await expectAsync(
                service.CustomAction(101, ticket, user, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CustomAction(101, ticket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("CreateUserAuthentication", ()=>
    {
        it('must succeed', async () => {
            const result = 12345 as AuthenticationHandle;
            FetchMock.postOnce(`*`
                , { CreateUserAuthenticationResult: result });
            await expectAsync(
                service.CreateUserAuthentication(user, Credential.Fingerprints))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CreateUserAuthentication(user, Credential.Fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("CreateTicketAuthentication", ()=>
    {
        it('must succeed', async () => {
            const result = 12345 as AuthenticationHandle;
            FetchMock.postOnce(`*`
                , { CreateTicketAuthenticationResult: result });
            await expectAsync(
                service.CreateTicketAuthentication(ticket, Credential.Fingerprints))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CreateTicketAuthentication(ticket, Credential.Fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("ContinueAuthentication", ()=>
    {
        it('must succeed', async () => {
            const result = {
                ...ticket,
                status: AuthenticationStatus.Continue,
                authData: "==== auth data ====",
            };
            FetchMock.postOnce(`*`
                , { ContinueAuthenticationResult: result });
            await expectAsync(
                service.ContinueAuthentication(12345, ticket.jwt))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.ContinueAuthentication(12345, ticket.jwt))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("DestroyAuthentication", ()=>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.DestroyAuthentication(12345))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DestroyAuthentication(12345))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })

})
