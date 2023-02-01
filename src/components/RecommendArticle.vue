<!-- eslint-disable prettier/prettier -->

<template>
    <div class="recommend-page">
        <div class="recommend-main">
            <div class="article-item">
                <img src="https://ali.image.hellorf.com/images/2b1b196f7f557d854faa759b8b787617.jpeg?x-oss-process=image/format,webp"
                    alt="">
                <p>1212121</p>
            </div>
        </div>
        <div class="recommend-list">
            <ul>
                <li v-for="item in articleList" :key="item.articleId">
                    <div class="article-item">
                        <img :src="item.articleImg" alt="">
                        <p> {{ item.articleTitle }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
const articleList = [{ articleTitle: 2, articleImg: 'https://img.zcool.cn/community/0243oxknsedtruact6y5th3838.jpeg', articleId: 1 },
{ articleTitle: 3, articleImg: 'https://hellorfimg.zcool.cn/preview260/2108174996.jpg?x-oss-process=image/format,webp', articleId: 2 },
{ articleTitle: 4, articleImg: 'https://hellorfimg.zcool.cn/preview260/759448675.jpg?x-oss-process=image/format,webp', articleId: 3 }];
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
                overflow: hidden;
                flex: 1;
                margin-top: 5px;
                width: 100%;

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
            height: 100%;
            object-fit: cover;
            transition: .6s;

            &:hover {
                transform: scale(1.1);
            }
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
