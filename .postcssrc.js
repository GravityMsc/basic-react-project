/* eslint-disable */
const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        browsers: ['last 2 versions']
      }
    })
  ],
};
