<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@digitalpersona/services](./services.md) &gt; [IAdminService](./services.iadminservice.md) &gt; [SetUserAccountControl](./services.iadminservice.setuseraccountcontrol.md)

## IAdminService.SetUserAccountControl() method

Modifies User Account Control bits for the specified user.

<b>Signature:</b>

```typescript
SetUserAccountControl(ticket: Ticket, user: User, control: UACFlags): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  ticket | <code>Ticket</code> | a ticket with a JSON Web Token of the user who would like to modify UAC bits. The owner of the token must have permissions to set UAC bits. |
|  user | <code>User</code> | the user whose UAC bits are to be modified |
|  control | <code>UACFlags</code> | Account Control bits needs to be set. NOTE: The control bits provided will override any settings previously set for this particular user so we would recommend to call GetUserInfo or GetUserAttributeto find out what bits were set before the operation. |

<b>Returns:</b>

`Promise<void>`
