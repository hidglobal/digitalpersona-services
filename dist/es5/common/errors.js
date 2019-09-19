import { __extends } from "tslib";
/**
 * Maps Web Access service faults to the Javascript exception model
 */
var ServiceError = /** @class */ (function (_super) {
    __extends(ServiceError, _super);
    /** Constructs the object. */
    function ServiceError(code, message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    /** Creates a service error object from a {@link ServiceFault | service fault}. */
    ServiceError.fromServiceFault = function (fault) {
        return new ServiceError(fault.error_code, fault.description);
    };
    /** Allows to distinguish transport errors (HTTP) from {@link ServiceFault | service faults}.
     * @returns `true` if the error was a transport error (HTTP),
     *          `false` if it was a {@link ServiceFault | service fault}.
     */
    ServiceError.prototype.isHttpError = function () { return this.code >= 400 && this.code < 600; };
    return ServiceError;
}(Error));
export { ServiceError };
//# sourceMappingURL=errors.js.map