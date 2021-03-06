/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 采用react-scripts源码处理方式
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const packageJson = require(resolveApp('package.json'));

module.exports = {
  mode: 'production',
  entry: {
    index: [
      './src/index.jsx',
    ],
    vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk'],
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name]__[fullhash:8].js',
    chunkFilename: "js/[name]__[chunkhash:5]_chunk.js",
    publicPath: packageJson.homepage || '/', // 项目部署在次级目录下导致的资源文件路径错误
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../', // 默认生成路径为css/xxx，所以为了正确匹配到url()内image路径，需要到上级目录
        }
      },
        'css-loader',
        'postcss-loader',
      {
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
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/PWA/',
        to: 'PWA/'
      }, './src/service-worker.js',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]__[contenthash].css',
      chunkFilename: 'css/[name]__[contenthash]_chunk.css'
    }), // extract style files to reduce the first load time
    new HtmlWebpackPlugin({
      template: './src/index_tpl.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png',
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', 'tsx', 'ts']
  },
  devtool: 'source-map',
};
