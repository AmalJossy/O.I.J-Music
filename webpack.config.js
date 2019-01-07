const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var baseConfig = {
  entry: './app/src/app.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  optimization: {
    minimizer:[]
  },
};
if (process.env.NODE_ENV === 'production') {
  baseConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
  baseConfig.optimization.minimizer.push(new UglifyJsPlugin());
  console.log("Using production plugins");
}
module.exports = baseConfig;