import { VarData } from "./variant";
/** Branded alias type for ActiveDirectory attribute names. */
export declare type ADAttributeName = string & {
    brand?: "dp.services.ADAttributeName";
};
/** Branded alias type for Lightweight Directory Service (LDS) attribute names. */
export declare type LDSAttributeName = string & {
    brand?: "dp.services.LDSAttributeName";
};
/** Supported types of attribute names. */
export declare type AttributeName = ADAttributeName | LDSAttributeName;
/** Enumerates supported actions that can be performed on user's attributes. */
export declare enum AttributeAction {
    /** Clear an attribute's value. */
    Clear = 1,
    /** Update an attribute's value.  */
    Update = 2,
    /** Append a value to the existing multi-value attribute. */
    Append = 3,
    /** Delete an attribute. */
    Delete = 4
}
/** A named attribute with a variant data value. */
export interface Attribute {
    name: string;
    data: VarData | null;
}
