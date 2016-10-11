var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


new WebpackDevServer(webpack(config), {
    contentBase: './',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    stats: {
        colors: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    proxy: {
        '/api/**': {
            target: 'http://api.wallstcn.com/v2',
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true,
            logLevel: 'debug'
        }
    }
}).listen(3000, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
});
