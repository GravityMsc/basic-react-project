/* eslint-disable */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const extractLESS = new ExtractTextPlugin('css/[name]__[contenthash].css'); // extract style files to reduce the first load time

module.exports = {
    entry: {
        index: [
            './src/index.jsx',
        ],
        vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk'],
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name]__[chunkhash:8].js',
        chunkFilename: "js/[name]__[chunkhash:5]_chunk.js",
        publicPath: '',
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
            use: extractLESS.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
                publicPath: '../', // 默认生成路径为style/xxx，所以为了正确匹配到url()内image路径，需要到上级目录
            }),
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
    plugins: [
        new BundleAnalyzerPlugin(),
        new CopyWebpackPlugin([{
            from: './src/PWA',
            to: 'PWA'
        }, './src/service-worker.js',
        ]),
        extractLESS,
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'commonLazy',
            children: true,
            minChunks: 3,
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index_tpl.html',
            filename: 'index.html',
            favicon: './src/images/favicon.png',
            inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'source-map',
};
