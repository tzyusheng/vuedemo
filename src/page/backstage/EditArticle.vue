<!-- eslint-disable prettier/prettier -->
<template>
    <a-table v-if="edit" :data-source="data" style="padding: 0 5px;" :scroll="{ y: 400 }" :columns="columns">
        <template v-slot:bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
                <span>
                    <a @click="delBlogArticle(record.articleId)">编辑</a>
                </span>
            </template>
        </template>

    </a-table>
    <NewArticle v-else :id="articleId" @hiddenNewArticle="hiddenNewArticle"></NewArticle>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { selectBlogarticleAll } from '@/api/api';

import { message } from 'ant-design-vue';
import { inject, onMounted, ref } from 'vue';
import NewArticle from './NewArticle.vue';


const data = ref()
const articleId = ref()
const edit = ref<boolean>(true);
const formatDate: any = inject('$formatDate')
const columns = [
    {
        title: '文章标题',
        dataIndex: 'articleTitle',
        width: 150,
    },
    {
        title: '文章内容',
        dataIndex: 'articleText',
        width: 200,
        ellipsis: true
    },
    {
        title: '发布时间',
        dataIndex: 'articleTime',
        width: 150,
    },
    {
        title: '更新时间',
        dataIndex: 'articleUpdateTime',
        width: 150,
    },
    {
        title: '推荐内容',
        dataIndex: 'recommend',
        width: 150,
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 50,
    },
]

const getData = async () => {
    const res: any = await selectBlogarticleAll()
    data.value = res.map((item: any) => {
        item.recommend = item?.recommend ? '是' : '否'
        item.articleTime = formatDate(item?.articleTime)
        item.articleUpdateTime = formatDate(item?.articleUpdateTime)
        return item
    })
}
onMounted(() => {
    getData()
})
const delBlogArticle = async (id: number) => {
    // Modal.confirm({
    //     title: '删除提示',
    //     icon: createVNode(ExclamationCircleOutlined),
    //     content: '确认要删除此文章?',
    //     okText: '确定',
    //     cancelText: '取消',
    //     async onOk() {
    //         try {
    //             const res: any = await delArticle(id)
    //             console.log(res);
    //             if (res?.code == 1) {
    //                 message.success(res?.message)
    //             } else {
    //                 message.error(res?.message)
    //                 return false
    //             }
    //             getData()
    //         } catch {
    //             return console.log('Oops errors!');
    //         }
    //     }
    // })
    articleId.value = id
    edit.value = false
}
const hiddenNewArticle = (eidtState: boolean) => {
    edit.value = eidtState
    getData()
    // console.log(eidtState);
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less"></style>

