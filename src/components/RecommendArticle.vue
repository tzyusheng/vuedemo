<!-- eslint-disable prettier/prettier -->

<template>
    <div class="recommend-page" v-if="articleList">
        <div class="recommend-main">
            <div class="article-item" @click="toArticle(articleListOne?.articleId)">
                <img :src="imgHttp + articleListOne?.articleImg" alt="">
                <p>{{ articleListOne?.articleTitle }}</p>
            </div>
        </div>
        <div class="recommend-list">
            <ul>
                <li v-for="item in articleList" :key="item.articleId">
                    <div class="article-item" @click="toArticle(item?.articleId)">
                        <img :src="imgHttp + item.articleImg" alt="">
                        <p> {{ item.articleTitle }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { selectRecommend } from '@/api/api';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const articleList = ref()
const articleListOne = ref()
const imgHttp: any = inject('$imgHttp')

onMounted(async () => {
    articleList.value = await selectRecommend()
    articleListOne.value = articleList.value[0]
    articleList.value = articleList.value.slice(1, 4)
})
const router = useRouter()
const toArticle = (id: number) => {
    console.log(id);
    router.push({
        name: 'articledetails',
        params: { id }
    })
}
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
        background-color: white;
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
            width: 100%;
            // height: 100%;
            // object-fit: cover;
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

@media (max-width:800px) {
    .recommend-page {
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 10px;

        .recommend-main {
            margin-bottom: 10px;
            height: 150px;
        }

        .recommend-list {
            width: 100%;
            height: 100px;
            margin: 0;

            ul {
                flex-direction: row;

                li {
                    margin: 0 5px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>
