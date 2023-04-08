const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    devServer: {
      port: 9000,
    },
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //added plugins for service worker and manifest
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new MiniCssExtractPlugin(),
      new GenerateSW({
        swDest: './src-sw.js'
      }),
      new WebpackPwaManifest({
        // created manifest.json
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#000000',
        start_url: '.',
        publicPath: './',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        fingerprints: false,
        includeDirectory: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
        ]
      }),
    ],

    module: {
      // added css and  babel loaders
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
