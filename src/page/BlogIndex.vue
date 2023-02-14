<!-- eslint-disable prettier/prettier -->
<template>
    <div class="blog">
        <header>
            <nav>
                <BlogNav>
                    <ImgRotate url="logo.png" />
                </BlogNav>
            </nav>
        </header>
        <main>
            <router-view />
        </main>
        <footer>
            <div class="back-top" :class="{ 'back-top-show': backTopShow }" @click="backTop">
                <SvgIcon iconName="top" />
            </div>
            <p>Copyright &copy; Yusheng Blog All Rights Reserved. 2023-02</p>
        </footer>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import ImgRotate from "../components/ImgRotate.vue";
import BlogNav from "../components/BlogNav.vue";
import { onMounted, onUnmounted, ref } from "vue";
import "../assets/less/main.less";

const backTopShow = ref(false)
const backTopShowfn = () => {
    const topHeight = document.documentElement.scrollTop;
    if (topHeight > 260) {
        backTopShow.value = true
    } else {
        backTopShow.value = false
    }
}
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

const Win: any = window;

onMounted(() => {

    window.addEventListener('scroll', backTopShowfn)
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

})
onUnmounted(() => {
    window.removeEventListener('scroll', backTopShowfn)

})
</script>
