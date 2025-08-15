const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const path = require('path'); // Import the path module

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
        REACT_APP_API_KEY: JSON.stringify(process.env.REACT_APP_API_KEY),
      },
    }),
  ),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@socials': path.resolve(__dirname, 'src/assets/socials'),
    '@icons': path.resolve(__dirname, 'src/assets/icons'),
  }),
);
