const webpackNoPresetEnv = {
  presets: [require("@babel/preset-typescript"), require("@babel/preset-flow")],
  plugins: [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-nullish-coalescing-operator"),
    require("@babel/plugin-proposal-object-rest-spread"),
    require("@babel/plugin-proposal-optional-catch-binding"),
    require("@babel/plugin-proposal-optional-chaining"),
    require("@babel/plugin-transform-react-display-name"),
    require("@babel/plugin-transform-react-jsx-source"),
    require("@babel/plugin-transform-react-jsx"),
    require("babel-plugin-react-native-web")
  ]
};

const webpack = {
  presets: [
    ...webpackNoPresetEnv.presets,
    [
      require("@babel/preset-env"),
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
  presets: [require("metro-react-native-babel-preset")],
  plugins: []
};

module.exports = ({ caller }, { noPresetEnv = false }) => {
  // is either "metro" or "@babel-loader"
  const runningIn = caller(({ name }) => name);
  return runningIn === "metro"
    ? metro
    : noPresetEnv
    ? webpackNoPresetEnv
    : webpack;
};
