# babel-preset-react-native-web-quick

[![npm link](https://img.shields.io/npm/v/@kall/babel-preset-react-native-web-quick.svg)](https://www.npmjs.com/package/@kall/babel-preset-react-native-web-quick)

A babel preset that configures itself for both metro with react-native and webpack with react-native-web. Use this instead of `module:metro-react-native-babel-preset`.

## Usage

```
npm install --save-dev @kall/babel-preset-react-native-web-quick
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

## Changelog

- 1.2.0 add `babel-plugin-react-native-web` as dependency, oops
- 1.1.0 add `babel-plugin-module-resolver` as dependency
- 1.0.0 Initial Release
