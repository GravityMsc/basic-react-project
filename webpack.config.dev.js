/* eslint-disable */
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch', // activate HMR for React
            'webpack-dev-server/client?http://0.0.0.0:8088', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            './src/index.jsx', // some entry files
        ],
        vendors: ['react', 'prop-types', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk', 'react-hot-loader'], // all of main libs in this project
    },
    output: {
        path: __dirname + '/dist/',
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
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        }, {
            test: /\.(png|jpe?g|gif)(\?.+)?$/,
            loader: 'url-loader?name=images/[name].[hash:12].[ext]&limit=10000',
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: 'file-loader?name=fonts/[name].[hash:12].[ext]',
        }],
    },
    devServer: {
        contentBase: './src/',
        publicPath: '/',
        inline: true,
        hot: true,
        host: '0.0.0.0',
        port: 8088,
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
            filename: 'common.js',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 3,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlwebpackPlugin({
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
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'source-map',
};
