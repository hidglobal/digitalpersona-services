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
export class VarBool {
    constructor(values) {
        this.values = values;
        this.type = VarType.Boolean;
    }
}
/** A variant data holding an integer value. */
export class VarInt {
    constructor(values) {
        this.values = values;
        this.type = VarType.Integer;
    }
}
/** A variant data holding a string value.  */
export class VarString {
    constructor(values) {
        this.values = values;
        this.type = VarType.String;
    }
}
/** A variant data holding a binary object (in a form of a Base64Url-encoded string). */
export class VarBlob {
    constructor(values) {
        this.values = values;
        this.type = VarType.Blob;
    }
}
//# sourceMappingURL=variant.js.map