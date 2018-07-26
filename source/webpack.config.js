"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const environment = process.env.NODE_ENV || 'development';

const config = {
    name: 'js',
    entry: {
        app: './public/js/index.js'
    },
    output: {
        path: __dirname  + "/public/build",
        filename: 'build.[name].js',
        publicPath: './build'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/
            },
            {
                use: [ 'style-loader', 'css-loader' ],
                test: /\.css?$/,
                exclude: /node_modules/
            },
            {
                test: /\.pug?$/,
                use: [
                  "file-loader?name=../../[name].html",
                  "extract-loader",
                  "html-loader",
                  "pug-html-loader"
                ],
                exclude: /node_modules/
            },
            {
                 test: /\.styl$/, 
                 loader: ExtractTextPlugin.extract({ fallback: 'style-loader', 
                      use: [
                      'css-loader?minimize!',
                      {
                          loader: 'postcss-loader',
                          options: {
                              plugins: function () {
                                  return [autoprefixer()]
                              },
                              sourceMap: 'inline'
                          }
                      },
                      'stylus-loader'
                      ]
                  }) 
              },
              {
                  test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg)$/, 
                  loader: 'file-loader?limit=100000'
              }
        ]
    },
    performance: { hints: false },
    optimization: {},
    mode: environment,
    plugins: [
        new ExtractTextPlugin("build.[name].css")    ]
};

if (environment === 'production') {
    config.optimization.minimize = true;
    babelSettings.plugins.push("transform-react-inline-elements");
    babelSettings.plugins.push("transform-react-constant-elements");
}


module.exports = config;