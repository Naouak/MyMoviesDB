let webpack = require('webpack');
let path = require('path');

// compile js assets into a single bundle file 
module.exports.webpack = {
  options: {
    devtool: 'eval',
    entry: {
      bundle: "./assets/js/bundle"
    },
    output: {
      path: '.tmp/public/js',
      filename: '[name].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'] },
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
  },
  
  // docs: https://webpack.github.io/docs/node.js-api.html#compiler 
  watchOptions: {
    aggregateTimeout: 300
  }
};