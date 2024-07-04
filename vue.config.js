/* eslint-disable prettier/prettier */
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    overlay:{
      warnings:false,
      errors:false
    }
  },
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/main.less")],
      // patterns: [],
    },
  },
  publicPath: `./`,
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  lintOnSave:false
  // configureWebpack:{
  //   devServer:{
  //     proxy:{
  //       "/api":{
  //         // target: "http://localhost",
  //         target: " https://mdz.mynatapp.cc",
  //         changeOrigin:true,
  //         ws:true,
  //         pathRewrite:{
  //           "^/api":"/"
  //         }
  //       }
  //     }
  //   }
  // }
});
