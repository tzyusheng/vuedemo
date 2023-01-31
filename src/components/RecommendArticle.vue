<!-- eslint-disable prettier/prettier -->

<template>
    <div class="recommend-page">
        <div class="recommend-main">
            <div class="article-item">
                <img src="" alt="">
                <p>1212121</p>
            </div>
        </div>
        <div class="recommend-list">
            <ul>
                <li v-for="item in articleList" :key="item">
                    <div class="article-item">
                        <img src="" alt="">
                        <p> {{ item }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
const articleList = [2, 3, 4];
// return { articleList }
</script>
<!-- eslint-disable prettier/prettier -->
<style lang="less" scoped>
.recommend-page {
    width: 100%;
    display: flex;
    height: 100%;

    .recommend-main {
        flex: 3;
        height: 100%;
    }

    .recommend-list {
        flex: 1;
        height: 100%;
        margin-left: 10px;

        ul {
            display: flex;
            flex-direction: column;
            height: 100%;

            li {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                margin-top: 5px;

                &:first-child {
                    margin: 0;
                }
            }
        }
    }

    .article-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        background-color: #ccc;

        img {
            width: 100%;
            object-fit: cover;
        }

        p {
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.355);
            color: white;
            line-height: 30px;
            padding: 0 10px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
