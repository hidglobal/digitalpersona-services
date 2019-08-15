import { ClaimNames } from '@digitalpersona/core';
import { DatabaseType, AttributeName } from '../../common';
/**
 * A request for a identity claim.
 * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
 * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
 */
export declare class ClaimRequest {
    /** A name of a claim to return. */
    readonly name: ClaimNames;
    /** A database to search for an attribute. */
    readonly db: DatabaseType;
    /** An attribute name to search. */
    readonly attr: AttributeName;
    /** Constructs a claim request. */
    constructor(
    /** A name of a claim to return. */
    name: ClaimNames, 
    /** A database to search for an attribute. */
    db: DatabaseType, 
    /** An attribute name to search. */
    attr: AttributeName);
}
