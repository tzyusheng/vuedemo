<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header-nav">
    <div class="nav-logo">
      <slot></slot>
    </div>
    <div class="nav-text">
      <div class="phone-menu" @click="showMenu">
        <SvgIcon iconName="caidan" style="color:#2a59a7;font-size: 20px;" />
      </div>
    </div>
    <ul :class="{ showmenu: menuState }">
      <li class="hover-color" v-for="item, index in menuList" :key="index" @click="toClick(item)">
        <SvgIcon :iconName="item.iconName" />
        <span>{{ item.title }}</span>
      </li>
    </ul>

  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';
import { useRouter } from 'vue-router';
import { getArticleType } from '@/api/api';
import { ref } from 'vue';
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
const menuState = ref<boolean>(false)
const menuList = [
  { title: '主页', iconName: 'zhuye', pathName: 'index', queryState: true },
  { title: '技能笔记', iconName: 'biji', pathName: 'about', dataName: 'jnbj' },
  { title: '黑科技', iconName: 'keji', pathName: 'about', dataName: 'hkj' },
  { title: '生活', iconName: 'shenghuo', pathName: 'about', dataName: 'sh' },
  // { title: '我的', iconName: 'me', pathName: 'bloginfo', queryState: true },
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
  menuState.value = false
}
const showMenu = () => {
  menuState.value = !menuState.value
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  margin: 0 50px;

  .phone-menu {
    display: none;
  }

  &>ul {
    display: flex;

    li {
      padding: 0 10px;
      cursor: pointer;

      span {
        margin-left: 5px;
      }

    }

  }
}

@media (max-width:800px) {
  .header-nav {
    // position: relative;


    .nav-text {
      display: block;



      // background-color: red;
      .phone-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
      }




    }

    ul {
      // position: absolute;
      // top: 60px;
      // left: 0;
      display: none;
      width: 100vw;
    }


    .showmenu {
      display: block;
    }

  }

}
</style>
