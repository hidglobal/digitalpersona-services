export class HttpStatus
{
    // success
    public static readonly Ok           =  { status: 200, statusText: "Ok" };
    public static readonly Created      =  { status: 201, statusText: "Created" };
    public static readonly NoContent    =  { status: 204, statusText: "No Content" };
    // redirection
    public static readonly NotModified  =  { status: 304, statusText: "Not Modified" };
    // client error
    public static readonly BadRequest   =  { status: 400, statusText: "Bad Request" };
    public static readonly Unauthorized =  { status: 401, statusText: "Unauthorized" };
    public static readonly Forbidden    =  { status: 403, statusText: "Forbidden" };
    public static readonly NotFound     =  { status: 404, statusText: "Not Found" };
    // server error
    public static readonly InternalError=  { status: 500, statusText: "Internal Server Error" };
}
