const webpackNoPresetEnv = {
  presets: ["@babel/preset-typescript", "@babel/preset-flow"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-catch-binding",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-react-display-name",
    "@babel/plugin-transform-react-jsx-source",
    "@babel/plugin-transform-react-jsx",
    "react-native-web"
  ]
};

const webpack = {
  presets: [
    ...webpackNoPresetEnv.presets,
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        modules: "cjs",
        corejs: 3
      }
    ]
  ],
  plugins: webpackNoPresetEnv.plugins
};

const metro = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: []
};

module.exports = ({ caller }, { noPresetEnv = false }) => {
  // is either "metro" or "babel-loader"
  const runningIn = caller(({ name }) => name);
  return runningIn === "metro"
    ? metro
    : noPresetEnv
    ? webpackNoPresetEnv
    : webpack;
};
