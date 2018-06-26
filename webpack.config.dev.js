/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompileTimePlugin = require('./webpack/plugin/CompileTimePlugin');

module.exports = {
  entry: {
    index: [
      './src/index.jsx', // some entry files
    ],
    vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk', 'react-hot-loader'], // all of main libs in this project
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]__[chunkhash:8].js',
    chunkFilename: "[name]__[chunkhash:5]_chunk.js", // used by code splitting
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }],
    }, {
      test: /\.(png|jpe?g|gif)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          name: '[name].[hash:12].[ext]',
          outputPath: './images',
        }
      }],
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash:12].[ext]',
          outputPath: './fonts',
        }
      }],
    }],
  },
  devServer: {
    contentBase: './src',
    publicPath: '/',
    inline: true,
    hot: true,
    hotOnly: true,
    useLocalIp: true,
    host: '0.0.0.0',
    port: 8088,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    // proxy: [{
    //     context: [
    //         '/api',
    //     ],
    //     target: 'http(s)://host:port',
    //     changeOrigin: true,
    //     secure: false,
    // }], // severd by 'http-proxy-middleware', send API requests on the same domain
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'commonLazy',
      children: true,
      minChunks: 3,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index_tpl.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png',
      inject: true,
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CompileTimePlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
};
