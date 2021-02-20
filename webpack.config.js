const path = require('path')
// require('babel-polyfill')

module.exports = {
  // entry: ['babel-polyfill', './blogproject/frontend/src/App.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            '@babel/transform-runtime'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname + '/blogproject/frontend/src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  }
}