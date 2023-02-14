<!-- eslint-disable prettier/prettier -->
<template>
    <div class="details">
        <div class="details-header">
            <h2>{{ articleArrs?.articleTitle }}</h2>
            <p class="details-info">
                <SvgIcon iconName="riqi" /> {{ formatDate(articleArrs?.articleTime) }}
                <span>文章类型: {{ articleArrs?.blogArticleType?.articleTypeName }}</span>
            </p>


        </div>
        <!-- <p>
            {{ articleArrs?.articleText }}
        </p> -->
        <!-- <Editor style="overflow-y: hidden;height: 100%;" :defaultConfig="editorConfig" v-model="valueHtml" /> -->
        <div style="margin-top: 20px;" v-html="valueHtml"></div>
    </div>

</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">

import { getArticleData } from "@/api/api";
import { defineProps, onMounted, ref } from "vue";
import { Editor } from '@wangeditor/editor-for-vue'

const props = defineProps(['id'])
let articleArrs: any = ref({})
const valueHtml = ref('<h1>hello</h1>')
onMounted(async () => {
    articleArrs.value = await getArticleDetails(props.id)
    valueHtml.value = articleArrs.value?.articleContext
})
const getArticleDetails = async (id: number) => {
    const res = await getArticleData({ id })
    return res.data
}

const formatDate = (time: string, format = 'YY-MM-DD hh:mm:ss') => {
    const date: any = new Date(time);

    const year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });

    const newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
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