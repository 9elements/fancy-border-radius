const path = require('path')

module.exports = [{
  name: 'normal',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    inline: true
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    publicPath: "http://localhost:8080/dist/",
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  }
}, {
  name: 'full-control',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    inline: true
  },
  entry: {
    app: './src/index8v.js'
  },
  output: {
    publicPath: "http://localhost:8080/dist/",
    filename: 'main8v.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  }
}
];