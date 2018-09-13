const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWbpackTemplate = require('html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.appSrc,
  },

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    path: path.appDist,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        include: path.appSrc,
        loader: 'babel-loader',
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.appPath,
      verbose: true,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWbpackTemplate,

      title: 'HtmlWebpackPlugin',
      appMountId: 'app',
    }),
  ],

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    },
  },
};
