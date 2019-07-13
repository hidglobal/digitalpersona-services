<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@digitalpersona/services](./services.md) &gt; [ServiceError](./services.serviceerror.md)

## ServiceError class

Maps Web Access service faults to the Javascript exception model

<b>Signature:</b>

```typescript
export declare class ServiceError extends Error 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(code, message)](./services.serviceerror.(constructor).md) |  | Constructs the object. |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [code](./services.serviceerror.code.md) |  | <code>number</code> | Numeric code of the error. In case of HTTP error the code will be an HTTP status code. In case of [service fault](./services.servicefault.md) the code will be an HRESULT server code. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [fromServiceFault(fault)](./services.serviceerror.fromservicefault.md) | <code>static</code> | Creates a service error object from a [service fault](./services.servicefault.md)<!-- -->. |
|  [isHttpError()](./services.serviceerror.ishttperror.md) |  | Allows to distinguish transport errors (HTTP) from [service faults](./services.servicefault.md)<!-- -->. |
