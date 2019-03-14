export class ServerStatus {
    public static readonly S_OK = { error_code: 0x00000000, description: "Success" }
    public static readonly E_FAIL = { error_code: 0x80004005, description: "Unexpected failure" }
}
