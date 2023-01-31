/* eslint-disable prettier/prettier */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Article from "../page/ArticlePage.vue";
import IndexPage from "../page/IndexPage.vue";
// import App from "../App.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../page/IndexPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: Article,
    props: ({ query }) => query,
  },
  {
    path: "/bloginfo",
    name: "bloginfo",
    component: () => import("../page/BlogInfo.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  console.log("访问路由");
  // console.log(to, from);
  next();
});
export default router;
