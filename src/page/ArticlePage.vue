<!-- eslint-disable prettier/prettier -->
<template>
    <div>评论页面
        {{ id }}
        <button @click="clickCount">点我</button>
        <!-- <ImgRotate url="logo.png" /> -->
    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
defineProps(['id'])
// import ImgRotate from "@/components/ImgRotate.vue";
const router = useRouter()
const route = useRoute()
console.log(route.query);
console.log(route.params);

const clickCount = () => {
    // a.value++
    router.push({
        name: 'ceshi',
        params: {
            id: 27346,
            text: 'yusheng'
        }

    })
}
</script>
