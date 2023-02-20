<!-- eslint-disable prettier/prettier -->
<template>
    文章推荐管理
    <a-table :data-source="data" style="padding: 0 5px;" :scroll="{ y: 400 }" :columns="columns">

        <template v-slot:bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
                <span>
                    <a @click="showModal(record)">设置优先级</a>
                </span>
            </template>
        </template>

    </a-table>
    <a-modal v-model:visible="visible" title="设置文章优先级" @ok="clickPriority" okText="设置" cancelText="取消">
        <p>文章标题:{{ articleTitle }}</p>
        优先级
        <a-select v-model:value="priority">
            <a-select-option v-for="index in [1, 2, 3, 4]" :value="index" :key="index">{{ index }}</a-select-option>
        </a-select>
</a-modal>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">


import { selectRecommend, setPriority } from '@/api/api';
import { message } from 'ant-design-vue';
import { inject, onMounted, ref } from 'vue';


const data = ref()
const formatDate: any = inject('$formatDate')
const priority = ref(1)
const articleId = ref()
const articleTitle = ref()
const columns = [
    {
        title: '文章标题',
        dataIndex: 'articleTitle',
        width: 150,
    },
    {
        title: '发布时间',
        dataIndex: 'articleTime',
        width: 150,
    },
    {
        title: '优先级',
        dataIndex: 'priority',
        width: 50,
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        // slots: { customRender: 'default' },
    },
]
const visible = ref<boolean>(false);

const showModal = (record: any) => {
    articleTitle.value = record.articleTitle
    articleId.value = record.articleId
    visible.value = true;
};
const clickPriority = async () => {
    console.log('更改');
    const data = {
        articleId: articleId.value,
        priority: priority.value
    }
    const res = await setPriority(data)

    if (res.status == 200) {
        message.success(res.statusText)
        getData()
        visible.value = false;
        return true
    }
    message.error(res.statusText)
}
const getData = async () => {
    const res: any = await selectRecommend()
    data.value = res.map((item: any) => {
        item.articleTime = formatDate(item?.articleTime)
        return item
    })
}
onMounted(() => {
    getData()
})

</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less"></style>

