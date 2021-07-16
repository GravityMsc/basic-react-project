const eslintrc = {
  extends: ['eslint-config-cetitife'],
  parserOptions: {
    babelOptions: {
      configFile: `${__dirname}/.babelrc.json`,
    },
  },
  rules: {
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link', 'NavLink'],
      specialLink: ['to'],
    }], // fix react-router component <Link to="/path"> error
  },
};
module.exports = eslintrc;
