var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-default-vars.less'), 'utf8'));

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.js'
  ],
  module: {
    loaders: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader",
          options: {
            plugins: [
              ['import', { libraryName: "antd", style: true }]
            ]
          }
        },
        {
          test: /\.less$/,
          use: [
            {loader: "style-loader"},
            {loader: "css-loader"},
            {loader: "less-loader",
              options: {
                modifyVars: themeVariables
              }
            }
          ]
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
        {
          test: /\.(jpe?g|png|gif|svg|jpg)$/i,
          loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          }
        ],
          exclude: /node_modules/,
          include: __dirname,
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  plugins: [HTMLWebpackPluginConfig]
}