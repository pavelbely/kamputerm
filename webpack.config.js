var path = require("path");
module.exports = {
    entry: [
        'babel-polyfill',
        './client/src/js/kamputerm.js'
    ],
    output: {
        path: path.resolve(__dirname, 'lib/server/src/public/assets'),
        publicPath : 'http://localhost:8080/assets',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test:   /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'client/src/js/'),
            }
        ],
    }
};