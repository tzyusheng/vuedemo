const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  // css: {
  //   loaderOptions: {
  //     less: {
  //       // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //       // `primary` is global variables fields name
  //       globalVars: {
  //         primary: "#fff",
  //       },
  //     },
  //   },
  // },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/main.less")],
      // patterns: [],
    },
  },
});
