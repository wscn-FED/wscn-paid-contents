var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var inlineSvg = require('postcss-inline-svg');
var svgo = require('postcss-svgo');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.argv.indexOf('--production') !== -1;
var config = {
  entry: {
    home: ['./src/js/home.js', 'webpack/hot/only-dev-server'],
    detail: ['./src/js/detail.js', 'webpack/hot/only-dev-server'],
    devServerClient: 'webpack-dev-server/client?http://localhost:3000'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ws-[name].js',
    publicPath: "/static/"
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.js/,
        loader: 'babel',
        include: /src/,
        exclude: /node_modules/
      }
    ]
  },
  sassLoader: {
    sourceMap: true
  },
  postcss: [
    inlineSvg(),
    svgo(),
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['home'],
      filename: __dirname + '/src/template/home.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['detail'],
      filename: __dirname + '/src/template/detail.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

if (isProduction) {
  config.output.filename = 'ws-[name].min.js';
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = config;
