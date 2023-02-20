/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import svgIcon from "./components/SvgIcon.vue";
import Antd from "ant-design-vue";
import { formatDate, addBlogBackstagePath } from "./utils/commonFun";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

createApp(App)
  .use(router)
  .use(Antd)
  .component("SvgIcon", svgIcon)
  .provide("$formatDate", formatDate)
  .provide("$addBlogBackstagePath", addBlogBackstagePath)
  .mount("#app");
