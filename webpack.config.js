const path = require('path');

module.exports = {
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
  }
};