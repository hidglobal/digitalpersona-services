import { User, UserNameType, Credential, Ticket, ServiceError } from '../../common';
import { EnrollService, AttributeType, Attribute, AttributeAction } from '.';
import { ServerStatus, HttpStatus } from '../../test';

var FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("EnrollService:", ()=>
{
    const app = "http://test.local/service";
    const user: User = {
        name: "john.doe@test.local",
        type: UserNameType.UPN
    }
    const officerTicket: Ticket = {
        jwt: "===== security officer's ticket====="
    }
    const userTicket: Ticket = {
        jwt: "===== user's officer ticket====="
    }
    const attribute: Attribute = {
        type: AttributeType.String,
        values: [ "Domain Users", "Authenticated Users" ]
    }
    const creds = [
        Credential.Password,
        Credential.Fingerprints
    ]
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");

    let service: EnrollService;

    beforeEach(()=>{
        service = new EnrollService(app);
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
    describe("CreateUser", ()=>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.CreateUser(officerTicket, user, "password"))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CreateUser(officerTicket, user, "password"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("DeleteUser", ()=>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteUser(officerTicket, user))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteUser(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("EnrollUserCredentials", ()=>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("DeleteUserCredentials", ()=>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("EnrollAltusUserCredentials", ()=>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.EnrollAltusUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.EnrollAltusUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("DeleteAltusUserCredentials", ()=>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteAltusUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteAltusUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("GetUserAttribute", ()=>
    {
        it('must succeed', async () => {
            const result = attribute;
            FetchMock.postOnce(`*`
                , { GetUserAttributeResult: result });
            await expectAsync(
                service.GetUserAttribute(officerTicket, user, "group"))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserAttribute(officerTicket, user, "group"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("PutUserAttribute", ()=>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.PutUserAttribute(officerTicket, user, "group", AttributeAction.Update, attribute))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.PutUserAttribute(officerTicket, user, "group", AttributeAction.Update, attribute))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("UnlockUser", ()=>
    {
        it('must succeed', async () => {
            FetchMock.postOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.UnlockUser(user, fingerprints))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.UnlockUser(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("CustomAction", ()=>
    {
        const result = "==== custom action result ===";
        it('must succeed', async () => {
            FetchMock.postOnce(`*`
                , { CustomActionResult: result });
            await expectAsync(
                service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeResolvedTo(result);
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })
    describe("IsEnrollmentAllowed", ()=>
    {
        it('must succeed', async () => {
            FetchMock.postOnce(`*`, HttpStatus.Ok);
            await expectAsync(
                service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeResolved();
        })
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        })
    })

})
