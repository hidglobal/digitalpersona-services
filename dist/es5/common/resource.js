/**
 * Enumerates supported resource actions.
 */
export var ResourceActions;
(function (ResourceActions) {
    /** Reading of a resource. */
    ResourceActions[ResourceActions["Read"] = 0] = "Read";
    /** Modifying a resource. */
    ResourceActions[ResourceActions["Write"] = 1] = "Write";
    /** Deleting a resource. */
    ResourceActions[ResourceActions["Delete"] = 2] = "Delete";
})(ResourceActions || (ResourceActions = {}));
//# sourceMappingURL=resource.js.map