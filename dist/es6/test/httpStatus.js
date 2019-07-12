export class HttpStatus {
}
// success
HttpStatus.Ok = { status: 200, statusText: "Ok" };
HttpStatus.Created = { status: 201, statusText: "Created" };
HttpStatus.NoContent = { status: 204, statusText: "No Content" };
// redirection
HttpStatus.NotModified = { status: 304, statusText: "Not Modified" };
// client error
HttpStatus.BadRequest = { status: 400, statusText: "Bad Request" };
HttpStatus.Unauthorized = { status: 401, statusText: "Unauthorized" };
HttpStatus.Forbidden = { status: 403, statusText: "Forbidden" };
HttpStatus.NotFound = { status: 404, statusText: "Not Found" };
// server error
HttpStatus.InternalError = { status: 500, statusText: "Internal Server Error" };
//# sourceMappingURL=httpStatus.js.map