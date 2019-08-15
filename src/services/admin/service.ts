import { User, Ticket, Credential, Base64UrlString } from '@digitalpersona/core';
import { Service } from '../../private';
import { PSKCOutput } from './pskc';
import { SearchQuery } from './search';
import { Attribute } from '../../common';
import { ServerSettingType } from './settings';
import { LicenseType, LicenseInfo } from './license';
import { UACFlags, UserInfo } from './uac';

/** DigitalPersona Web Administration (DPWebAdmin) service interface. */
export interface IAdminService
{
    /**
     * Executes a search on the DPCA Server database and returns the result of search operation.
     * NOTE: The result of search operation is limited to 100 records.
     * @param ticket
     * @param query
     * @returns a promise to return a list of the rows, where each row is a list or requested object attributes.
     * NOTE: The maximum number of rows is limited to 100, the rest of the result is truncated.
     */
    ExecuteSearch(
        ticket: Ticket,
        query: SearchQuery,
    ): Promise<Attribute[][]>;

    /**
     * Imports PSKC data to DPCA database.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to import PSKC data to DPCA database.
     *      The owner of the token must have permissions to import the data.
     *
     * @param PSKCData - a content of PSKC file provided by OTP vendor in Base64Url encoded format
     * @param PSKCFileName - a name of PSKC file provided by OTP vendor. This name is required for audit purposes only.
     * @param password - a password to protect PSKC data.
     *      This parameter is optional and will required only if Encryption Based on Passphrase-Based Keys is used
     *      for data protection in PSKC (see topic 6.2 of RFC6030, https://tools.ietf.org/html/rfc6030 for details)
     * @param sharedKey -  an encoded value of Pre-Shared key for PSKC secrets.
     *      The format of the encoding is manufacturer depended and unknown. It is server's responsibility to find out
     *      a proper encoding format and decode the key.
     *      This parameter is optional and it is required only if Encryption Based on Pre-Shared Keys is used for
     *      data protection in PSKC (see topic 6.1 of RFC6030, https://tools.ietf.org/html/rfc6030 for details)
     * @returns a promise to return a list of objects in DPPSKCOutput format.
     *      It gives us information about result of importing operation for every OTP token inside PSKC file.
     */
    PSKCImport(
        ticket: Ticket,
        PSKCData: Base64UrlString,
        PSKCFileName?: string|null,
        password?: string|null,
        sharedKey?: string|null,
    ): Promise<PSKCOutput[]>;

    /**
     * Queries a list of settings from DPCA Server.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to query server settings.
     *      Some settings may be queried anonymously.
     * @param user - a user whom settings will be queried. User name will direct to the particular DPCA Server
     *      where information about this user saved.
     *      This parameter is optional and can be set to null. If set to null, we direct call to DPCA Server
     *      where information about ticket owner is saved.
     *      If both user and ticket set to null, we direct call to DPCA Server where Altus Confirm is installed.
     * @param settings - a list of settings to query.
     * @returns a promise to return a list of the settings requested
     */
    GetServerSettings(
        ticket: Ticket,
        user: User,
        settings: string[],
    ): Promise<Attribute[]>;

    /**
     * Modifies a list of settings on the DPCA Server.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to modify server settings.
     *      The ticket owner has to have permissions to administer the server.
     * @param type - a type of the settings
     * @param settings - a collection of settings to set
     */
    SetServerSettings(
        ticket: Ticket,
        type: ServerSettingType,
        settings: Attribute[],
    ): Promise<void>;

    /**
     * Query licensing information from the DPCA Server.
     * @param licenseType - a type of a license to query
     * @returns a license information
     */
    GetLicenseInfo(licenseType: LicenseType): Promise<LicenseInfo>;

    /**
     * Requests a user recovery password.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to get Recover Password
     *   from DPCA Server. The owner of the token must have permissions to get a Recovery Password.
     * @param user - a user who needs a recovery password
     * @param encryptedPwd - a Recovery Password encrypted by the user Recovery Key.
     * This encrypted password is provided by our Cred Provider during Windows Logon recovery procedure.
     * @returns a promise to return a recovery password.
     */
    GetUserRecoveryPassword(ticket: Ticket, user: User, encryptedPwd: string): Promise<string>;

    /**
     * Deletes specified user credentias without the user's presence.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to delete user credentials.
     *  The owner of the token must have permissions to reset user credentials.
     * @param user - a user whose credentials will be deleted.
     * @param credentials - a list of credentials ID to delete.
     *      NOTE: currently the `data` part of credentials is ignored.
     */
    AdminDeleteUserCredentials(ticket: Ticket, user: User, credentials: Credential[]): Promise<void>;

