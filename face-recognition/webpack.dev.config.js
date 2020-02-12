const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: require.resolve('react'), loader: 'expose-loader?React' },

            {test: /\.global.css$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader!postcss-loader'
            })},

            {test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]-[local]!postcss-loader'
            }), exclude: /\.global.css$/},
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=/aero1/assets/[hash].[ext]' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root:     __dirname,
            verbose:  true,
            dry:      false
        }),
        new HtmlPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src')
        ]
    },
    devServer: {
        port: 4200,
        historyApiFallback: {
            rewrites: [
                { from: /../, to: '/' }
            ]
        },
        stats: 'verbose',
        proxy: {
            '/api/*': {
                target: 'http://localhost:50238',
                rewrite: function(req) {
                    req.url = req.url.replace(/^\/api/, '');
                }
            },
            '/': {
                target: 'http://localhost:50238',
                bypass: function (req) {
                    if (req.url.indexOf('.css') !== -1) {
                        return 'http://localhost:4200/bundle.css';
                    }
                    if (req.url.indexOf('.js') !== -1) {
                        return 'http://localhost:4200/main.js';
                    }
                    return false;
                }
            }
        }
    }
};
