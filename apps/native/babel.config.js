module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  // worklets has to be last
  plugins.push('react-native-worklets/plugin');
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins,
  };
};
