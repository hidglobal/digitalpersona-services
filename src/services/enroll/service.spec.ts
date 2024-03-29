import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError, VarType,  VarString, AttributeAction, Attribute } from '../../common';
import { EnrollService } from '.';
import { ServerStatus, HttpStatus } from '../../test';

const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("EnrollService:", () =>
{
    const app = "http://test.local";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const officerTicket = new Ticket ("===== security officer's ticket=====");
    const userTicket = new Ticket("===== user's officer ticket=====");
    const attribute: VarString = {
        type: VarType.String,
        values: [ "Domain Users", "Authenticated Users" ],
    };
    const creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");

    let service: EnrollService;

    beforeEach(() => {
        service = new EnrollService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });

    describe("GetUserCredentials", () =>
    {
        it('must succeed', async () => {
            const result = creds;
            FetchMock.getOnce(`path:/GetUserCredentials`
                , { GetUserCredentialsResult: result });
            await expectAsync(
                service.GetUserCredentials(user))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserCredentials(user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("GetEnrollmentData", () =>
    {
        it('must succeed', async () => {
            const result = "==== enrollment data =====";
            FetchMock.getOnce(`path:/GetEnrollmentData`
                , { GetEnrollmentDataResult: result });
            await expectAsync(
                service.GetEnrollmentData(user, Credential.Password))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetEnrollmentData(user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("CreateUser", () =>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/CreateUser`, HttpStatus.Ok);
            await expectAsync(
                service.CreateUser(officerTicket, user, "password"))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CreateUser(officerTicket, user, "password"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("DeleteUser", () =>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`path:/DeleteUser`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteUser(officerTicket, user))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteUser(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("EnrollUserCredentials", () =>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/EnrollUserCredentials`, HttpStatus.Ok);
            await expectAsync(
                service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.EnrollUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("DeleteUserCredentials", () =>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`path:/DeleteUserCredentials`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteUserCredentials(officerTicket, userTicket, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("EnrollAltusUserCredentials", () =>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/EnrollAltusUserCredentials`, HttpStatus.Ok);
            await expectAsync(
                service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.EnrollAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("DeleteAltusUserCredentials", () =>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`path:/DeleteAltusUserCredentials`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteAltusUserCredentials(officerTicket, user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("GetUserAttribute", () =>
    {
        it('must succeed', async () => {
            const result: Attribute = {
                name: "group",
                data: attribute,
            };
            FetchMock.postOnce(`path:/GetUserAttribute`
                , { GetUserAttributeResult: attribute });
            await expectAsync(
                service.GetUserAttribute(officerTicket, user, "group"))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserAttribute(officerTicket, user, "group"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("PutUserAttribute", () =>
    {
        const attr: Attribute = {
            name: "group",
            data: attribute,
        };
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/PutUserAttribute`, HttpStatus.Ok);
            await expectAsync(
                service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.PutUserAttribute(officerTicket, user, attr, AttributeAction.Update))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("UnlockUser", () =>
    {
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/UnlockUser`, HttpStatus.Ok);
            await expectAsync(
                service.UnlockUser(user, fingerprints))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.UnlockUser(user, fingerprints))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("CustomAction", () =>
    {
        const result = "==== custom action result ===";
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/CustomAction`
                , { CustomActionResult: result });
            await expectAsync(
                service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.CustomAction(officerTicket, user, fingerprints, 123))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("IsEnrollmentAllowed", () =>
    {
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/IsEnrollmentAllowed`, HttpStatus.Ok);
            await expectAsync(
                service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.IsEnrollmentAllowed(officerTicket, user, Credential.Password))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

});
