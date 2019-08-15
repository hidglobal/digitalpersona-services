import { ClaimNames } from '@digitalpersona/core';
import { DatabaseType, AttributeName } from '../../common';

/**
 * A request for a identity claim.
 * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
 * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
 */
export class ClaimRequest
{
    /** Constructs a claim request. */
    constructor(
        /** A name of a claim to return. */
        public readonly name: ClaimNames,
        /** A database to search for an attribute. */
        public readonly db: DatabaseType,
        /** An attribute name to search. */
        public readonly attr: AttributeName,
    ){
    }
}
