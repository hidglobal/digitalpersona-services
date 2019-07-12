/**
 * Web Access service base class.
 */
export interface IService {
    /** Pings the service endpoint to detect connectivity status.
     * @returns `true` on success, `false` on failure. The promise is never rejected.
     */
    Ping(): Promise<boolean>;
}
