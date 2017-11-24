"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusLoader = ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize!stylus-loader' });
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || "development";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let config = [{
    name: 'js',
    entry: {
        app: './public/js/app.js',
        core: './public/js/core/core.js'
    },
    output: {
        path: __dirname  + "/public/build/",
        filename: 'build.[name].js',
        publicPath: './public/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", "css", "styl", "woff", "ttf", "otf", "jpg", "png", "gif"]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
}, {
    name: 'styles',
    entry: {
        styles: "./public/styl/build.styl",
    },
    output: {
        path: __dirname + '/public/build/',
        filename: '[name].min.css'
    },
    module: {
      rules: [
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
                            }
                        }
                    },
                    'stylus-loader'
                    ]
                }) 
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|otf|svg|jpg|jpeg|gif)$/, 
                loader: 'url-loader?limit=100000'
            }
        ]  
    },
    plugins: [
        new ExtractTextPlugin("[name].min.css"),
    ]    
}];


module.exports = config;