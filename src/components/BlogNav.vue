<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header-nav">
    <div class="nav-logo">
      <slot></slot>
    </div>
    <div class="nav-text">
      <ul>
        <li class="hover-color" v-for="item, index in menuList" :key="index" @click="toClick(item)">
          <SvgIcon :iconName="item.iconName" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>


</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';
import { useRouter } from 'vue-router';
import { getArticleType } from '@/api/api';
// import ImgRotate from './ImgRotate.vue';
// export default {
//   name: "BlogNav",
//   components: {
//     SvgIcon
//   },
// };
const router = useRouter()
interface menuType {
  title: string,
  iconName: string,
  pathName: string,
  dataName?: string,
  queryState?: boolean | undefined
}
const menuList = [
  { title: '主页', iconName: 'zhuye', pathName: 'index', queryState: true },
  { title: '技能笔记', iconName: 'biji', pathName: 'about', dataName: 'jnbj' },
  { title: '黑科技', iconName: 'keji', pathName: 'about', dataName: 'hkj' },
  { title: '生活', iconName: 'shenghuo', pathName: 'about', dataName: 'sh' },
  { title: '我的', iconName: 'me', pathName: 'bloginfo', queryState: true },
]
const toClick = async (menuInfo: menuType) => {
  console.log(menuInfo.title);

  let routerObj: any = {
    name: menuInfo.pathName
  }
  if (menuInfo.dataName) {
    if (!menuInfo.queryState) {
      routerObj.query = {
        title: menuInfo.title, articleType: await getArticleType(menuInfo.title)
      }
    }
  }

  router.push(routerObj)
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 0 50px;

  .nav-text {
    cursor: default;

    ul {
      display: flex;

      li {
        padding: 0 10px;

        span {
          margin-left: 5px;
        }

        // span {
        //   position: relative;

        //   &::after {
        //     content: "";
        //     display: block;
        //     position: absolute;
        //     top: 0;
        //     bottom: 0;
        //     margin: auto;
        //     left: -1rem;
        //     width: 1rem;
        //     height: 1rem;
        //     background: url('../assets/blogiocn/home.svg') 0 0 / 100% auto;

        //   }
        // }
      }
    }
  }
}
</style>
