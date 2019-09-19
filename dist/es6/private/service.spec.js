import { __awaiter } from "tslib";
import { Service } from "./service";
import { HttpStatus } from '../test';
var fetchMock = require('fetch-mock');
describe("Base service: ", () => {
    const app = "http://test.local/service";
    const ping = `${app}/Ping`;
    it("must return true when can ping", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchMock.get(ping, HttpStatus.Ok.status);
        const service = new Service(app);
        expect(yield service.Ping()).toBe(true);
        fetchMock.restore();
    }));
    it("must return false when cannot ping", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchMock.get(ping, HttpStatus.InternalError.status);
        const service = new Service(app);
        expect(yield service.Ping()).toBe(false);
        fetchMock.restore();
    }));
});
//# sourceMappingURL=service.spec.js.map