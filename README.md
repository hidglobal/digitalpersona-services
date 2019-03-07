# JavaScript Client for DigitalPersona Web Access Management

This library provides a client for the DigitalPersona Web Access Management API.

## Details

DigitalPersona Web Access Management (DP WAM) is a set of web services for different access management tasks,
like user enrollment, identification, authentication, identity claims issuance, access policy management
etc.

## Development

Recommended development environment -- Microsoft VS Code, with folowing extensions:

* [TypeScript Linter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Building the library

To get started, install dependencies first:

```
cd ./access-management
npm install
```

To build the library:

* from terminal: run `npm run-script build`, 
* from VS Code: press `Ctrl+Shift+B`

The build output (JavaScript files) will be put into following locations, according to a target:
* CommonJS (for NodeJS): `./dist/commonjs/`
* ES6 (for modern browsers): `./dist/es6/`
* ES5 (UMD, for older browsers): `./dist/es5/`

To build API documentation:
* from terminal: run `npm run-script docs`

The build output (HTML and CSS files) will be put into a `./docs/` folder.

## Running Examples

### Examples/Browser

This example runs a simple NodeJS web site demonstrating scenarios of usage DP WAM from a browser.

To run from terminal:

``` bash
cd ./examples/browser
npm i
npm start
```

Browse to http://localhost:3000/.

To debug from VS Code:

* open `Debug` panel (`Ctrl+Shift+D`)
* in the list of debug configurations select `Launch Server (access-management)`
* click `Start Debugging` to launch the example server
* in the list of debug configurations select `Launch Chrome (access-management)`
* click `Start Debugging` to launch the Chrome browser in debug mode


## API Documentation

Build documentation first as described in [Building the library], then open documentation [here](./docs/index.html)
