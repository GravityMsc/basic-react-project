/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: [
      './src/index.jsx', // some entry files
    ],
    vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk', 'react-hot-loader'], // all of main libs in this project
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name]__[hash:8].js',
    chunkFilename: "[name]__[chunkhash:5]_chunk.js", // used by code splitting
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
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
          outputPath: './images/',
        }
      }],
    }, {
      test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash:12].[ext]',
          outputPath: './fonts/',
        }
      }],
    }],
  },
  devServer: {
    contentBase: './src/',
    publicPath: '/',
    inline: true,
    hot: true,
    hotOnly: true,
    https: true,
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
      chunks: 'all',
      cacheGroups: {
        vendors: {
          priority: -10,
          name: 'vendors',
          test(module, chunks) {
            return chunks.some(chunk => chunk.name === 'vendors');
          },
        },
        index_libs: {
          priority: -20,
          name: 'index_libs',
          chunks(chunk) {
            return chunk.name === 'index';
          },
          test: /[\\/]node_modules[\\/]/,
        },
        async: {
          priority: -30,
          reuseExistingChunk: true,
          name: 'async',
          chunks: 'async',
          minChunks: 2,
          enforce: true
        },
        common: {
          priority: -40,
          reuseExistingChunk: true,
          name: 'common',
          minChunks: 3,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index_tpl.html',
      filename: 'index.html',
      favicon: './src/images/favicon.png',
      inject: true,
      hash: true,
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', 'tsx', 'ts']
  },
};
