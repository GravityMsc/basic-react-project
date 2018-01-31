/* eslint-disable */
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin('style/[name]__[contenthash].css'); // extract style files to reduce the first load time
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: [
            './src/index.jsx',
        ],
        vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk'],
    },
    output: {
        path: __dirname + '/dist/',
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
            }),
        }, {
            test: /\.(png|jpe?g|gif)(\?.+)?$/,
            loader: 'url-loader?name=images/[name].[hash:12].[ext]&limit=10000',
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash:12].[ext]',
        }],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/PWA',
            to: 'PWA',
            ignore: ['service-worker.js']
        }, 'src/service-worker.js',
        ]),
        extractLESS,
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/common.js',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 3,
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlwebpackPlugin({
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
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
            },
            sourceMap: true
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'source-map',
};
