var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const distPath = 'dist'
const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'))

module.exports = {
  entry: {
    'simpleApp': './src/simpleApp.tsx'
  },
  output: {
    path: path.resolve(__dirname, distPath),
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.(css|scss)$/i,
        use: [ mode === 'prod' ? 'style-loader' :
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|jpg|jpeg|git)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash5].[ext]',
              limit: 10000,
              outputPath: 'assets/images'
            }
          }
        ]
      },{
        test: /\.(ogg|mp3|wav|mpe)$/,
        use: [

          {
            loader: 'url-loader'
          }
        ]
      }, {
        test: /\.(eot|woff2?|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name].[hash5].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      }, {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: './images'
            }
          }
        ]
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, distPath),
    compress: true,
    port: 9001,
    hot: true
  }

}
