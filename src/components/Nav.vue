<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header-nav">
    <div class="nav-logo">
      <slot></slot>
    </div>
    <div class="nav-text">
      <ul>
        <li class="hover-color">
          <router-link :to="{ path: '/about', query: { id: 1 } }">
            <SvgIcon iconName="zhuye" />
            <span>主页</span>
          </router-link>
        </li>

        <li class="hover-color"><router-link :to="{ name: 'ceshi', params: { id: 20, text: '12345' } }">
            <SvgIcon iconName="biji" />
            <span>技能笔记</span>
          </router-link>
        </li>
        <li class="hover-color"><router-link :to="{ path: '/about', query: { id: 2 } }">文章</router-link></li>
        <li class="hover-color">
          <router-link :to="{ path: '/about', query: { id: 3 } }">
            <SvgIcon iconName="shenghuo" />
            <span>生活</span>
          </router-link>
        </li>
        <li class="hover-color"><router-link to="/page/5/菜单进入">
            <SvgIcon iconName="me" />
            <span>我的</span>
          </router-link></li>
      </ul>
    </div>
  </div>


</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts">
import SvgIcon from './SvgIcon.vue';

// import ImgRotate from './ImgRotate.vue';
export default {
  name: "BlogNav",
  components: {
    SvgIcon
  },
};
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 0 50px;

  .nav-text {
    ul {
      display: flex;

      li {
        padding: 0 10px;

        span {
          margin-left: 2px;
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
