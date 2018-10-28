const path = require('path');
const PugPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
    'app': './src/app.js',
    'styles': './src/styles.scss'
  },
  output: {
      path: path.resolve(__dirname, './dist/'),
      filename: './js/[name].js',
  },
  mode: 'none',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
          use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]'
          },
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [ 'html-loader?attrs=false', 'pug-html-loader' ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [ 'file-loader?name=./images/[name].[ext]' ]
      }
    ]
  },
  plugins: [
    new PugPlugin({
      filename: './index.html',
      template: './src/index.pug',
      inject: false
    }),
    new HtmlWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCSSExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
