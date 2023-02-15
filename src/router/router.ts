/* eslint-disable prettier/prettier */
import { isSession } from "@/api/api";
import { inject } from "vue";
import { addBlogBackstagePath } from "../utils/commonFun";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "blog",
    component: () => import("../page/BlogIndex.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("../page/IndexPage.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../page/ArticlePage.vue"),
        props: ({ query }) => {
          // const articleArrs = JSON.parse(query?.articleArrs as string);
          // const { title } = query;
          // return { title, articleArrs };
          return query;
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
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../page/LoginPage.vue"),
  },
  // {
  //   // hide: true,
  //   path: "*",
  //   component: () => import("../page/BlogIndex.vue"),
  // },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});
const addPath = async () => {
  const isLogin: any = await isSession();
  if (isLogin.status) {
    // router.addRoute({
    //   path: "/blog",
    //   name: "blogbackstage",
    //   component: () => import("../page/backstage/BlogBackstage.vue"),
    //   props: true,
    //   children: [
    //     {
    //       path: "/blog/newArticle",
    //       name: "newArticle",
    //       component: () => import("../page/backstage/NewArticle.vue"),
    //     },
    //     {
    //       path: "/blog/delArticle",
    //       name: "delArticle",
    //       component: () => import("../page/backstage/DelArticle.vue"),
    //     },
    //     {
    //       path: "/blog/userMange",
    //       name: "userMange",
    //       component: () => import("../page/backstage/UserMange.vue"),
    //     },
    //   ],
    // });
    // router.addRoute({
    //   path: "/:pathMatch(.*)",
    //   name: "*",
    //   meta: { hidden: true },
    //   redirect: "/404",
    // });
    console.log(isLogin.router);

    console.log(JSON.parse(isLogin.router));
  }

  return isLogin.status;
};

// router.isReady().then((onSuccess) => {
//   // if (true) {
//   router.addRoute({
//     path: "/blog",
//     name: "blogbackstage",
//     component: () => import("../page/backstage/BlogBackstage.vue"),
//     props: true,
//     children: [
//       {
//         path: "/blog/newArticle",
//         name: "newArticle",
//         component: () => import("../page/backstage/NewArticle.vue"),
//       },
//     ],
//   });
//   // }
//   console.log(onSuccess);
// });

// 路由守卫
router.beforeEach(async (to, from, next) => {
  console.log();

  if (
    (to.path === "/blog" || to.path.startsWith("/blog/")) &&
    from.path !== "/login"
  ) {
    if (to.matched.length === 0) {
      if (await addBlogBackstagePath(router)) {
        // 刷新页面第一次进入页面时，addRoute刚添加路由进去，但没有成功加载需要重进一次
        return next({
          ...to,
          replace: true, // 重进一次, 不保留重复历史
        });
      } else {
        return next("/login");
      }
    }
  }
  if (to.path === "/login") {
    if (await addBlogBackstagePath(router)) {
      return next({ path: "/blog", replace: true });
    }
  }
  next();
});

export default router;
