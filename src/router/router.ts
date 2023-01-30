/* eslint-disable prettier/prettier */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Article from "../page/ArticlePage.vue";
import UserName from "../page/UserName.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/about",
    name: "about",
    component: Article,
    props({ query: { id } }) {
      return { id };
    },
  },
  {
    path: "/page/:id/:text",
    name: "ceshi",
    component: UserName,
    // props: true,
    props(route) {
      console.log(route);
    },
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
