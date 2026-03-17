const path = require("path");
const webpack = require("webpack");
const ExtractCssPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const CssoWebpackPlugin = require("csso-webpack-plugin").default;

module.exports = (params = {}) => {
  const isProduction = process.env.NODE_ENV === "production";
  const isDevelopment = !isProduction;
  const env = isProduction ? "production" : "development";
  const isDevServer = process.env.WEBPACK_SERVE === "true";
  const sourcemaps = params.sourcemaps || isDevelopment;

  const siteHost = process.env.BACKEND_HOST || "localhost:8080";
  const webDemoURL =
    params["webdemo-url"] ||
    "http://kotlin-web-demo-cloud.passive.aws.intellij.net";
  const indexName = params["index-name"] || "dev_KOTLINLANG";

  return {
    mode: env,
    entry: {
      client: "./frontend/entry.client.jsx",
      common: "./static/js/page/common.js",
      "styles-v2": "./static/css/styles-v2.scss",
    },

    output: {
      path: path.join(__dirname, "_assets"),
      publicPath: "/_assets/",
      filename: "[name].js",
      clean: !isDevServer,
    },

    devtool: sourcemaps ? "source-map" : false,
    bail: !isDevServer,

    resolve: {
      extensions: [".js", ".jsx", ".scss"],
      alias: {
        react: "react",
        "react-dom": "react-dom",
      },
    },

    module: {
      rules: [
        // JS & JSX
        {
          test: /\.(js|jsx)$/,
          include: [
            path.resolve(__dirname, "static/js"),
            path.resolve(__dirname, "frontend"),
          ],
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },

        // Local SCSS
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            ExtractCssPlugin.loader,
            {
              loader: "css-loader",
              options: { importLoaders: 2 },
            },
            "resolve-url-loader",
            {
              loader: "postcss-loader",
              options: { sourceMap: true },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: { quietDeps: true, math: "always-legacy" },
              },
            },
          ],
        },

        // CSS from node_modules
        {
          test: /\.css$/i,
          include: /node_modules/,
          use: [ExtractCssPlugin.loader, "css-loader"],
        },

        // Nunjucks / Mustache
        { test: /\.twig$/, loader: "nunjucks-loader" },
        { test: /\.mustache$/, loader: "mustache-loader" },

        // SVG
        {
          test: /\.svg$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                encoding: "utf8",
                esModule: false,
                generator: (content, mimetype, encoding) =>
                  svgToMiniDataURI(content.toString(encoding)),
              },
            },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  {
                    name: "preset-default",
                    params: { overrides: { convertPathData: false } },
                  },
                  "removeScriptElement",
                ],
              },
            },
          ],
        },

        // Images
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10000,
            name: "[path][name].[ext]",
          },
        },

        // Fonts
        {
          test: /\.(woff2?|ttf)$/,
          loader: "file-loader",
          options: { name: "[path][name].[ext]" },
        },
      ],
    },

    optimization: {
      runtimeChunk: { name: "shared" },
    },

    plugins: [
      new ExtractCssPlugin({ filename: "[name].css" }),
      isProduction && new CssoWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery",
      }),
      new webpack.DefinePlugin({
        webDemoURL: JSON.stringify(webDemoURL),
        indexName: JSON.stringify(indexName),
        "process.env.NODE_ENV": JSON.stringify(env),
      }),
    ].filter(Boolean),

    devServer: {
      host: "0.0.0.0",
      port: 9000,
      hot: true,
      allowedHosts: "all",
      devMiddleware: { publicPath: "/_assets/" },
      proxy: [
        {
          context: (pathname) => !pathname.startsWith("/_assets"),
          target: `http://${siteHost}`,
          changeOrigin: true,
        },
      ],
    },
  };
};