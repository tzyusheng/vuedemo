<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="recommend">
            <RecommendArticle />
        </div>
        <div class="newest">
            <ArticlePage title="最新发布" :articleArrs="articleArrs" />
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import RecommendArticle from "../components/RecommendArticle.vue";
import ArticlePage from './ArticlePage.vue'
const articleArrs = [{ articleImg: 'https://n.sinaimg.cn/photo/transform/700/w1000h500/20230113/d5ac-7c3fa6e8ee8ca9660476fa0ed15c98a3.jpg', articleTitle: '图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 1, articleType: 'img' },
{ articleTitle: '无图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 2, articleType: 'img' },
{ articleTitle: '无图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 3, articleType: 'img' },
{ articleTitle: '无图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 4, articleType: 'img' },
]

</script>
