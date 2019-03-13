import { ClaimNames } from '@common';

export enum Database {
    AD = "AD",
    LDS = "ADLDS"
}

export type ADAttributeName = string;
export type LDSAttributeName = string;
export type AttributeName = ADAttributeName | LDSAttributeName;

export class ClaimRequest
{
    public readonly name: ClaimNames;
    public readonly db: Database;
    public readonly attr: AttributeName;

    constructor(name: ClaimNames, database: Database, attribute: AttributeName)
    {
        this.name = name;
        this.db = database;
        this.attr = attribute;
    }
}
