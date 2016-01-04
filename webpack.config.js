var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: [path.resolve(__dirname, 'demo/js/app.js'), path.resolve(__dirname, 'demo/js/app.scss')],
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
    {test: /\.(css|scss})$/, loader: 'style-loader!css-loader'},
    // SCSS support
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    }),
    new ExtractTextPlugin("[name].[hash].css")
  ]
};

module.exports = config;
