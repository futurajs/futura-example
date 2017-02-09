'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


// Paths

const paths = {
  root: (...segments) => path.resolve(path.join(__dirname, ...segments)),
  src: (...segments) => paths.root('src', ...segments),
  config: (...segments) => paths.root('config', ...segments),
  npm: (...segments) => paths.root('node_modules', ...segments),
  build: (...segments) => paths.root('_build', ...segments)
};

// Config

module.exports = (options) => {
  const ENV = options.production ? 'production' : 'development';

  return {
    context: paths.root(),
    entry: paths.src('index.ts'),
    output: {
      path: paths.build(ENV),
      filename: 'scripts/index.[hash].js',
      publicPath: '/'
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'tslint-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.json$/,
          include: [ paths.config() ],
          loader: 'file-loader',
          query: {
            name: 'config/[name].[ext]'
          }
        }
      ]
    },

    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
      alias: {
        app: paths.src()
      }
    },

    plugins: plugins(ENV),

    devtool: ENV === 'production' ? 'nosources-source-map' : 'source-map',
    devServer: devServer(ENV)
  };
};

// Plugins

const plugins = env => {
  const common = [
    new CleanWebpackPlugin([ paths.build(env) ], {
      verbose: true,
      root: paths.root()
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.src('index.html'),
      favicon: paths.src('favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ];

  if (env === 'production') {
    return common.concat([
      new webpack.optimize.UglifyJsPlugin({comments: false}),
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'zopfli',
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]);
  } else {
    return common;
  }
};

// Dev server

const devServer = env => {
  const config = {
    contentBase: paths.build(env),
    historyApiFallback: true,
    port: 8081,

    compress: true,
    inline: true,
    stats: 'errors-only'
  };

  return env !== 'development' ? undefined : config;
};
