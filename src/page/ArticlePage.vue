<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <h3>{{ title }}</h3>
        <ArticleItem v-for="item in articleArrs" :key="item.articleId" :articleObj="item" />
    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { getArticleData } from "@/api/api";
import { defineProps, ref, watchEffect } from "vue";
// import { useRoute, useRouter } from "vue-router";
import ArticleItem from '../components/ArticleItem.vue'
const props = defineProps(['title', 'articleType'])
let articleArrs: any = ref()
// console.log(props);


const getArticleInfo = async (articleType: number) => {
    const res = await getArticleData({ articleType })
    return articleType === 0 ? res.data.slice(0, 10) : res.data

}
watchEffect(async () => {
    articleArrs.value = await getArticleInfo(props.articleType)
})
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
h3 {
    line-height: 50px;
    margin: 0 10px;
    font-size: 16px;
    font-weight: 400;
    border-bottom: 2px solid #ccc;
}
</style>
