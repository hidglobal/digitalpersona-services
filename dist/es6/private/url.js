export class Url {
    constructor(base, path, query) {
        this.href = Url.create(base, path, query);
    }
    static getSanitizedQuery(query) {
        return Object
            .keys(query)
            .map(key => [key, query[key]]
            .map(encodeURIComponent)
            .join("="))
            .join("&");
    }
    static create(base, path, query) {
        return base
            + (path ? `/${encodeURIComponent(path)}` : "")
            + (query ? `?${Url.getSanitizedQuery(query)}` : "");
    }
}
//# sourceMappingURL=url.js.map