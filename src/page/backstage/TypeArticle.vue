<!-- eslint-disable prettier/prettier -->

<template>
    <div>
        <div class="type-title">
            <h3>分类管理</h3>
            <a-button type="primary" @click="addType">添加分类</a-button>
        </div>
        <a-table :data-source="data" style="padding: 0 5px;" :scroll="{ y: 400 }" :columns="columns">
            <template v-slot:bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <span>
                        <a style="margin-right: 5px;" @click="updataType(record.id, record.articleTypeName)">修改名称</a>
                        <a @click="delType(record.id)">删除</a>
                    </span>
                </template>
            </template>
        </a-table>
        <a-modal :visible="addVisible" :title="recordId ? '修改分类' : '添加分类'" :footer="null" @cancel="closeModal">
            <a-form-item label="分类名称">
                <a-input v-model:value="articleTypeName" aria-required="true" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
                <a-button type="primary" @click="saveType">保存</a-button>
                <a-button style="margin-left: 10px" @click="closeModal">取消</a-button>
            </a-form-item>
        </a-modal>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { addBlogarticleType, changeBlogarticleType, delBlogarticleType, selectblogArticleTypeAll } from '@/api/api';
import { onMounted, ref } from '@vue/runtime-dom';
import { message, Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const addVisible = ref<boolean>(false)
const data = ref<any>()
const articleTypeName = ref<string>('')
const recordId = ref<number | null>(null)
const initData = async () => {
    const res = await selectblogArticleTypeAll()
    if (res) {
        data.value = res
    }

}
onMounted(() => {
    initData()
})
const delType = async (id: number) => {
    // delBlogarticleType(id)
    Modal.confirm({
        title: '删除提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认要删除此分类?',
        okText: '确定',
        cancelText: '取消',
        async onOk() {
            try {
                const res: any = await delBlogarticleType(id)
                if (res?.status) {
                    message.success(res?.statusText)
                } else {
                    message.error(res?.statusText)
                    return false
                }
                initData()

            } catch {
                return console.log('Oops errors!');
            }
        }
    })
}
const updataType = (id: number, name: string) => {
    recordId.value = id
    addVisible.value = true
    articleTypeName.value = name
}
const addType = () => {
    recordId.value = null
    articleTypeName.value = ''
    addVisible.value = true
}
const closeModal = () => {
    addVisible.value = false
    articleTypeName.value = ''
}
const saveType = async () => {
    if (!articleTypeName.value) {
        message.warning('分类名称不能为空')
        return
    }
    try {
        if (recordId.value) {
            const res = await changeBlogarticleType(recordId.value, articleTypeName.value)
            if (res.status) {
                message.success(res.statusText)
                addVisible.value = false
                initData()

            } else {
                message.error(res.statusText)
            }

        } else {
            const res = await addBlogarticleType(articleTypeName.value)
            if (res.status) {
                message.success(res.statusText)
                addVisible.value = false
                initData()
            } else {
                message.error(res.statusText)
            }


        }
    } catch (error: any) {
        message.error(error?.message || '操作失败')
    }

}
const columns = [
    {
        title: '分类Id',
        dataIndex: 'id',
        width: 100,
        align: 'center'
    },
    {
        title: '分类名称',
        dataIndex: 'articleTypeName',
        width: 100,
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        align: 'center'
    }
]
</script>
<!-- eslint-disable prettier/prettier -->

<style scoped>
.type-title {
    display: flex;
    justify-content: space-between;
    margin: 12px;
}
</style>