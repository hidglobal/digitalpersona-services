import { ClaimNames } from '@digitalpersona/core';
/**
 * Enumerates supported identity databases.
 */
export declare enum Database {
    /** ActiveDirectory (AD) */
    AD = "AD",
    /** Lightweight Directory Service (LDS) */
    LDS = "ADLDS"
}
/** Alias type for ActiveDirectory attribute names. */
export declare type ADAttributeName = string;
/** Alias type for Lightweight Directory Service (LDS) attribute names. */
export declare type LDSAttributeName = string;
/** Supported types of attribute names. */
export declare type AttributeName = ADAttributeName | LDSAttributeName;
/**
 * A request for a identity claim.
 * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
 * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
 */
export declare class ClaimRequest {
    /** A name of a claim to return. */
    readonly name: ClaimNames;
    /** A database to search for an attribute. */
    readonly db: Database;
    /** An attribute name to search. */
    readonly attr: AttributeName;
    /** Constructs a claim request. */
    constructor(
    /** A name of a claim to return. */
    name: ClaimNames, 
    /** A database to search for an attribute. */
    db: Database, 
    /** An attribute name to search. */
    attr: AttributeName);
}
