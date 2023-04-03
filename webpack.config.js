const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const standalone_alias = {
  /*
  "semantic": "../vendor/semantic",
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "acim": path.resolve(__dirname, "../cmi-www/src/js"),
  "oe": path.resolve(__dirname, "../cmi-www/src/js"),
  "acol": path.resolve(__dirname, "../cmi-www/src/js"),
  "col": path.resolve(__dirname, "../cmi-www/src/js"),
  "ftcm": path.resolve(__dirname, "../cmi-www/src/js"),
  "jsb": path.resolve(__dirname, "../cmi-www/src/js"),
  "raj": path.resolve(__dirname, "../cmi-www/src/js"),
  "wom": path.resolve(__dirname, "../cmi-www/src/js"),
  "pwom": path.resolve(__dirname, "../cmi-www/src/js"),
 */
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "www": path.resolve(__dirname, "../cmi-www/src/js")
};

const integration_alias = {
  /*
  "semantic": "../vendor/semantic",
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "acim": path.resolve(__dirname, "../cmi-acim/src/js"),
  "oe": path.resolve(__dirname, "../cmi-oe/src/js"),
  "acol": path.resolve(__dirname, "../cmi-acol/src/js"),
  "col": path.resolve(__dirname, "../cmi-col/src/js"),
  "ftcm": path.resolve(__dirname, "../cmi-ftcm/src/js"),
  "jsb": path.resolve(__dirname, "../cmi-jsb/src/js"),
  "raj": path.resolve(__dirname, "../cmi-raj/src/js"),
  "wom": path.resolve(__dirname, "../cmi-wom/src/js"),
  "pwom": path.resolve(__dirname, "../cmi-pwom/src/js"),
 */
  "me-plugin": path.resolve(__dirname, "../cmi-audio/dist"),
  "www": path.resolve(__dirname, "../cmi-www/src/js")
};


module.exports = {
  devtool: "source-map",
  stats: {
    colors: true
  },

  resolve: {
    //alias: standalone_alias
    alias: integration_alias
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
    //new CleanWebpackPlugin()
    new MiniCssExtractPlugin({filename: 'me-styles.css'})
    //new BundleAnalyzerPlugin({analyzerPort: 8816})
  ]
};

