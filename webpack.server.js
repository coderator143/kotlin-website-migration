const path = require("path");
const webpack = require("webpack");

module.exports = {
  // Tells Webpack this code will run in Node, not the browser
  target: "node",

  mode: "development",

  // Point this to your React SSR entry point
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
      // Fallback: If you prefer not to use the Plugin below, 
      // you can use asset/resource or null-loader here.
    ]
  },

  plugins: [
    // FIX: This prevents Webpack from crashing when it hits .scss/.css imports.
    // It replaces those imports with an empty object during the build.
    new webpack.NormalModuleReplacementPlugin(
      /\.(css|scss|sass|less)$/,
      path.resolve(__dirname, "frontend/empty-module.js")
    ),
    // Do the same for images/static assets if they cause "Parse failed" errors
    new webpack.NormalModuleReplacementPlugin(
      /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      path.resolve(__dirname, "frontend/empty-module.js")
    )
  ],

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