const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, 'client/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  devServer: {
    host: 'localhost',
    port: '9999',
    hot: true,
    proxy: {
      '/api/*': 'http://[::1]:1337',
      '/auth/*': 'http://[::1]:1337'
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true
  },
  entry: ['react-hot-loader/patch', path.join(__dirname, 'client/src/index.jsx')],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }],
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },{
      test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 50000,
          mimetype: 'application/font-[ext]',
          name: './webfonts/[name].[ext]', // Output below ./fonts
          publicPath: '../', // Take the directory into account
        },
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  mode: dev ? 'development' : 'production',
  plugins: dev ? [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    HTMLWebpackPluginConfig,
    DefinePluginConfig,
  ],

};