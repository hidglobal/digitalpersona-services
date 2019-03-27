import { Base64UrlString } from '../../common';

export enum AttributeAction
{
    Clear = 1,
    Update = 2,
    Append = 3,
    Delete = 4,
}

export enum AttributeType
{
    Boolean = 1,
    Integer = 2,
    String = 3,
    Blob = 4,
}

export type AttributeValue = boolean | number | string | Base64UrlString;

export class Attribute
{
    readonly type: AttributeType;
    readonly values: AttributeValue[];

    constructor(type: AttributeType, values: AttributeValue[]) {
        this.type = type;
        this.values = values;
    }
}

