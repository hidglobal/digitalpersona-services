/** Enumerates supported actions that can be performed on user's attributes. */
export var AttributeAction;
(function (AttributeAction) {
    /** Clear an attribute's value. */
    AttributeAction[AttributeAction["Clear"] = 1] = "Clear";
    /** Update an attribute's value.  */
    AttributeAction[AttributeAction["Update"] = 2] = "Update";
    /** Append a value to the existing multi-value attribute. */
    AttributeAction[AttributeAction["Append"] = 3] = "Append";
    /** Delete an attribute. */
    AttributeAction[AttributeAction["Delete"] = 4] = "Delete";
})(AttributeAction || (AttributeAction = {}));
/** Value type of a user's attribute. */
export var AttributeType;
(function (AttributeType) {
    /** The attribute can have a boolean value. */
    AttributeType[AttributeType["Boolean"] = 1] = "Boolean";
    /** The attribute can have an integer value. */
    AttributeType[AttributeType["Integer"] = 2] = "Integer";
    /** The attribute can have a text value. */
    AttributeType[AttributeType["String"] = 3] = "String";
    /** The attribute can have a binary object value. */
    AttributeType[AttributeType["Blob"] = 4] = "Blob";
})(AttributeType || (AttributeType = {}));
/**
 * Represents a single attribute in an identity database.
 */
var Attribute = /** @class */ (function () {
    function Attribute(
    /** An attribute type. */
    type, 
    /** A list of attribute values. */
    values) {
        this.type = type;
        this.values = values;
    }
    return Attribute;
}());
export { Attribute };
//# sourceMappingURL=attribute.js.map