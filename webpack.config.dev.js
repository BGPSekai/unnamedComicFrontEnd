var path = require('path');
var webpack = require('webpack');
var DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index'
  ],
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env'
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
    }]
  }
};
