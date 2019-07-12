import { Url } from './url';
describe('Url: ', function () {
    var app = "https://test.local/service.svc";
    var path = "index";
    var query = { name: "John Doe Первый", type: 5, flag: true, nothing: null };
    var app_and_path = "https://test.local/service.svc/index";
    var full = "https://test.local/service.svc/index?name=John%20Doe%20%D0%9F%D0%B5%D1%80%D0%B2%D1%8B%D0%B9&type=5&flag=true&nothing=null";
    it('must be sanitized', function () {
        expect(Url.create(app, path, query)).toBe(full);
        expect(Url.create(app, path)).toBe(app_and_path);
        expect(Url.create(app)).toBe(app);
    });
});
//# sourceMappingURL=url.spec.js.map