const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      path: require.resolve('path-browserify'),
    };
    return config;
  },
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_ACCESS_KEY: JSON.stringify(process.env.REACT_APP_ACCESS_KEY),
      },
    }),
  ),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@socials': path.resolve(__dirname, 'src/assets/socials'),
    '@icons': path.resolve(__dirname, 'src/assets/icons'),
  }),
);
