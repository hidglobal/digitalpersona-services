# Coding Guides

The library uses the TypeScript as a main language. It is transpiled to Javascript (`es5`, `es6` and `commonjs` platforms).

## Library size

The library may be used in mobile apps, so it is **critically important** to keep the library size as small as possible!

## ECMAScript standards and APIs

The library tries to follow the most modern ECMAScript standards, but support of `es5` platform put some restrictions.
The rules of thumb are:

* If there is a modern ECMAScript API which has `es5` shims available, prefer to follow the modern standard and let
the end user to provide a shim.
* If there is modern ECMAScript syntax which can be transpiled to `es5` without large overhead, use the newer syntax, 
  otherwise use the older equivalent.

### ES6 Async/await syntax

Despite the recommendations to use `async/await` pattern everywhere, we avoid it in the main library code and prefer
`promise().then().catch()` pattern instead. This allows us to reduce es5-transpiled code size, avoiding overhead of 
a quite large (~1.5Kb minified) `generator/awaiter` shim inserted by TypeScript.

This policy can be reviewed after support of `es5` platform is dropped.

It is still recommended to use the `async/await` pattern in unit tests, as code size is not critical here.

### ES6 Object Spread syntax

The ES6 object spread syntax adds an overhead to the es5-transpiled code, but it is negligible comparing to the manual
object merging, so it is ok to use it.
