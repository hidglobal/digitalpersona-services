import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ResourceActions, Policy, ServiceError } from '../../common';
import { SecretService } from '.';
import { ServerStatus, HttpStatus } from '../../test';

const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("SecretService:", () =>
{
    const app = "http://test.local";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const officerTicket = new Ticket("===== security officer's ticket=====");
    const userTicket = new Ticket("===== user's officer ticket=====");
    const creds = [
        Credential.Password,
        Credential.Fingerprints,
    ];
    const fingerprints = new Credential(Credential.Fingerprints, "===fingerprint data===");
    const policySet: Policy[] = [
        { policy: [
            { cred_id: Credential.Password },
            { cred_id: Credential.Fingerprints },
        ]},
    ];
    const secret = "==== secret data ====;";

    let service: SecretService;

    beforeEach(() => {
        service = new SecretService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });

    describe("GetAuthPolicy", () =>
    {
        it('must succeed', async () => {
            const result = policySet;
            FetchMock.getOnce(`path:/GetAuthPolicy`
                , { GetAuthPolicyResult: result });
            await expectAsync(
                service.GetAuthPolicy(user, "DPSECRET", ResourceActions.Read))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetAuthPolicy(user, "DPSECRET", ResourceActions.Read))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("DoesSecretExist", () =>
    {
        it('must succeed', async () => {
            const result = true;
            FetchMock.getOnce(`path:/DoesSecretExist`
                , { DoesSecretExistResult: result });
            await expectAsync(
                service.DoesSecretExist(user, "DPSECRET"))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DoesSecretExist(user, "DPSECRET"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("ReadSecret", () =>
    {
        it('must succeed', async () => {
            const result = secret;
            FetchMock.postOnce(`path:/ReadSecret`
                , { ReadSecretResult: result });
            await expectAsync(
                service.ReadSecret(userTicket, "DPSECRET"))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.ReadSecret(userTicket, "DPSECRET"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("WriteSecret", () =>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/WriteSecret`, HttpStatus.Ok);
            await expectAsync(
                service.WriteSecret(userTicket, "DPSECRET", secret))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.WriteSecret(userTicket, "DPSECRET", secret))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
    describe("DeleteSecret", () =>
    {
        it('must succeed', async () => {
            FetchMock.deleteOnce(`path:/DeleteSecret`, HttpStatus.Ok);
            await expectAsync(
                service.DeleteSecret(userTicket, "DPSECRET"))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.DeleteSecret(userTicket, "DPSECRET"))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });
});
