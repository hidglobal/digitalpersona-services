export declare class Url {
    readonly href: string;
    constructor(base: string, path?: string | null, query?: object | null);
    private static getSanitizedQuery;
    static create(base: string, path?: string | null, query?: object | null): string;
}
