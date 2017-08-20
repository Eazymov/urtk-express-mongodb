const webpack = require('webpack')
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    mainpage: './src/mainpage/main.js',
    login: './src/login/main.ts',
    admin: './src/admin/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].build.js'
  },
  devServer: {
    hot: true,
    port: 8000,
    publicPath: '/assets/',
    contentBase: 'dist/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.pug', '.sass'],
    alias: {
      '@': resolve('src'),
      'api': resolve('src/api'),
      'assets': resolve('src/assets'),
      'shared': resolve('src/shared'),
      'login': resolve('src/login'),
      'admin': resolve('src/admin'),
      'controllers': resolve('controllers'),
      'models': resolve('models'),
      'handlers': resolve('handlers'),
      'routes': resolve('routes')
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader"
      }, {
        test: /\.pug$/,
        loader: 'pug-html-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  /*  new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }), */
  ]
};
