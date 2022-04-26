const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.ts"
    }
  },
  devtool:  "inline-source-map",
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
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devServer: {
    compress: true,
    static: {
      directory: path.resolve(__dirname, "public")
    },
    client: {
      logging: "none"
    }
  }
}