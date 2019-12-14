const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
 environment = process.env.NODE_ENV || 'development',
 TerserPlugin = require('terser-webpack-plugin');

const config = {
    name: 'js',
    entry: {
        app: './public/js/index.js'
    },
    output: {
        path: __dirname  + "/public/build",
        filename: 'build.[name].js',
        publicPath: environment == 'development' ? '/' : '/public/build/'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: environment == 'development' ? '[name].html' : '../../[name].html'
                    }
                  },{
                    loader: 'pug-html-loader',
                    options: {
                      exports: false,
                      pretty: false
                    }
                  }

                ]
            },
            {
                use: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/
            },
            {
                use: 'eslint-loader',
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
                            plugins: () => [
                              require('postcss-preset-env')(),
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
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false
        }
      }
    })
  ];
}


module.exports = config;
