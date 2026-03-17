const path = require("path");
const webpack = require("webpack");

module.exports = {
  // Tells Webpack this code will run in Node, not the browser
  target: "node",

  mode: "development",

  entry: "./frontend/entry.server.jsx",

  output: {
    path: path.resolve(__dirname, "frontend/dist"),
    filename: "server.js",
    // Important for SSR: exports the bundle so render.js can require() it
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Ensures Babel handles React JSX and modern JS
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(scss|css|sass)$/,
        loader: "null-loader",
      },
      // ALSO ADD THIS FOR IMAGES/FONTS to prevent similar errors:
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "null-loader",
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },

  // Prevents bundling of node_modules which speeds up the build 
  // and avoids issues with native Node modules
  externals: {
    react: "react",
    "react-dom": "react-dom"
  }
};