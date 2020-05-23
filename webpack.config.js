const webpack = require("webpack");
const path = require("path");
//const etp = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const standalone_alias = {
  "semantic": "../vendor/semantic",
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "acim": path.resolve(__dirname, "../cmi-www/src/js"),
  "oe": path.resolve(__dirname, "../cmi-www/src/js"),
  "acol": path.resolve(__dirname, "../cmi-www/src/js"),
  "jsb": path.resolve(__dirname, "../cmi-www/src/js"),
  "raj": path.resolve(__dirname, "../cmi-www/src/js"),
  "wom": path.resolve(__dirname, "../cmi-www/src/js"),
  "www": path.resolve(__dirname, "../cmi-www/src/js")
};

const integration_alias = {
  "semantic": "../vendor/semantic",
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "acim": path.resolve(__dirname, "../cmi-acim/src/js"),
  "oe": path.resolve(__dirname, "../cmi-oe/src/js"),
  "acol": path.resolve(__dirname, "../cmi-acol/src/js"),
  "jsb": path.resolve(__dirname, "../cmi-jsb/src/js"),
  "raj": path.resolve(__dirname, "../cmi-raj/src/js"),
  "wom": path.resolve(__dirname, "../cmi-wom/src/js"),
  "www": path.resolve(__dirname, "../cmi-www/src/js")
};


module.exports = {
  devtool: "source-map",
  stats: {
    colors: true
  },

  resolve: {
    alias: standalone_alias
    //alias: integration_alias
  },

  entry: {
    transcript: ["./src/js/transcript.js"],
    page: ["./src/js/page.js"]
  },
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },
      {
        test: /\.css$/,
        use: [ "style-loader", MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'me-styles.css'})
  ]
};

