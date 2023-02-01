<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <h3>{{ title }}</h3>
        <ArticleItem v-for="item in articleArrs" :key="item.articleId" :articleObj="item" />
    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { defineProps } from "vue";
// import { useRoute, useRouter } from "vue-router";
import ArticleItem from '../components/ArticleItem.vue'
defineProps(['title', 'articleArrs'])
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
