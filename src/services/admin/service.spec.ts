import { User, UserNameType, Credential, Ticket } from '@digitalpersona/core';
import { ServiceError, VarType, VarString, Attribute, VarInt } from '../../common';
import { ServerStatus, HttpStatus } from '../../test';
import {
    AdminService,
    SearchQuery, SearchScope,
    PSKCOutput,
    ServerSettingType,
    LicenseType, LicenseInfo,
    UserInfo, UserAccountType, UACFlags } from '.';

const FetchMock = require('fetch-mock');
FetchMock.config.sendAsJson = true;

describe("AdminService:", () =>
{
    const app = "http://test.local";
    const user = new User("john.doe@test.local", UserNameType.UPN);
    const officerTicket = new Ticket ("===== security officer's ticket=====");
    const userTicket = new Ticket("===== user's officer ticket=====");
    const attribute: VarString = {
        type: VarType.String,
        values: [ "Domain Users", "Authenticated Users" ],
    };

    let service: AdminService;

    beforeEach(() => {
        service = new AdminService(app);
    });
    afterEach(() => {
        FetchMock.restore();
    });

    describe("ExecuteSearch", () =>
    {
        const query: SearchQuery = {
            scope: SearchScope.Base,
            filter: "(&(objectClass=user)(objectCategory=person))",
            attributes: ["cn", "memberOf", "dpUserAccounControl"],
            sort: "cn",
        };
        const searchResult: Attribute[][] = [
            [   {   name: "cn",
                    data: new VarString(["John Doe"]),
                },
                {   name: "memberOf",
                    data: new VarString([
                        "CN=Blue Group,CN=Users,DC=test,DC=local",
                        "CN=Engineering,OU=Groups,DC=test,DC=local",
                    ]),
                },
                {   name: "dpUserAccountControl",
                    data: new VarInt([2]),
                },
            ],
            [   {   name: "cn",
                    data: new VarString(["Jane Doe"]),
                },
                {   name: "memberOf",
                    data: new VarString([
                        "CN=Red Group,CN=Users,DC=test,DC=local",
                        "CN=Engineering,OU=Groups,DC=test,DC=local",
                    ]),
                },
                {   name: "dpUserAccountControl",
                    data: null,
                },
            ],
        ];
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/ExecuteSearch`
                , { ExecuteSearchResult: JSON.stringify(searchResult) });
            await expectAsync(
                service.ExecuteSearch(officerTicket, query))
                .toBeResolvedTo(JSON.parse(JSON.stringify(searchResult)));
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.ExecuteSearch(officerTicket, query))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("PSKCImport", () =>
    {
        const input = "==== PSKC Data ====";
        const output: PSKCOutput[] = [
            { serial_number: "1234" },
            { error: 9876, error_text: "Error 9876" },
        ];
        it('must succeed', async () => {
            FetchMock.postOnce('path:/PSKCImport'
                , { PSKCImportResult: output });
            await expectAsync(
                service.PSKCImport(officerTicket, input))
                .toBeResolvedTo(output);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.PSKCImport(officerTicket, input))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("GetServerSettings", () =>
    {
        const settingNames = [ "LockoutThreshold", "LockoutDuration", "LockoutReset" ];
        const output = [
            { name: "LockoutThreshold", data: new VarInt([0])},
            { name: "LockoutDuration" , data: new VarInt([30])},
            { name: "LockoutReset"    , data: new VarInt([5])},
        ];
        it('must succeed', async () => {
            FetchMock.postOnce('path:/GetServerSettings'
                , { GetServerSettingsResult: output });
            await expectAsync(
                service.GetServerSettings(officerTicket, user, settingNames ))
                .toBeResolvedTo(JSON.parse(JSON.stringify(output)));
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetServerSettings(officerTicket, user, settingNames ))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("SetServerSettings", () =>
    {
        const settings = [
            { name: "LockoutThreshold", data: new VarInt([0])},
            { name: "LockoutDuration" , data: new VarInt([30])},
            { name: "LockoutReset"    , data: new VarInt([5])},
        ];
        it('must succeed', async () => {
            FetchMock.putOnce('path:/SetServerSettings', HttpStatus.Ok);
            await expectAsync(
                service.SetServerSettings(officerTicket, ServerSettingType.Admin, settings ))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.SetServerSettings(officerTicket, ServerSettingType.Admin, settings ))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("GetLicenseInfo", () =>
    {
        const result: LicenseInfo = {
            type: LicenseType.ADUser,
            licenses_deployed: 100,
            licenses_used: 50,
        };
        it('must succeed', async () => {
            FetchMock.getOnce(`${app}/GetLicenseInfo?type=1`
                , { GetLicenseInfoResult: result });
            await expectAsync(
                service.GetLicenseInfo(LicenseType.ADUser))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.getOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetLicenseInfo(LicenseType.ADUser))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("GetUserRecoveryPassword", () =>
    {
        const encPassword = "==== Encrypted Password ===";
        const result = "==== Recovery Password ===";
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/GetUserRecoveryPassword`
                , { GetUserRecoveryPasswordResult: result });
            await expectAsync(
                service.GetUserRecoveryPassword(officerTicket, user, encPassword))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserRecoveryPassword(officerTicket, user, encPassword))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("AdminDeleteUserCredentials", () =>
    {
        const credentials: Credential[] = [
            new Credential(Credential.Password),
            new Credential(Credential.Fingerprints),
        ];
        it('must succeed', async () => {
            FetchMock.deleteOnce(`path:/AdminDeleteUserCredentials`, HttpStatus.Ok);
            await expectAsync(
                service.AdminDeleteUserCredentials(officerTicket, user, credentials ))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.deleteOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.AdminDeleteUserCredentials(officerTicket, user, credentials ))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("GetUserInfo", () =>
    {
        const result: UserInfo = {
            uid: "UID",
            displayName: "John Doe",
            type: UserAccountType.ActiveDirectory,
            accountControl: UACFlags.OtpAndFingerprint,
            locked: false,
            licensed: true,
        };
        it('must succeed', async () => {
            FetchMock.postOnce(`path:/GetUserInfo`
                , { GetUserInfoResult: result });
            await expectAsync(
                service.GetUserInfo(officerTicket, user))
                .toBeResolvedTo(result);
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.postOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.GetUserInfo(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("UnlockUserAccount", () =>
    {
        it('must succeed', async () => {
            FetchMock.putOnce(`path:/UnlockUserAccount`, HttpStatus.Ok);
            await expectAsync(
                service.UnlockUserAccount(officerTicket, user))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.UnlockUserAccount(officerTicket, user))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

    describe("SetUserAccountControl", () =>
    {
        const control: UACFlags = UACFlags.OtpAndFingerprint;
        it('must succeed', async () => {
            FetchMock.putOnce('path:/SetUserAccountControl', HttpStatus.Ok);
            await expectAsync(
                service.SetUserAccountControl(officerTicket, user, control ))
                .toBeResolved();
        });
        it('must fail', async () => {
            const fault = ServerStatus.E_FAIL;
            FetchMock.putOnce(`*`
                , new Response(JSON.stringify(fault)
                , HttpStatus.NotFound));
            await expectAsync(
                service.SetUserAccountControl(officerTicket, user, control ))
                .toBeRejectedWith(ServiceError.fromServiceFault(fault));
        });
    });

});
