"use strict";

const webpack = require('webpack');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
const environment = process.env.NODE_ENV || 'development';

const config = {
    name: 'js',
    entry: {
        app: './public/js/index.js'
    },
    output: {
        path: __dirname  + "/public/build",
        filename: 'build.[name].js',
        publicPath: './public'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/
            },
            {
                test: /\.pug?$/,
                use: [
                  "file-loader?name=../../[name].html",
                  "pug-html-loader"
                ],
                exclude: /node_modules/
            },
            {
                 test: /\.styl$/, 
                 loader: ExtractTextPlugin.extract({ 
                      fallback: 'style-loader',
                      use: [
                        {
                          loader: 'css-loader',
                          query: {
                            minimize: true,
                            sourceMap: false
                          }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                  require('postcss-cssnext')(),
                                  require('cssnano')()
                                ]
                            }
                        },
                        'stylus-loader'
                      ]
                  }) 
              },
              {
                  test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg)$/, 
                  options: {
                    emitFile: false
                  },
                  loader: 'file-loader'
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