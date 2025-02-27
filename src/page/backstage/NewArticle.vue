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
            <a-upload list-type="picture-card" :show-upload-list="true" @change="handleUpload"
                :before-upload="beforeUpload" accept=".jpg,.png,.gif,.jpeg" v-model:file-list="fileList"
                @preview="handlePreview" @remove="removeImag">
                <!-- <img v-if="imageUrl" :src="imageUrl" style="width: 100%" /> -->
                <div v-if="fileList.length == 0">
                    <div class="ant-upload-text">上传图片</div>
                </div>
            </a-upload>
            <a-modal v-if="previewVisible" :visible="true" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="imgHttp + imageUrl" />
            </a-modal>
        </div>
    </div>
    <div style="border: 1px solid #ccc; margin-bottom: 20px;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor :defaultConfig="editorConfig" style="height: calc(100vh - 400px) ;" :mode="mode"
            @onCreated="handleCreated" :readOnly="true" />
    </div>
    <div :class="{ 'top-btns': screen }">
        <a-button type="primary" @click="addArticle">发布</a-button>
        <a-button style="margin-left: 5px;" v-if="props?.id" @click="hiddenNewArticle">取消</a-button>
    </div>
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
    inject,
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
interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    preview?: string;
    originFileObj?: any;
    file: string | Blob;
    type?: string;
}
const props = defineProps(["id"]);
const emits = defineEmits(["hiddenNewArticle"]);
const imgHttp: any = inject('$imgHttp')

const editorRef = shallowRef();
const mode = "default";
const articleTitle = ref();
const articleType = ref();
const blogArticleType = ref(1);
const blogArticleTypeLists = ref();
const recommend = ref(false);
const imageUrl = ref();
const screen = ref(false);
const uploadImg: any = []
const fileList = ref<FileItem[]>([]);
const previewVisible = ref<boolean>(false);
// 当前编辑上传所有图片
const allUpdateImages = ref<any[]>([])
// 已上传文章图片
const oldUpdateImages = ref<any[]>([])

const toolbarConfig = {};
const onInsertedImage = (imageList: any) => {
    allUpdateImages.value.push(imageList?.alt)
}
const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    MENU_CONF: {
        uploadImage: {
            withCredentials: true,
            server: "http://localhost/blog/upload",
            maxFileSize: 20 * 1024 * 1024,
        },
        insertImage: {
            onInsertedImage
        }
    },
};
// 删除未保存图片
const delImageArr = async (imageCurrent: any[]) => {
    const arr = [...allUpdateImages.value, ...oldUpdateImages.value].filter(item => !imageCurrent.includes(item))
    if (arr.length) {
        await delImg(arr)
    }
}
// 处理当前上传图片名称
const delectImageFn = (imageCurrent: any[]) => {
    const arr = imageCurrent.map(item => item?.alt)
    delImageArr(arr)
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    delImageArr(oldUpdateImages.value)
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor: any) => {
    if (props?.id) {
        setTimeout(() => {
            oldUpdateImages.value = editor.getElemsByType('image').map((item: any) => item?.alt || item?.href.split('/').at(-1))
        }, 500)
    }
    editorRef.value = editor; // 记录 editor 实例，重要！
    editor.on('fullScreen', () => { screen.value = true })
    editor.on('unFullScreen', () => { screen.value = false })

};
const hiddenNewArticle = () => {
    emits("hiddenNewArticle", true)
}
const clearData = () => {
    articleTitle.value = "";
    blogArticleType.value = 1;
    articleType.value = "";
    editorRef.value.clear();
    imageUrl.value = "";
    recommend.value = false;
    fileList.value = []
    allUpdateImages.value = []
};
const addArticle = async (click = true) => {
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
        if (item === "articleImg" || item === "articleText") {
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
            if (!click) {
                return true
            }
            message.success(`文章${props?.id ? "更新" : "发布"}成功`);
            delectImageFn(editorRef.value.getElemsByType('image'))
            props?.id && emits("hiddenNewArticle", true);
            clearData();
        } else {
            throw res.statusText;
        }
    } catch (err: any) {
        message.error(err);
    }
};

const beforeUpload = (file: any) => {
    uploadImg[0] = file
    fileList.value = [file]
    return false

};
const handleUpload = async () => {
    if (fileList.value.length === 0) {
        return false
    }
    const fileType = fileList?.value[0]?.type?.split('/')[0]
    console.log(fileType);

    if (fileType !== 'image') {
        fileList.value = []
        message.error('只能上传图片文件')
        return false

    }
    const formData = new FormData();
    formData.append("image", uploadImg[0], "image.png");
    const res: any = await upload(formData);
    if (res?.errno === 0) {
        imageUrl.value = res.data.imgUrl;
        fileList.value = [res.data];
        message.success("图片上传成功");
        return true
    }
    fileList.value = []
    uploadImg.length = 0
    message.error("图片上传失败");
    return false
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
    if (fileList.value && fileList.value.length > 0) {
        return false
    }
    getClipboardFiles(e);
    // e.target.addEventListener('paste', getClipboardFiles)
}
const removeImag = async () => {
    const res = await delImg([fileList?.value[0]?.name])
    if (res.status) {
        imageUrl.value = ''
        recommend.value = false
        uploadImg.length = 0
        if (props?.id) {
            addArticle(false)
        }
        message.success(res.statusText)
        return true
    }
    message.error(res.statusText)
    return false
}
const getImageName = (url: string) => {
    const names = url.split('/')
    return names.at(-1)
}

onMounted(async () => {
    blogArticleTypeLists.value = await selectblogArticleTypeAll();
    if (props?.id) {
        const articleData: any = await getArticleData({ id: props.id });
        if (articleData.code == 200) {
            articleTitle.value = articleData?.data.articleTitle;
            blogArticleType.value = articleData?.data.blogArticleType.id;
            articleType.value = articleData?.data.articleType;
            editorRef.value.setHtml(articleData?.data.articleContext);
            imageUrl.value = articleData?.data?.articleImg || "";
            fileList.value = articleData?.data?.articleImg ? [{ uid: '', url: imgHttp + imageUrl.value, file: '', name: getImageName(imageUrl.value) }] : []
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

.top-btns {
    position: fixed;
    top: 5px;
    right: 20px;
}
</style>
