const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  entry: {
    main: ["./src/index.js"]
  },
  mode: argv.mode !== "production" ? "development" : argv.mode,
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [["import", { libraryName: "antd", style: true }]]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              modifyVars: {
                // Example:
                // "@btn-padding-base": "0 8px",
                // "@btn-padding-sm": "0 8px",
                // "@btn-padding-lg": "0 8px"
              }
            }
          }
        ]
      },
      {
        test: /\.html/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      PRODUCTION: argv.mode === "production"
    })
  ]
});
