<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <header>
      <nav>
        <BlogNav>
          <ImgRotate url="logo.png" />
        </BlogNav>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="back-top" :class="{ 'back-top-show': backTopShow }" @click="backTop">
        <SvgIcon iconName="top" />
      </div>
    </footer>

  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import ImgRotate from "./components/ImgRotate.vue";
import BlogNav from "./components/BlogNav.vue";
import "./assets/less/main.less";
import { onMounted, onUnmounted, ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const backTopShow = ref(false)
const backTopShowfn = () => {
  const topHeight = document.documentElement.scrollTop;
  if (topHeight > 260) {
    backTopShow.value = true
  } else {
    backTopShow.value = false
  }
}
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

  window.addEventListener('scroll', backTopShowfn)
});
onUnmounted(() => {
  window.removeEventListener('scroll', backTopShowfn)

})
const backTop = () => {
  const seepTopTime = setInterval(() => {
    const topHeight = document.documentElement.scrollTop
    let seepTop = Math.floor(topHeight / 5) || 1;
    document.documentElement.scrollTop -= seepTop;
    if (topHeight <= 0) {
      clearInterval(seepTopTime)
    }
  }, 1000 / 60)
}
</script>
