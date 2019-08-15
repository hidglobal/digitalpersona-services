export var VarType;
(function (VarType) {
    /** The variant holds a boolean value. */
    VarType[VarType["Boolean"] = 1] = "Boolean";
    /** The variant holds an integer value. */
    VarType[VarType["Integer"] = 2] = "Integer";
    /** The variant holds a string value.  */
    VarType[VarType["String"] = 3] = "String";
    /** The variant holds a binary object (in a form of a Base64Url-encoded string). */
    VarType[VarType["Blob"] = 4] = "Blob";
})(VarType || (VarType = {}));
/** A variant data holding a boolean value. */
var VarBool = /** @class */ (function () {
    function VarBool(values) {
        this.values = values;
        this.type = VarType.Boolean;
    }
    return VarBool;
}());
export { VarBool };
/** A variant data holding an integer value. */
var VarInt = /** @class */ (function () {
    function VarInt(values) {
        this.values = values;
        this.type = VarType.Integer;
    }
    return VarInt;
}());
export { VarInt };
/** A variant data holding a string value.  */
var VarString = /** @class */ (function () {
    function VarString(values) {
        this.values = values;
        this.type = VarType.String;
    }
    return VarString;
}());
export { VarString };
/** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
var VarBlob = /** @class */ (function () {
    function VarBlob(values) {
        this.values = values;
        this.type = VarType.Blob;
    }
    return VarBlob;
}());
export { VarBlob };
//# sourceMappingURL=variant.js.map