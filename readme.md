# babel-preset-react-native-web-quick

[![npm link](https://img.shields.io/npm/v/@kall/babel-preset-react-native-web-quick.svg)](https://www.npmjs.com/package/@kall/babel-preset-react-native-web-quick)

A babel preset that configures itself for both metro with react-native and webpack with react-native-web. Use this instead of `module:metro-react-native-babel-preset`.

## Usage

Install with npm. core-js@3 is a peer dependency and you might need to install it seperately.

```
npm install --save-dev @kall/babel-preset-react-native-web-quick
npm install --save-dev core-js@3
```

Add this `babel.config.js` to your project:

```js
module.exports = {
  presets: ["@kall/babel-preset-react-native-web-quick"]
};
```

If you want to provide your own preset env config (in `babel.config.js` or `babel-loader` config, etc), you can exclude `@babel/preset-env` with the option `noPresetEnv`.

```js
module.exports = {
  presets: [
    ["@kall/babel-preset-react-native-web-quick", { noPresetEnv: true }]
  ]
};
```

## Behaviour

When bundling with metro, it simply includes `module:metro-react-native-babel-preset` so it shouldn't mess with your normal react native build.

When bundling with webpack/babel-loader, it includes the presets for typescript and flow, the react-native-web plugin, and the plugins from `module:metro-react-native-babel-preset` that aren't better handled by `@babel/preset-env`: react/jsx specific stuff and proposal features. It also includes `@babel/preset-env` set up to automatically pick up `.browserslistrc` or `browserlist` key in `package.json` and include appropriate polyfills.

When running in any other environment, it falls back to the same config as for webpack.

## Using with webpack

With this preset, you can bundle a basic react native app for the web with very little or technically no webpack config.

You need to install at least `webpack`, `babel-loader` and probably `babel-cli`.

A minimal `webpack.config.js` would be:

```js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts|mjs)$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [
      ".web.js",
      ".js",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".web.mjs",
      ".mjs"
    ]
  }
};
```

And technically no config file with this command (doesn't work great though)

```
npx webpack --module-bind js=babel-loader
```

Don't forget to add a `.browserslistrc` to your root directory or your bundle will be huge. For example:

```
>0.5%
not ie 11
not samsung < 8
```

## Changelog

- 1.3.1 actually add it as a dependency, should have started on 0.x
- 1.3.0 make core-js a peer dependecy
- 1.2.0 add `babel-plugin-react-native-web` as dependency, oops
- 1.1.0 add `babel-plugin-module-resolver` as dependency
- 1.0.0 Initial Release
