<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <header>
      <nav>
        <BlogNav msg="博客">
          <ImgRotate url="logo.png" />
        </BlogNav>
      </nav>
    </header>
    <main>
      <!-- <ArticlePage></ArticlePage> -->
      <router-view />
    </main>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts">
import ImgRotate from "./components/ImgRotate.vue";
import BlogNav from "./components/Nav.vue";
// import "../public/L2D/L2Dwidget.min.js";
// import ArticlePage from "./page/ArticlePage.vue";
import "./assets/less/main.less";
import { onMounted } from "vue";
export default {
  name: "App",
  components: {
    BlogNav,
    ImgRotate,
    // ArticlePage,
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Win: any = window;
    onMounted(() => {
      Win?.L2Dwidget.init({
        pluginModelPath: "./L2D/model/live2d-widget-model-shizuku/assets/",
        model: {
          jsonPath:
            "./L2D/model/live2d-widget-model-haruto/assets/haruto.model.json",
          scale: 1,
        },
        display: {
          position: "right",
          width: 200,
          height: 400,
          hOffset: 0,
          vOffset: 0,
        },
        mobile: { show: false, scale: 0.6 },
        react: { opacityDefault: 0.8, opacityOnHover: 0.1 },
      });
    });
    // const Win: any = window;
    // Win?.L2Dwidget.init({
    //   pluginModelPath: "./L2D/model/live2d-widget-model-shizuku/assets/",
    //   model: {
    //     jsonPath:
    //       "./L2D/model/live2d-widget-model-haruto/assets/haruto.model.json",
    //     scale: 1,
    //   },
    //   display: {
    //     position: "right",
    //     width: 200,
    //     height: 400,
    //     hOffset: 0,
    //     vOffset: 0,
    //   },
    //   mobile: { show: false, scale: 0.6 },
    //   react: { opacityDefault: 0.8, opacityOnHover: 0.1 },
    // });
  },
};
</script>
