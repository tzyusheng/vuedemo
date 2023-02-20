<!-- eslint-disable prettier/prettier -->
<template>
    <div @click="saveVideoToLocal">
        用户管理页面
    </div>
<img :src="srcUrl" alt="">
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">



import { ref } from 'vue';
import { message } from 'ant-design-vue';

const srcUrl = ref('')






const saveVideoToLocal = () => {
    //   dataInfo.loading = true;  //loading 防止重复点击
    let link = document.createElement('a');  //创建一个a标签
    link.style.display = 'none';
    var url = 'https://transseekingpublic.oss-cn-hangzhou.aliyuncs.com/host/example/5.jpg';  //地址（后端返回的地址）
    fetch(url, { mode: 'no-cors' })
        .then((res) => res.blob())
        .then((blob) => {  // 将链接地址字符内容转变成blob地址

            link.href = URL.createObjectURL(blob);
            console.log(link.href);
            srcUrl.value = link.href
            //指定下载名字
            link.download = `1.jpg`
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            // dataInfo.loading = false;
        }).catch((e) => {
            console.log(e);

            message.error('请求超时')
        });
};

</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped></style>
