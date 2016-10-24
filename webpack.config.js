var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './app/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/, 
  //       exclude: /node_modules/, 
  //       loaders: ['react-hot', 'babel-loader']
  //       // query:
  //       // {
  //       //   presets:['react']
  //       // }
  //     }
  //   ]
  // }
  module: {
    loaders: [{
      test: /\.js$/,
        exclude: /node_modules/, 
      loaders: ['react-hot', 'babel-loader']
    }]
  }
};