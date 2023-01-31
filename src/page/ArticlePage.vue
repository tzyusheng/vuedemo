<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        {{ title }}页面
        <button @click="clickCount">点我</button>
        <!-- <ImgRotate url="logo.png" /> -->
    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
defineProps(['title'])
// import ImgRotate from "@/components/ImgRotate.vue";
const router = useRouter()
const route = useRoute()
console.log(route.query);
console.log(route.params);
// console.log(title);

const clickCount = () => {
    console.log('1111');

    // a.value++
    // router.push({
    //     name: 'ceshi',
    //     params: {
    //         id: 27346,
    //         text: 'yusheng'
    //     }

    // })
}
</script>
