// webpack.config.js
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    cache: true,
    entry: "./scripts/_src/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.json', '.js'],
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'lib',
            '_src'
        ],
        alias: {}
    },
    devtool: 'source-map',
    minimize: true,
    externals: [
        {
            'react': 'window.React',
            'react-bootstrap': 'window.ReactBootstrap',
            'jquery': 'window.jQuery'
        }
    ],
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: { limit: 8192 } } // inline base64 URLs for <=8k（8*1024=8192） images, direct URLs for the rest
        ]
    }
};