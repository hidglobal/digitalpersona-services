/**
 * Enumerates supported identity databases.
 */
export var Database;
(function (Database) {
    /** ActiveDirectory (AD) */
    Database["AD"] = "AD";
    /** Lightweight Directory Service (LDS) */
    Database["LDS"] = "ADLDS";
})(Database || (Database = {}));
/**
 * A request for a identity claim.
 * The service will search an {@link ClaimRequest.attr | attribute} in a {@link ClaimRequest.database}
 * and return the attribute value as a claim {@link ClaimRequest.name | name} in a token.
 */
var ClaimRequest = /** @class */ (function () {
    /** Constructs a claim request. */
    function ClaimRequest(
    /** A name of a claim to return. */
    name, 
    /** A database to search for an attribute. */
    db, 
    /** An attribute name to search. */
    attr) {
        this.name = name;
        this.db = db;
        this.attr = attr;
    }
    return ClaimRequest;
}());
export { ClaimRequest };
//# sourceMappingURL=claim.js.map