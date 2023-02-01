/* eslint-disable prettier/prettier */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../page/IndexPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../page/ArticlePage.vue"),
    props: ({ query }) => {
      const articleArrs = JSON.parse(query?.articleArrs as string);
      const { title } = query;
      return { title, articleArrs };
    },
  },
  {
    path: "/bloginfo",
    name: "bloginfo",
    component: () => import("../page/BlogInfo.vue"),
  },
  {
    path: "/articledetails/:id",
    name: "articledetails",
    component: () => import("../page/ArticleDetails.vue"),
    props: true,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log("访问路由");
  // console.log(to, from);
  next();
});
export default router;
