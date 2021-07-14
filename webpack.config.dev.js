/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      './src/index.jsx', // some entry files
    ],
    vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk'], // all of main libs in this project
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name]__[fullhash:8].js',
    chunkFilename: "[name]__[chunkhash:5]_chunk.js", // used by code splitting
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }],
    }, {
      test: /\.(png|jpe?g|gif)(\?.+)?$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024 // 10kb
        }
      },
      generator: {
        filename: './images/[name].[hash][ext]'
      }
    }, {
      test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
      type: 'asset/resource',
      generator: {
        filename: './fonts/[name].[hash][ext]'
      }
    }],
  },
  devServer: {
    contentBase: './src/',
    publicPath: '/',
    inline: true,
    hot: true,
    // https: true,
    useLocalIp: true,
    host: '0.0.0.0',
    port: 8088,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    // proxy: [{
    //     context: [
    //         '/api/',
    //     ],
    //     target: 'http(s)://host:port/',
    //     changeOrigin: true,
    //     secure: false,
    // }], // severd by 'http-proxy-middleware', send API requests on the same domain
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index_tpl.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png',
      inject: true,
      hash: true,
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js', 'tsx', 'ts']
  },
};
