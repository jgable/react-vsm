var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: [path.resolve(__dirname, 'js/app.js'), path.resolve(__dirname, 'js/app.less')],

    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    vendors: ['react/addons', 'react-router', 'react-bootstrap', 'lodash', 'velocity-animate']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    },
    // Extract css files
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    // Optionally extract less files
    // or any other compile-to-css language
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),
    new ExtractTextPlugin("[name].[hash].css")
  ]
};

module.exports = config;