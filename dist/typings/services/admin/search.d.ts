export declare enum SearchScope {
    Base = 0,
    OneLevel = 1,
    Subtree = 2
}
export interface SearchQuery {
    /** A scope of the search. */
    scope: SearchScope;
    /** A search filter.
     * Check https://msdn.microsoft.com/en-us/library/aa746475(v=vs.85).aspx for LDAP filter syntax.
     */
    filter: string;
    /** A distinguished name of the entry at which to start the search.
     * This is an optional parameter and if it set to `null` we will perform the search from
     * a default base (an AD root for the DPCA AD Server, LDS partition root for the DPCA LDS Server)
     */
    baseDN?: string;
    /** A list of strings with object attributes requested.
     * NOTE: the bigger list of attributes requested, the slower the search, and the larger amount
     * of data to be transferred over networks.
     */
    attributes: string[];
    /** A name of the attribute to perform result sorting.
     * For example, `"cn"` will sort users search results based on the “cn” (Common Name) attribute.
     * NOTE: Sorting can be performed only on indexed attributes. This is optional parameter and it
     * can be set to null if sorting is not required.
     */
    sort?: string;
}
