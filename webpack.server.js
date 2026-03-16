const path = require("path");

module.exports = {
  target: "node",

  mode: "development",

  entry: "./frontend/entry.server.jsx",

  output: {
    path: path.resolve(__dirname, "frontend/dist"),
    filename: "server.js",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
};