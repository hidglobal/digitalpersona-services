var Url = /** @class */ (function () {
    function Url(base, path, query) {
        this.href = Url.create(base, path, query);
    }
    Url.getSanitizedQuery = function (query) {
        return Object
            .keys(query)
            .map(function (key) { return [key, query[key]]
            .map(encodeURIComponent)
            .join("="); })
            .join("&");
    };
    Url.create = function (base, path, query) {
        return base
            + (path ? "/" + encodeURIComponent(path) : "")
            + (query ? "?" + Url.getSanitizedQuery(query) : "");
    };
    return Url;
}());
export { Url };
//# sourceMappingURL=url.js.map