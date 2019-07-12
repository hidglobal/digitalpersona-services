---
layout: default
title: Overview
nav_order: 1
---
##### [DigitalPersona Access Management API ](https://hidglobal.github.io/digitalpersona-access-management-api/)/ Enrollment API / Overview  
![](docs/assets/HID-DPAM-svcs.png)  

# JavaScript Client for DigitalPersona Web Access Management

DigitalPersona Web Access Management (DP WAM) is a set of web services 
for different access management tasks, like user enrollment, identification,
authentication, identity claims issuance, access policy management etc.

The library consists of following major parts:

* Common classes
* Authentication Service client
* Policy Service client
* Claims Service client
* Enrollment Service client
* Secrets Service client

## Requirements

Major browsers (Chrome, Firefox, Edge, IE11) and Node JS are supported.

The library uses TypeScript as its main language.
It is also transpiled to Javascript (ES5 and ES6 platforms are supported) 
for browsers and distributed both in unbundled and bundled (UMD) form.

### Browsers

{% include shims/promise.md %}
{% include shims/fetch.md %}

### Node JS

{% include shims/node-base64.md %}

## Additional documentation:

* [Tutorial](./tutorial.md)
* [How-to](./how-to.md)
* [Reference](./reference.md)
