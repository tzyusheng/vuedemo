<!-- eslint-disable prettier/prettier -->
<!--
<template>
  <div class="blog-backstage">
      <div :style="styleObj">
          <LeftNav style="height: 100%" :collapsed="collapsed">
              <div class="backstage-logo">
                  <img src="../../assets/logo.png" alt="">
                  <span v-show="!collapsed">
                      博客后台管理系统
                  </span>
              </div>
          </LeftNav>
      </div>

      <div class="backstage-main">
          <header>
              <div class="header-button" @click="toggleCollapsed">
                  <MenuUnfoldOutlined v-if="collapsed" />
                  <MenuFoldOutlined v-else />
              </div>
          </header>

      </div>

  </div>
</template>
-->
<!-- eslint-disable prettier/prettier -->
<!--

<script lang="ts" setup>
import LeftNav from "../../components/backstage/LeftNav.vue"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue"
import 'ant-design-vue/dist/antd.css';
import { reactive, ref, watchEffect } from "vue";
const collapsed = ref(false);

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
const styleObj = reactive({
  width: `256px`,
  height: "100vh",
  transition: "0.3s",
  "background-color": "#000c17"
})
watchEffect(() => {
  styleObj.width = collapsed.value ? "80px" : "256px"
  console.log(styleObj);
})
</script>
-->

<!-- eslint-disable prettier/prettier -->

<template>
    <a-layout class="blog-backstage">
        <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
            <LeftNav style="height: 100%" :collapsed="collapsed">
                <div class="backstage-menu-header" @click="toBackstageIndex">
                    <div class="menu-header-logo">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <span v-show="!collapsed">
                        博客后台管理系统
                    </span>
                </div>
            </LeftNav>
        </a-layout-sider>
        <a-layout class="backstage-main">
            <a-layout-header style="background: #fff; padding: 0">
                <span @click="toggleCollapsed">
                    <MenuUnfoldOutlined class="header-button" v-if="collapsed" />
                    <MenuFoldOutlined class="header-button" v-else />
                </span>
                <span class="exit-login" @click="eixtLogin">退出登录</span>
            </a-layout-header>
            <a-layout-content :style="{ margin: '16px', padding: '24px', background: '#fff', minHeight: '280px', }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<!-- eslint-disable prettier/prettier -->

<script lang="ts"  setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons-vue';
import { ref } from 'vue';
import 'ant-design-vue/dist/antd.css';
import LeftNav from "../../components/backstage/LeftNav.vue"
import router from '@/router/router';
import { exitLogin } from '@/api/api';

const collapsed = ref(false);

const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
};
const eixtLogin = async () => {
    const loginState = await exitLogin()
    if (!loginState) {
        router.replace("/login")
        // 设置登录状态为离线
        sessionStorage.setItem('login', 'true')
    }
}
const toBackstageIndex = () => {
    router.push({
        name: 'backstageIndex'
    })
}
</script>
<!-- eslint-disable prettier/prettier -->

<style lang="less" scoped>
.blog-backstage {
    display: flex;
    height: 100%;
    min-height: 100vh;

    .backstage-menu-header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        // background-color: white;
        font-size: 16px;
        color: white;

        .menu-header-logo {
            width: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 5px;
            background-color: white;

            img {
                width: 100%;
                transform: translateY(-5px);
            }
        }

    }

    .backstage-main {
        width: 100%;

        .header-button {
            font-size: 20px;
            padding-left: 20px;
        }

        .exit-login {
            float: right;
            margin-right: 40px;

            &:hover {
                color: #1890ff;
            }
        }
    }

}
</style>