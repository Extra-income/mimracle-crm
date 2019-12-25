const path = require('path');
const fs = require('fs');
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  entry: [
    // path.resolve(__dirname, 'src') + '/server.ts',
    './bin/www'
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader',
      //   }),
      // },
      // {
      //   test: /\.tsx?$/,
      //   use: ['ts-loader', 'eslint-loader'],
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      // },
    ],
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: ['.js', '.css' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development', // 设置mode
  plugins: []
};
