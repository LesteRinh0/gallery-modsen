const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  alias({
    '@components': 'src/components',
    '@constants': 'src/constants',
    '@pages': 'src/pages',
    '@utils': 'src/utils',
    '@assets': 'src/assets',
    '@socials': 'src/assets/socials',
    '@icons': 'src/assets/icons',
  })(config);
  return config;
};
