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

The library uses ES6 `fetch` API for HTTP conenction. If it is used in older browsers, you have to provide a "shim"
adding the `fetch` API to your target browser.
