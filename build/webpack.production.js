const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 2
            }
          },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },

          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,

      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new TerserPlugin(),
    new ResourceHintWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin()
  ],

  optimization: {
    runtimeChunk: true,
    minimize: true,
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: 1,
          name (module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `pkg.${packageName.replace('@', '')}`
          }
        }
      }
    }
  }
})
