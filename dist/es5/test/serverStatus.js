var ServerStatus = /** @class */ (function () {
    function ServerStatus() {
    }
    ServerStatus.S_OK = { error_code: 0x00000000, description: "Success" };
    ServerStatus.E_FAIL = { error_code: 0x80004005, description: "Unexpected failure" };
    return ServerStatus;
}());
export { ServerStatus };
//# sourceMappingURL=serverStatus.js.map