import { Base64UrlString } from '@digitalpersona/core';

/** Enumerates supported actions that can be performed on user's attributes. */
export enum AttributeAction
{
    /** Clear an attribute's value. */
    Clear = 1,
    /** Update an attribute's value.  */
    Update = 2,
    /** Append a value to the existing multi-value attribute. */
    Append = 3,
    /** Delete an attribute. */
    Delete = 4,
}

/** Value type of a user's attribute. */
export enum AttributeType
{
    /** The attribute can have a boolean value. */
    Boolean = 1,
    /** The attribute can have an integer value. */
    Integer = 2,
    /** The attribute can have a text value. */
    String = 3,
    /** The attribute can have a binary object value. */
    Blob = 4,
}

/** Supported attribute value types. */
export type AttributeValue = boolean | number | string | Base64UrlString;

/**
 * Represents a single attribute in an identity database.
 */
export class Attribute
{
    constructor(
        /** An attribute type. */
        public readonly type: AttributeType,
        /** A list of attribute values. */
        public readonly values: AttributeValue[],
    ){
    }
}
