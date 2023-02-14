<!-- eslint-disable prettier/prettier -->
<template>

    <div class="login">

        <div class="login-form">
            <h2>登录</h2>
            <a-input style="width: 256px; margin: 10px 0;" v-model:value="userName" placeholder="用户名" allow-clear />
            <a-input-password style="width: 256px;margin: 10px 0;" v-model:value="userPwd" placeholder="密码" allow-clear
                :onPressEnter="loginPost" />
            <div class="login-btn">
                <a-button type="primary" @click="loginPost" :disabled="disabled">登录</a-button>
                <a-button @click="clearContent">取消</a-button>
            </div>
        </div>


    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import 'ant-design-vue/dist/antd.css';
import { login } from '@/api/api';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const userName = ref()
const userPwd = ref()
let disabled = ref(true)
const router = useRouter()
watchEffect(() => {
    disabled.value = !(userName.value && userPwd.value)
})
// onMounted(async () => {

//     const isLogin = await isSession()
//     if (isLogin) {
//         await addBlogBackstagePath()
//     }
// })
const loginPost = async () => {
    if (userName.value && userPwd.value) {
        // alert(userName.value + userPwd.value)
        const res = await login(userName.value, userPwd.value)
        console.log(res.data);
        // if (res.headers)
        if (res.data?.loginState) {
            message.success("登录成功")
            await addBlogBackstagePath()
        } else {
            message.error("账号或密码不正确")

        }

    }
}
const addBlogBackstagePath = async () => {
    router.addRoute({
        path: "/blog",
        name: "blogbackstage",
        component: () => import("../page/backstage/BlogBackstage.vue"),
        props: true,
        children: [
            {
                path: "/blog/newArticle",
                name: "newArticle",
                component: () => import("../page/backstage/NewArticle.vue"),
            },
            {
                path: "/blog/delArticle",
                name: "delArticle",
                component: () => import("../page/backstage/DelArticle.vue"),
            },
            {
                path: "/blog/userMange",
                name: "userMange",
                component: () => import("../page/backstage/UserMange.vue"),
            },
        ],
    })
    router.replace("/blog");

    // router.push({
    //     name: 'blogbackstage'
    // })
}
const clearContent = () => {
    userName.value = userPwd.value = ""
}
</script>
<!-- eslint-disable prettier/prettier -->
<style lang="less" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f0f2f5;
    min-height: 100vh;

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        background-color: hsla(0, 0%, 100%, 0.2);
        backdrop-filter: blur(5px);

        input {
            width: 256px;
            background-color: transparent;
            border: 1px solid #ccc;
            height: 35px;
            line-height: 35px;
            margin: 10px;
            outline: none;
            padding-left: 15px;
            border-radius: 5px;

            &:focus {
                border-color: #40a9ff;
            }
        }

        .login-btn {
            display: flex;
            // flex-direction: column;
            justify-content: space-evenly;
        }

    }

}
</style>