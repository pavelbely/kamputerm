var myArgs = process.argv.slice(2);
var isHot = myArgs.indexOf('--hot') !== -1;
console.log('is hot: ' + isHot);
var additionalPlugins = isHot ? ['react-hmre'] : [];
var path = require("path");
module.exports = {
    entry: [
        'babel-polyfill',
        './client/src/js/kamputerm.js'
    ],
    output: {
        path: path.resolve(__dirname, 'lib/public/assets'),
        publicPath: 'http://localhost:8080/assets',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'client/src/js/'),
                query: {
                    'plugins': ['transform-runtime'],
                    'presets': ['es2015', 'stage-0', 'react'].concat(additionalPlugins)
                }
            }
        ],
    }
};