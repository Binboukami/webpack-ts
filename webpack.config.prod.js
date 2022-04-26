const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "production",
  entry: {
    index: {
      import: "./src/index.ts"
    },
  },
  devtool:  false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Index',
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    plugins: [
      new TsconfigPathsPlugin({
        /*configFile: "./path/to/tsconfig.json" */
        
      }),
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
}