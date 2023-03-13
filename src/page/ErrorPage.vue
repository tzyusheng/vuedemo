<!-- eslint-disable prettier/prettier -->
<template>
    <div class="nopage">
        <!-- <p class="text">404</p> -->
        <img src="../assets/404logo.png" alt="">
        <div class="text">
            <p>页面找不到了!</p>
            <button @click="toIndex">返回首页</button>
        </div>

    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const toIndex = () => {
    router.replace({
        name: 'index'
    })
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.nopage {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    // text-align: center;
    .text {
        position: absolute;
        right: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 50%;
        height: 100%;
        // text-align: center;
        font-weight: bolder;
        // align-items: center;
        justify-content: center;

        p {
            margin-bottom: 50px;
            font-size: 50px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
        }

        button {
            background-color: rgb(70, 116, 246);
            border: none;
            border-radius: 5px;
            width: 80px;
            height: 35px;
            // transform: translateY(-80px);
            color: white;
            transition: .5s;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0px 3px 18px #ccc;
            }
        }
    }

    img {
        position: absolute;
        height: 100%;
    }


}
</style>
