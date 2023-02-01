<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header-nav">
    <div class="nav-logo">
      <slot></slot>
    </div>
    <div class="nav-text">
      <ul>
        <li class="hover-color" v-for="item, index in menuList" :key="index" @click="toClick(item)">
          <!-- <router-link :to="{ path: '/' }"> -->
          <SvgIcon :iconName="item.iconName" />
          <span>{{ item.title }}</span>
          <!-- </router-link> -->
        </li>
        <!-- 
        <li class="hover-color"><router-link :to="{ path: '/about', params: { title: '技能笔记' } }">
            <SvgIcon iconName="biji" />
            <span>技能笔记</span>
          </router-link>
        </li>
        <li class="hover-color"><router-link :to="{ path: '/about', params: { title: '黑科技' } }">
            <SvgIcon iconName="keji" />
            <span>黑科技</span>
          </router-link></li>
        <li class="hover-color">
          <router-link :to="{ path: '/about', params: { title: '生活' } }">
            <SvgIcon iconName="shenghuo" />
            <span>生活</span>
          </router-link>
        </li>
        <li class="hover-color"><router-link :to="{ path: '/about', params: { title: '我的' } }">
            <SvgIcon iconName="me" />
            <span>我的</span>
          </router-link></li> -->
      </ul>
    </div>
  </div>


</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';
import { useRouter } from 'vue-router';
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

const articleArrs: any =
{
  hkj:
    [
      { articleImg: 'https://n.sinaimg.cn/photo/transform/700/w1000h500/20230113/d5ac-7c3fa6e8ee8ca9660476fa0ed15c98a3.jpg', articleTitle: '图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 1, articleType: '黑科技' },
      { articleTitle: '黑科技', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 2, articleType: '黑科技' },
      { articleTitle: '黑科技', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 3, articleType: '黑科技' },
      { articleTitle: '黑科技', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 4, articleType: '黑科技' },
    ],
  jnbj: [
    { articleImg: 'https://n.sinaimg.cn/photo/transform/700/w1000h500/20230113/d5ac-7c3fa6e8ee8ca9660476fa0ed15c98a3.jpg', articleTitle: '图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 1, articleType: 'vue' },
    { articleTitle: '无图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 2, articleType: 'vue' },
    { articleTitle: '无图片', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 3, articleType: 'vue' },
    { articleTitle: '技能笔记', articleText: '好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片好看的图片', articleInfo: { time: '2023-02-01' }, articleId: 4, articleType: 'vue' },

  ]
}
const toClick = (menuInfo: menuType) => {
  let routerObj: any = {
    name: menuInfo.pathName
  }
  if (menuInfo.dataName) {
    const articleArr = articleArrs[menuInfo.dataName] || []
    if (!menuInfo.queryState) {
      routerObj.query = {
        title: menuInfo.title, articleArrs: JSON.stringify(articleArr)
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
