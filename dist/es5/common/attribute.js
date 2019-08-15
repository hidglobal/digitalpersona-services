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
//# sourceMappingURL=attribute.js.map