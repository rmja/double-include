This example app shows an issue with aurelia-webpack-plugin including two versions of the same package.

```sh
npm i
npm run build
```

The output of the build command is:
```sh
> build
> webpack --mode development

Webpack Bundle Analyzer saved report to C:\Source\double-include\dist\report.html
Webpack Bundle Analyzer saved stats file to C:\Source\double-include\dist\stats.json
asset app.js 876 KiB [compared for emit] (name: app)
runtime modules 1.4 KiB 6 modules
modules by path ./node_modules/ 770 KiB
  modules by path ./node_modules/@ucast/ 21.8 KiB 8 modules
  modules by path ./node_modules/@casl/ 18.2 KiB
    ./node_modules/@casl/ability/dist/es6m/index.mjs 8.23 KiB [built] [code generated]
    ./node_modules/@casl/aurelia/dist/umd/index.js 1.73 KiB [built] [code generated]
    ./node_modules/@casl/ability/dist/es6c/index.js 8.27 KiB [built] [code generated]
  modules by path ./node_modules/aurelia-webpack-plugin/runtime/*.js 2.17 KiB
    ./node_modules/aurelia-webpack-plugin/runtime/empty-entry.js 595 bytes [built] [code generated]
    ./node_modules/aurelia-webpack-plugin/runtime/pal-loader-entry.js 1.59 KiB [built] [code generated]
  + 23 modules
./src/main.ts 309 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 1909 ms
```

This clearly shows that both the `es6m` and `es6c` version of `@casl/ability` is included.
This double incluses gives a problem with the DI registration using the `PureAbility` key in [main.ts](src/main.ts),
as the `PureAbility` version in `es6m` and `es6c` are different, causing the DI resolution in the value converter in `@casl/aurelia` resolving to a different value than registered.