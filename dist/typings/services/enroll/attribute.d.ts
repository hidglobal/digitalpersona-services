import { Base64UrlString } from '@digitalpersona/core';
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
/** Value type of a user's attribute. */
export declare enum AttributeType {
    /** The attribute can have a boolean value. */
    Boolean = 1,
    /** The attribute can have an integer value. */
    Integer = 2,
    /** The attribute can have a text value. */
    String = 3,
    /** The attribute can have a binary object value. */
    Blob = 4
}
/** Supported attribute value types. */
export declare type AttributeValue = boolean | number | string | Base64UrlString;
/**
 * Represents a single attribute in an identity database.
 */
export declare class Attribute {
    /** An attribute type. */
    readonly type: AttributeType;
    /** A list of attribute values. */
    readonly values: AttributeValue[];
    constructor(
    /** An attribute type. */
    type: AttributeType, 
    /** A list of attribute values. */
    values: AttributeValue[]);
}
