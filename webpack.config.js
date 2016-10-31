const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

var env = {
  dev:  (NODE_ENV == 'development'),
  prod: (NODE_ENV == 'production')
};

module.exports = {

  entry: env.dev ? [
    'webpack-hot-middleware/client',
    './client'
  ] : './client',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  watch: env.dev,
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: env.dev ? 'cheap-inline-module-source-map' : null,

  plugins: env.dev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ env: env })
  ] : [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ],

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      // JavaScript
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'client'),
        loader: 'babel'
      },
      // CSS
      {
        test: /\.css$/,
        // exclude: /\/node_modules\//,
        loader: 'style-loader!css-loader'
      },
      // Stylus
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'public'),
        loader: 'style-loader!css-loader!stylus-loader'
      },
      // Images and Fonts
      {
        test   : /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ]
  }

};