<!-- eslint-disable prettier/prettier -->
<template>
    <div class="nopage">
        <button @click="toIndex">返回首页</button>
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
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/404.png');
    background-size: cover;
    background-position: center;


    button {
        background-color: rgb(255, 210, 87);
        border: none;
        border-radius: 5px;
        width: 80px;
        height: 35px;
        // color: white;    
        transform: translateY(-80px);
        transition: .5s;

        &:hover {
            transform: translateY(-82px);
            box-shadow: 0px 3px 18px #ccc;
        }
    }
}
</style>
