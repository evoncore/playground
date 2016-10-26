var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      // JavaScript
      {
        test: /\.js$/,
        loaders: ['babel'],
      },
      // React
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'public'),
          path.join(__dirname, 'client'),
        ]
      },
      // CSS
      {
        test: /\.css$/,
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
