import * as tslib_1 from "tslib";
import { Service } from "./service";
import { HttpStatus } from '../test';
var fetchMock = require('fetch-mock');
describe("Base service: ", () => {
    const app = "http://test.local/service";
    const ping = `${app}/Ping`;
    it("must return true when can ping", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        fetchMock.get(ping, HttpStatus.Ok.status);
        const service = new Service(app);
        expect(yield service.Ping()).toBe(true);
        fetchMock.restore();
    }));
    it("must return false when cannot ping", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        fetchMock.get(ping, HttpStatus.InternalError.status);
        const service = new Service(app);
        expect(yield service.Ping()).toBe(false);
        fetchMock.restore();
    }));
});
//# sourceMappingURL=service.spec.js.map