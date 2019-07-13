---
layout: default
title: Overview
nav_order: 1
---
##### [DigitalPersona Access Management API ](https://hidglobal.github.io/digitalpersona-access-management-api/)/ Enrollment API / Overview  
![](docs/assets/HID-DPAM-svcs.png)  

# JavaScript Web Service Clients for DigitalPersona Web Access Management

{% include dpam-intro.md %}

As a part of DPAM this Typescript/Javascript library provides client for 
following DPAM services:

* Authentication Service client (DPWebAuth)
* Policy Service client (DPWebPolicies)
* Claims Service client (DPWebClaims)
* Enrollment Service client (DPWebEnroll)
* Secrets Service client (DPWebSecrets)

## Requirements

{% include reqs/platforms.md %}

{% include reqs/languages.md %}

### Browser support

{% include shims/promise.md %}

{% include shims/fetch.md %}

### Node JS support

{% include shims/node-base64.md %}

## Additional documentation:

* [Tutorial](./tutorial.md)
* [How-to](./how-to.md)
* [Reference](./reference.md)
