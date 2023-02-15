<!-- eslint-disable prettier/prettier -->
<template>
  <div class="article-item">
    <div class="item-img" v-if="articleObj?.articleImg">
      <img :src="articleObj.articleImg" alt="" />
    </div>
    <div class="item-info">
      <h4>
        <span v-if="articleObj.articleType">{{ articleObj.articleType }}</span>
        {{ articleObj.articleTitle }}
      </h4>
      <p class="item-text" :class="{ 'item-text-unimg': articleObj?.articleImg }">{{ articleObj.articleText }}</p>
      <div class="item-bottom">
        <div class="item-parameter">
          <SvgIcon iconName="riqi" class="icon-color"></SvgIcon>
          {{ formatDate(articleObj.articleTime) }}
        </div>
        <button @click="toArticle(articleObj.articleId)">文章详情</button>
      </div>

    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import { defineProps, getCurrentInstance, inject } from "vue";
import { useRouter } from 'vue-router'
defineProps(['articleObj'])
const router = useRouter()
const toArticle = (id: number) => {
  console.log(id);
  router.push({
    name: 'articledetails',
    params: { id }
  })
}

const formatDate: any = inject('$formatDate')

</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.article-item {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  margin: 0 10px;
  padding: 10px 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: #ccc;

  }

  &::after {
    width: 0;
    // background-color: #2a59a7;
    background-image: linear-gradient(to right, rgb(42, 89, 167), rgb(228, 213, 188));
    transition: .5s;
  }

  .item-img {
    flex: 2;
    // width: 100%;
    overflow: hidden;
    margin-right: 20px;
    object-fit: cover;
    height: 200px;

    img {
      height: 100%;
      transition: .8s;
    }
  }

  .item-info {
    position: relative;
    flex: 5;
    padding-bottom: 20px;

    h4 {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-bottom: 10px;
      font-weight: 400;

      span {
        position: relative;
        margin-right: 10px;
        padding: 3px 5px;
        background-color: rgb(42, 89, 167);
        border-radius: 3px;
        font-size: 12px;
        color: #fff;

        &::after {
          content: "";
          position: absolute;
          right: -9px;
          top: 50%;
          border: 5px solid transparent;
          border-left-color: #2a59a7;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
    }

    .item-text {
      font-size: 14px;
      color: #00000073;
      // height: 90px;
      letter-spacing: 0.2em;
      line-height: 1.5em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 20px;
    }

    .item-text-unimg {
      margin-top: 20px;
      -webkit-line-clamp: 4;
    }

    .item-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      height: 32px;

      .item-parameter {
        color: #2a59a7;

        .icon-color {
          font-size: 12px;
        }
      }

      button {
        border: none;
        width: 68px;
        height: 100%;
        background-color: #2a59a7;
        color: white;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }

  &:hover {
    &::after {
      width: 100%;
    }

    img {
      transform: scale(1.2);
    }
  }
}
</style>
