import { Base64UrlString } from "@digitalpersona/core";
export declare enum VarType {
    /** The variant holds a boolean value. */
    Boolean = 1,
    /** The variant holds an integer value. */
    Integer = 2,
    /** The variant holds a string value.  */
    String = 3,
    /** The variant holds a binary object (in a form of a Base64Url-encoded string). */
    Blob = 4
}
/** A variant data holding a boolean value. */
export declare class VarBool {
    readonly values: boolean[];
    readonly type = VarType.Boolean;
    constructor(values: boolean[]);
}
/** A variant data holding an integer value. */
export declare class VarInt {
    readonly values: number[];
    readonly type = VarType.Integer;
    constructor(values: number[]);
}
/** A variant data holding a string value.  */
export declare class VarString {
    readonly values: string[];
    readonly type = VarType.String;
    constructor(values: string[]);
}
/** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
export declare class VarBlob {
    readonly values: Base64UrlString[];
    readonly type = VarType.Blob;
    constructor(values: Base64UrlString[]);
}
/** A variant data. */
export declare type VarData = VarBool | VarInt | VarString | VarBlob;
