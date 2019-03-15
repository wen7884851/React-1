var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: 'localhost',
        compress: true,
        port: 8848
      },
      context: path.join(__dirname, 'src'),
      resolve: {
        modules: [
          path.join(__dirname, 'src'),
          'node_modules'
        ],
        alias: {
            '@store': path.join(__dirname, 'src/store'),
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
        },
        entry: {
          login:'./page/login/index.jsx',
            project:'./page/project/index.jsx',
            projectPointManager:'./page/ProjectPointManager/index.jsx',
            EditProjectPonit:'./page/EditProjectPonit/index.jsx',
          },
          output: {
            filename: '[name].js',
          },
          module: {
            rules: [
              {
                test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['react', 'es2015', 'stage-0', "mobx"],
                  plugins: ['transform-runtime']
                }
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.less$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[local]__[hash:base64:5]', 'less-loader']
              },
              {
                test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                  name: '/Resource/font/[name].[ext]'
                }
              },
            ]
          },
          plugins:[
            new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
            })
          ]
        };