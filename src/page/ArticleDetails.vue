<!-- eslint-disable prettier/prettier -->
<template>
    <div class="details" v-if="articleArrs">
        <div class="details-header">
            <h2>{{ articleArrs?.articleTitle }}</h2>
            <p class="details-info">
                <SvgIcon iconName="riqi" /> {{ formatDate(articleArrs?.articleUpdateTime) }}
                <span>文章类型: {{ articleArrs?.blogArticleType?.articleTypeName }}</span>
            </p>
        </div>
        <div class="details-main">
            <Editor style="overflow-y: hidden;margin-top: 20px;min-height: 500px;" :defaultConfig="editorConfig"
                v-model="valueHtml" />
        </div>

    <!-- <div id="editor-content-view" class="editor-content-view"
                            style="overflow-y: hidden; margin-top: 20px; min-height: 500px;" v-html="valueHtml"></div> -->

    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { getArticleData } from "@/api/api";
import { defineProps, inject, onMounted, ref } from "vue";
import { Editor } from '@wangeditor/editor-for-vue'
// import 'ant-design-vue/dist/antd.css';

const props = defineProps(['id'])
const articleArrs: any = ref()
const valueHtml = ref('')
const formatDate: any = inject('$formatDate')
onMounted(async () => {
    articleArrs.value = await getArticleDetails(props.id)
    valueHtml.value = articleArrs.value?.articleContext
    document.title = articleArrs.value.articleTitle

})
const getArticleDetails = async (id: number) => {
    const res = await getArticleData({ id })
    return res.data
}



// const htmlText = createEditor({
//     html: '<h1 style="color:red">123456</h1>', // 从 editor.getHtml() 获取的 html 内容
//     // 其他属性...
// });
// console.log(htmlText);
const editorConfig = {
    readOnly: true
}

</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
// @import url('ant-design-vue/dist/antd.css');

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

    .details-main {
        text-align: left;
    }

}
</style>