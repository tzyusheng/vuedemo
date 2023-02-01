<!-- eslint-disable prettier/prettier -->

<template>
  <div class="rotate-logo">
    <img @mousemove="addRotateLogo" @mouseout="delRotateLogo" :src="require(`../assets/${url}`)"
      :style="{transform:`rotate(${rotateDeg}deg)`}" alt="" />
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts">
import { ref } from "vue";
export default {
  name: "ImgRotate",
  props: ['url'],
  setup() {
    let rotateInterval: number | undefined;
    let rotateDeg = ref(0);
    const rotateLogo = () => {
      let deg = 0;
      let degStep = 0;
      return setInterval(() => {
        degStep += 0.02;
        degStep > 30 ? (deg -= degStep) : (deg += degStep);
        rotateDeg.value = deg < 0 ? 0 : deg;
      }, 1000 / 60);
    };
    const addRotateLogo = () => {
      rotateInterval = rotateInterval || rotateLogo();
    };

    const delRotateLogo = () => {
      rotateDeg.value = 0;
      rotateInterval = clearInterval(rotateInterval) as undefined;
    };
    return { addRotateLogo, delRotateLogo, rotateDeg };
  },
};
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.rotate-logo {
  width: 50px;
  height: 50px;
  // background-color: rgb(42, 89, 167);
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>
