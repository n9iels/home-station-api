const webpack = require('webpack')
const path = require('path')
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['./src/app/app.tsx'],
  devtool: dev ? 'source-map' : false,
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js']
  },
  output: {
    filename: 'app.js',
    path: path.resolve('wwwroot', 'js')
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /nl/
    )
  ]
}