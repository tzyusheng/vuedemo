<!-- eslint-disable prettier/prettier -->
<template>
    <div class="add-article-header">
        <div class="left">
            <p> <label>
                    文章标题
                    <a-input style="width: 256px;" v-model:value="articleTitle" placeholder="文章标题" allow-clear />
                </label>
            </p>
            <p>
                文章大类
                <a-select ref="select" v-model:value="blogArticleType" style="width: 120px;" defaultActiveFirstOption>
                    <a-select-option v-for="item in blogArticleTypeLists" :value="item.id" :key="item.id">{{
                        item.articleTypeName
                    }}</a-select-option>
                </a-select>
            </p>
            <p>
                <label>
                    文章类型
                    <a-input style="width: 256px;" v-model:value="articleType" placeholder="文章类型" allow-clear />
                </label>
            </p>

            <p>
                是否为推荐文章
                <a-switch v-model:checked="recommend" />
            </p>
        </div>
        <div>
            文章封面图
            <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
                @change="handleUpload" :before-upload="beforeUpload">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%;" />
                <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
        </div>
    </div>
    <div style="border: 1px solid #ccc;margin-bottom: 20px;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: 300px; overflow-y: hidden;" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" :readOnly="true" />
    </div>
    <a-button type="primary" @click="addArticle">发布</a-button>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// 编辑器实例，必须用 shallowRef
import { IEditorConfig } from '@wangeditor/editor'
import { addAricle, selectblogArticleTypeAll, upload } from '@/api/api';
import message from 'ant-design-vue/lib/message';
// let editorConfig: Partial<IEditorConfig> = {   // TS 语法

// }
interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    preview?: string;
    originFileObj?: any;
    file: string | Blob;
}
const editorRef = shallowRef()
const mode = "default"
const articleTitle = ref();
const articleType = ref()
const blogArticleType = ref()
const blogArticleTypeLists = ref()
const recommend = ref(false)
const imageUrl = ref()
const loading = ref(false)
const fileList = ref<FileItem[]>([]);
// 内容 HTML
// const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(async () => {
    // setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    // }, 1500)
    blogArticleTypeLists.value = await selectblogArticleTypeAll()
    // console.log();

})

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            withCredentials: true,
            server: 'http://localhost/blog/upload',
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    console.log(editor);

}
const addArticle = async () => {
    if (recommend.value) {
        if (!imageUrl.value) {
            message.warn('文章为推荐文章,文章图片不能为空')
            return false
        }
    }
    const data: any = {
        articleTitle: articleTitle.value,
        blogArticleType: blogArticleType.value,
        articleType: articleType.value,
        articleText: editorRef.value.getText(),
        articleContext: editorRef.value.getHtml(),
        articleImg: imageUrl.value,
        recommend: recommend.value
    }
    const dataValidate = Object.keys(data).some((item) => {
        if (item === 'articleImg') { return false }
        return data[item] === undefined || data[item] === ""
    }
    )
    if (dataValidate) {
        message.warn('请检查是否还有内容未填写')
        return false
    }

    try {
        await addAricle(data)
        message.success('文章发布成功')
    } catch (err: any) {
        message.error(err?.message)
    }


}
const beforeUpload = (file: FileItem) => {
    fileList.value = [...fileList.value, file];
    return false;
};
const handleUpload = async () => {
    const formData = new FormData();
    fileList.value.forEach((file: any) => {
        formData.append('files[]', file as any);
    });
    loading.value = true;
    const res: any = await upload(formData)
    if (res?.errno === 0) {
        imageUrl.value = res.data.url
        message.success("图片上传成功")
    }


    // You can use any AJAX library you like
    // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //     method: 'post',
    //     data: formData,
    // })

};
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.add-article-header {
    display: flex;

    .left {
        display: flex;
        flex-direction: column;
        flex: 5;

        p {
            margin: 5px 0;
        }
    }
}
</style>
