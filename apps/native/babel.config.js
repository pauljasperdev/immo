module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  // Reanimated plugin must be last (includes worklet support in v4+)
  plugins.push('react-native-reanimated/plugin');
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins,
  };
};
