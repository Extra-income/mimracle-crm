const path = require('path');
const fs = require('fs');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
// // 用于单独打包css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const viewFiles = fs.readdirSync('./views');

let htmlPlugins = [];

const test = (viewDir) => {
  let viewFiles = fs.readdirSync(viewDir);
  viewFiles.forEach((file) => {
    if (file.slice(-5) !== '.html') {
      if(fs.statSync(viewDir + '/' + file).isFile) {
        test(viewDir + '/' + file);
      } else {
        return;
      }
    }
    console.log(viewDir);
    let opts = {
      inject: 'body',
      filename: viewDir+ '/' + file,
      template: (viewDir + '/' +  file ),
      chunksSortMode: 'manual',
      chunks: [file],
      hash: true
    }
    htmlPlugins.push(new HtmlWebpackPlugin(opts));
  });
};
test('./views');

module.exports = {
  target: 'node',
  // in order to ignore all modules in node_modules folder
  // externals: [nodeExternals()],
  entry: [
    // path.resolve(__dirname, 'src') + '/server.ts',
    './bin/www'
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
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
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
    // new ExtractTextPlugin({
    //   filename: 'style.css',
    // }),
    // new HtmlWebpackPlugin({
      
    // }),
  ].concat(htmlPlugins),
};
