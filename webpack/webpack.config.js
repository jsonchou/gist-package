// webpack.config.js
var webpack = require('webpack');
var path = require("path");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var pathScriptsPath = __dirname + "/scripts/_src";
var pathLibsPath = __dirname + "/libs";
var env = "dev";//dev real

var plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
    new CommonsChunkPlugin('core', 'core.js'),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }),
]

if (env === 'real') {
    var optPlugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
          minimize: true
      })
    ];
    plugins = plugins.concat(optPlugins);
}

var cfg = {
    cache: false,
    entry: {
        core: ['jquery', 'jquery.cookie'],
        index: [pathScriptsPath + "/index/index.js"],
        list: [pathScriptsPath + "/list/list.js"]
    },
    output: {
        path: path.join(__dirname, 'scripts'),  //打包输出的路径
        filename: '[name].js',
        publicPath: pathScriptsPath.replace('_src', '')
    },
    resolve: {
        modulesDirectories: [
           'node_modules',
           'bower_components',
           'libs'
        ],
        extensions: ['', '.webpack.js', '.json', '.js', '.css'],
        root: [path.resolve(__dirname + '/libs')],
        alias: {
            'jquery': 'jquery.min',
            'jquery.cookie': 'jquery.cookie'
        }
    },
    //devtool: 'source-map',//利于断点调试
    minimize: true,
    externals: [
        {
            'react': 'window.React',
            "lodash": "_"
        }
    ],
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: { limit: 8192 } } // inline base64 URLs for <=8k（8*1024=8192） images, direct URLs for the rest
        ]
    },
    amd: {
        jQuery: true
    },
    bail: true,
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
    plugins: plugins
};

module.exports = cfg;