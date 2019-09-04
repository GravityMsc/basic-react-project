const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }],
  });

  return config;
};