var _this = this;
import * as tslib_1 from "tslib";
import { Service } from "./service";
import { HttpStatus } from '../test';
var fetchMock = require('fetch-mock');
describe("Base service: ", function () {
    var app = "http://test.local/service";
    var ping = app + "/Ping";
    it("must return true when can ping", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var service, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fetchMock.get(ping, HttpStatus.Ok.status);
                    service = new Service(app);
                    _a = expect;
                    return [4 /*yield*/, service.Ping()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(true);
                    fetchMock.restore();
                    return [2 /*return*/];
            }
        });
    }); });
    it("must return false when cannot ping", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var service, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fetchMock.get(ping, HttpStatus.InternalError.status);
                    service = new Service(app);
                    _a = expect;
                    return [4 /*yield*/, service.Ping()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(false);
                    fetchMock.restore();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=service.spec.js.map