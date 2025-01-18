//pdp/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ModuleFederationPlugin from webpack
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// import dependencies from package.json, which includes react and react-dom
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/entry.js",
  mode: "development",
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    //...
    new ModuleFederationPlugin({
      name: "PdpApp", 
      filename: "remoteEntry.js",
      remotes: {
        HomeApp: "HomeApp@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/App.js",
      },
      shared: {
        ...dependencies, 
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
