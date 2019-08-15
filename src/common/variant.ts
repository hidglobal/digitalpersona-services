import { Base64UrlString } from "@digitalpersona/core";

export enum VarType
{
    /** The variant holds a boolean value. */
    Boolean = 1,
    /** The variant holds an integer value. */
    Integer = 2,
    /** The variant holds a string value.  */
    String = 3,
    /** The variant holds a binary object (in a form of a Base64Url-encoded string). */
    Blob = 4,
}

/** A variant data holding a boolean value. */
export class VarBool
{
    public readonly type = VarType.Boolean;
    constructor(
        public readonly values: boolean[],
    ){}
}

/** A variant data holding an integer value. */
export class VarInt
{
    public readonly type = VarType.Integer;
    constructor(
        public readonly values: number[],
    ){}
}
/** A variant data holding a string value.  */
export class VarString
{
    public readonly type = VarType.String;
    constructor(
        public readonly values: string[],
    ){}
}
/** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
export class VarBlob
{
    public readonly type = VarType.Blob;
    constructor(
        public readonly values: Base64UrlString[],
    ){}
}

/** A variant data. */
export type VarData = VarBool | VarInt | VarString | VarBlob;
