"use strict";

const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
const environment = process.env.NODE_ENV || 'development';
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    name: 'js',
    entry: {
        app: './public/js/index.js'
    },
    output: {
        path: __dirname  + "/public/build",
        filename: 'build.[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "../../[name].html"
                    }
                  },{
                    loader: 'pug-html-loader',
                    options: {
                      exports: false,
                      pretty: false
                    }
                  }

                ],
            },
            {
                use: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/
            },
            {
                 test: /\.styl$/,
                 use: [
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
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
              },
              {
                  test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg)$/,
                  loader: 'file-loader'
              }
        ]
    },
    performance: { hints: false },
    optimization: {},
    mode: environment,
    plugins: [
        new MiniCssExtractPlugin({
          filename: "build.[name].css"
        })
    ]
};

if (environment === 'production') {
  config.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false
        },
      }
    })
  ];
}


module.exports = config;