    /**
     * Queries an information about a specific user.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to request user information.
     *  The owner of the token must have permissions to query user information.
     * @param user - a user whose information is to be requested.
     * @returns - an information about the user.
     */
    GetUserInfo(ticket: Ticket, user: User): Promise<UserInfo>;

    /**
     * Unlocks previously locked user account.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to unlcok the user account.
     *  The owner of the token must have permissions to unlock user accounts.
     * @param user - the user whose account is to be unlocked.
     * @returns a promise to unlock the user account.
     */
    UnlockUserAccount(ticket: Ticket, user: User): Promise<void>;

    /**
     * Modifies User Account Control bits for the specified user.
     * @param ticket - a ticket with a JSON Web Token of the user who would like to modify UAC bits.
     *  The owner of the token must have permissions to set UAC bits.
     * @param user - the user whose UAC bits are to be modified
     * @param control - Account Control bits needs to be set.
     * NOTE: The control bits provided will override any settings previously set for this particular user
     * so we would recommend to call GetUserInfo or GetUserAttributeto find out what bits were set before the operation.
     */
    SetUserAccountControl(ticket: Ticket, user: User, control: UACFlags): Promise<void>;
}

/** DigitalPersona WebAuth (DPWebAuth) service client wrapper. */
export class AdminService extends Service implements IAdminService
{
    /** Constructs a service wrapper.
     * @param endpointUrl - a URL to the DPWebClaims service.
     */
    constructor(endpointUrl: string) {
        super(endpointUrl);
    }

    /** @inheritdoc */
    public ExecuteSearch(ticket: Ticket, query: SearchQuery): Promise<Attribute[][]>
    {
        return this.endpoint
            .post("ExecuteSearch", null, { ticket, ...query })
            .then(response => JSON.parse(response.ExecuteSearchResult));
    }

    /** @inheritdoc */
    public PSKCImport(
        ticket: Ticket,
        PSKCData: string,
        PSKCFileName?: string|null,
        password?: string|null,
        sharedKey?: string|null,
    ): Promise<PSKCOutput[]>
    {
        return this.endpoint
            .post("PSKCImport", null, { ticket, PSKCData, PSKCFileName, password, sharedKey })
            .then(response => response.PSKCImportResult);
    }

    /** @inheritdoc */
    public GetServerSettings(ticket: Ticket, user: User, settings: string[]): Promise<Attribute[]>
    {
        return this.endpoint
            .post("GetServerSettings", null, { ticket, user, settings })
            .then(response => response.GetServerSettingsResult);
    }

    /** @inheritdoc */
    public SetServerSettings(ticket: Ticket, type: ServerSettingType, settings: Attribute[]): Promise<void>
    {
        return this.endpoint
            .put("SetServerSettings", null, { ticket, type, settings});
    }

    /** @inheritdoc */
    public GetLicenseInfo(type: LicenseType): Promise<LicenseInfo>
    {
        return this.endpoint
            .get("GetLicenseInfo", { type })
            .then(response => response.GetLicenseInfoResult);
    }

    /** @inheritdoc */
    public GetUserRecoveryPassword(ticket: Ticket, user: User, encryptedPwd: string): Promise<string>
    {
        return this.endpoint
            .post("GetUserRecoveryPassword", null, {ticket, user, encryptedPwd })
            .then(response => response.GetUserRecoveryPasswordResult);
    }

    /** @inheritdoc */
    public AdminDeleteUserCredentials(ticket: Ticket, user: User, credentials: Credential[]): Promise<void>
    {
        return this.endpoint
            .del("AdminDeleteUserCredentials", null, { ticket, user, credentials });
    }

    /** @inheritdoc */
    public GetUserInfo(ticket: Ticket, user: User): Promise<UserInfo>
    {
        return this.endpoint
            .post("GetUserInfo", null, { ticket, user })
            .then(response => response.GetUserInfoResult);
    }

    /** @inheritdoc */
    public UnlockUserAccount(ticket: Ticket, user: User): Promise<void>
    {
        return this.endpoint
            .put("UnlockUserAccount", null, { ticket, user });
    }
    /** @inheritdoc */
    public SetUserAccountControl(ticket: Ticket, user: User, control: UACFlags): Promise<void>
    {
        return this.endpoint
            .put("SetUserAccountControl", null, { ticket, user, control });
    }
}
