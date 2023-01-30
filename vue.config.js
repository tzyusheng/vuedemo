/* eslint-disable prettier/prettier */
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/main.less")],
      // patterns: [],
    },
  },

  
  publicPath: `./`,
  outputDir:"dist",
  assetsDir:'static',
  indexPath:'index.html'
});
