const path = require('path');

module.exports = {
  entry: './server/client/src/app.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'server/client/dist'),
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