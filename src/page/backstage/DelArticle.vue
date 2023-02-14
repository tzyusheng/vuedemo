<!-- eslint-disable prettier/prettier -->
<template>
    <a-table :data-source="data" style="padding: 0 20px;">
        <a-table-column key="articleTitle" title="文章标题" data-index="articleTitle" />
        <a-table-column key="articleText" title="文章内容" data-index="articleText" />
        <a-table-column key="articleTime" title="发布时间" data-index="articleTime" />
        <a-table-column key="recommend" title="推荐内容" data-index="recommend" />
        <a-table-column key="action" title="操作">
            <template #default="{ record }">
                <span>
                    <a @click="delBlogArticle(record.articleId)">删除</a>
                </span>
            </template>
        </a-table-column>
    </a-table>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { delArticle, selectBlogarticleAll } from '@/api/api';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';


const data = ref()

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
const getData = async () => {
    const res: any = await selectBlogarticleAll()
    data.value = res.map((item: any) => {
        item.recommend = item?.recommend ? '是' : '否'
        item.articleTime = formatDate(item?.articleTime)
        return item
    })
}
onMounted(() => {
    getData()
    //     [
    //     {
    //         articleContext: "<p>大美人,青青来了</p><p style=\"text-align: center;\">美照<img src=\"https://mdz.mynatapp.cc/imgs/2023-02-14HISMH0LLRWUQ82525V9L7A.jpeg\" alt=\"\" data-href=\"\" style=\"width: 50%;\"></p><p style=\"text-align: center;\">太美了简直</p>",
    //         articleImg: "https://mdz.mynatapp.cc/imgs/2023-02-14HISMH0LLRWUQ82525V9L3E.jpeg",
    //         articleText: "大美人,青青来了\n美照\n太美了简直",
    //         articleTime: "2023-02-14",
    //         articleTitle: "青儿大美女,美到冒泡",
    //         articleType: "青儿",
    //         recommend: '是'
    //     },
    // ];

})
const delBlogArticle = async (id: number) => {
    console.log('删除文章', id);
    const res: any = await delArticle(id)
    console.log(res);
    if (res?.code == 1) {
        message.success(res?.message)
    } else {
        message.error(res?.message)
        return false
    }
    getData()
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less">

</style>

