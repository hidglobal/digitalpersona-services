---
layout: default
title: Details
has_toc: false
parent: Use
nav_order: 1
---


# Details

The library consists of following major parts:

* Common classes
* Authentication Service client
* Policy Service client
* Claims Service client
* Enrollment Service client
* Secrets Service client

The library uses ES6 `promise` API for asynchronous calls. If it is used in older browsers, you have to provide
a "shim" adding the `promise` API to your target browser.

The library uses ES6 `fetch` API for HTTP connection. If it is used in older browsers, you have to provide a "shim"
adding the `fetch` API to your target browser.
