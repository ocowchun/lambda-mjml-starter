module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: './lib',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    noParse: [/validate\.js/,/aws\.js/],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
}
