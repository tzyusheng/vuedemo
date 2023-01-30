/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import svgIcon from "./components/SvgIcon.vue";
// import App from "./index";

createApp(App).use(router).component("SvgIcon", svgIcon).mount("#app");
