<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="recommend">
            <RecommendArticle />
        </div>
        <div class="newest">
            <ArticlePage title="最新发布" :articleType="0" />
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import RecommendArticle from "../components/RecommendArticle.vue";
import ArticlePage from './ArticlePage.vue'

</script>
