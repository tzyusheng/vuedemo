<!-- eslint-disable prettier/prettier -->
<template>
    <div class="details">
        <div class="details-header">
            <h2>{{ articleArrs.articleTitle }}</h2>
            <p class="details-info">
                <SvgIcon iconName="riqi" /> {{ articleArrs.articleInfo.time }} <span>文章类型: {{
                    articleArrs.articleType
                }}</span>
            </p>

        </div>

    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { defineProps } from "vue";

defineProps(['id'])
const articleArrs = { articleImg: 'https://n.sinaimg.cn/photo/transform/700/w1000h500/20230113/d5ac-7c3fa6e8ee8ca9660476fa0ed15c98a3.jpg', articleTitle: '图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 1, articleType: 'img' }
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.details {
    text-align: center;

    .details-header {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;

        h2 {
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 20px;
        }

        .details-info {
            font-size: 14px;
            color: rgb(134, 131, 131);
        }
    }

}
</style>