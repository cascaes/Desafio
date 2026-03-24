module.exports = function babelConfig(api) {
  const isTest = api.env('test');
  api.cache.using(() => isTest);

  return {
    presets: ['babel-preset-expo'],
    plugins: isTest ? [] : ['react-native-reanimated/plugin'],
  };
};
