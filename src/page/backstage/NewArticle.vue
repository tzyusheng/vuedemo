<!-- eslint-disable prettier/prettier -->
<template>
    <div class="add-article-header">
        <div class="left">
            <p>
                <label>
                    文章标题
                    <a-input style="width: 256px" v-model:value="articleTitle" placeholder="文章标题" allow-clear />
                </label>
            </p>
            <p>
                文章大类
                <a-select ref="select" v-model:value="blogArticleType" style="width: 120px" defaultActiveFirstOption>
                    <a-select-option v-for="item in blogArticleTypeLists" :value="item.id" :key="item.id">{{
                        item.articleTypeName }}</a-select-option>
                </a-select>
            </p>
            <p>
                <label>
                    文章类型
                    <a-input style="width: 256px" v-model:value="articleType" placeholder="文章类型" allow-clear />
                </label>
            </p>

            <p>
                是否为推荐文章
                <a-switch v-model:checked="recommend" />
            </p>
        </div>
        <div @paste="copyImg" title="点击标题粘贴图片">
            文章封面图
            <a-upload list-type="picture-card" :show-upload-list="true" @change="handleUpload" :before-upload="beforeUpload"
                v-model:file-list="fileList" @preview="handlePreview" @remove="removeImag">
                <!-- <img v-if="imageUrl" :src="imageUrl" style="width: 100%" /> -->
                <div v-if="fileList.length == 0">
                    <div class="ant-upload-text">上传图片</div>
                </div>
            </a-upload>
            <a-modal v-if="previewVisible" :visible="true" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="imageUrl" />
            </a-modal>
        </div>
    </div>
    <div style="border: 1px solid #ccc; margin-bottom: 20px">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 300px; overflow-y: hidden" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" :readOnly="true" />
    </div>
    <a-button type="primary" @click="addArticle">发布</a-button>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import {
    onBeforeUnmount,
    ref,
    shallowRef,
    onMounted,
    defineProps,
    defineEmits,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 编辑器实例，必须用 shallowRef
import { IEditorConfig } from "@wangeditor/editor";
import {
    addAricle,
    delImg,
    getArticleData,
    selectblogArticleTypeAll,
    upAricle,
    upload,
} from "@/api/api";
import message from "ant-design-vue/lib/message";
import { FlagFilled } from "@ant-design/icons-vue";
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
const props = defineProps(["id"]);
const emits = defineEmits(["hiddenNewArticle"]);
const editorRef = shallowRef();
const mode = "default";
const articleTitle = ref();
const articleType = ref();
const blogArticleType = ref(1);
const blogArticleTypeLists = ref();
const recommend = ref(false);
const imageUrl = ref();
// const loading = ref(false);
const fileList = ref<FileItem[]>([]);
const previewVisible = ref<boolean>(false);

const toolbarConfig = {};
const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    MENU_CONF: {
        uploadImage: {
            withCredentials: true,
            server: "http://localhost/blog/upload",
        },
    },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const clearData = () => {
    articleTitle.value = "";
    blogArticleType.value = 1;
    articleType.value = "";
    editorRef.value.clear();
    imageUrl.value = "";
    recommend.value = false;
};
const addArticle = async () => {
    if (recommend.value) {
        if (!imageUrl.value) {
            message.warn("文章为推荐文章,文章图片不能为空");
            return false;
        }
    }
    const data: any = {
        articleTitle: articleTitle.value,
        blogArticleType: blogArticleType.value,
        articleType: articleType.value,
        articleText: editorRef.value.getText(),
        articleContext: editorRef.value.getHtml(),
        articleImg: imageUrl.value,
        recommend: recommend.value,
    };

    const dataValidate = Object.keys(data).some((item) => {
        if (item === "articleImg") {
            return false;
        }
        return data[item] === undefined || data[item] === "";
    });
    if (dataValidate) {
        message.warn("请检查是否还有内容未填写");
        return false;
    }

    try {
        const res = props?.id
            ? await upAricle(props?.id, data)
            : await addAricle(data);
        if (res.status) {
            message.success(`文章${props?.id ? "更新" : "发布"}成功`);
            props?.id && emits("hiddenNewArticle", true);
            clearData();
        } else {
            throw res.statusText;
        }
    } catch (err: any) {
        message.error(err);
    }
};

const beforeUpload = (file: FileItem) => {
    fileList.value = [...fileList.value, file];
    return false;
};
const handleUpload = async () => {
    if (fileList.value.length == 0) {
        return false
    }
    const formData = new FormData();
    fileList.value.forEach((file: any) => {
        formData.append("files[]", file as any);
    });
    // loading.value = true;
    const res: any = await upload(formData);
    if (res?.errno === 0) {
        imageUrl.value = res.data.url;
        fileList.value = [res.data];
        message.success("图片上传成功");
    }
};
const handlePreview = () => {
    previewVisible.value = true
};
const getClipboardFiles = (event: any) => {
    const items = event.clipboardData && event.clipboardData.items;
    let file = null;
    if (items && items.length) {
        // 检索剪切板items,类数组，不能使用forEach
        for (let i = 0; i < items.length; i += 1) {
            if (items[i].type.indexOf("image") !== -1) {
                file = items[i].getAsFile();
            }
        }
    }
    if (!file) {
        message.error("粘贴内容不是图片");
        return;
    }
    const fileSize = file.size / 1024 / 1024 < 10;
    if (!fileSize) {
        message.error("请上传小于10M，并且格式正确的图片");
        return;
    }
    beforeUpload(file);
    handleUpload();
};

const copyImg = (e: any) => {
    if (fileList.value.length > 0) {
        return false
    }
    getClipboardFiles(e);
    // e.target.addEventListener('paste', getClipboardFiles)
}
const removeImag = async () => {
    console.log('点击删除');
    const res = await delImg(fileList?.value[0]?.name as string)
    console.log(res);
    if (res.status) {
        message.success(res.statusText)
        return true
    }
    message.error(res.statusText)
    return false
}


onMounted(async () => {
    blogArticleTypeLists.value = await selectblogArticleTypeAll();
    if (props.id) {
        const articleData: any = await getArticleData({ id: props.id });
        if (articleData.code == 200) {
            articleTitle.value = articleData?.data.articleTitle;
            blogArticleType.value = articleData?.data.blogArticleType.id;
            articleType.value = articleData?.data.articleType;
            editorRef.value.setHtml(articleData?.data.articleContext);
            imageUrl.value = articleData?.data?.articleImg || "";
            recommend.value = articleData?.data.recommend;
        }
    }
});
const handleCancel = () => {
    previewVisible.value = false;
    // previewTitle.value = '';
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
