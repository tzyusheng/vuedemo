/* eslint-disable prettier/prettier */
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
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // console.log(from.path);
  // console.log(to.path);

  if (to.path === "/blog" || to.path.startsWith("/blog/")) {
    if (to.matched.length === 0) {
      if (await addBlogBackstagePath(router)) {
        // 刷新页面第一次进入页面时，addRoute刚添加路由进去，但没有成功加载需要重进一次
        return next({
          ...to,
          replace: true, // 重进一次, 不保留重复历史
        });
      } else {
        sessionStorage.setItem("routerPath", to.path);
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
router.afterEach((to, from) => {
  switch (to?.name) {
    case "about":
      {
        document.title = to.query?.title as string;
      }
      break;
    case "bloginfo":
      {
        document.title = "我的";
      }
      break;
    case "login":
      {
        document.title = "登录";
      }
      break;
    case "blogbackstage":
      {
        document.title = "博客后台";
      }
      break;
    case "userMange":
      {
        document.title = "用户管理";
      }
      break;
    case "newArticle":
      {
        document.title = "发布文章";
      }
      break;
    case "delArticle":
      {
        document.title = "删除文章";
      }
      break;
    case "recommendArticle":
      {
        document.title = "推荐文章";
      }
      break;
    case "editArticle":
      {
        document.title = "编辑文章";
      }
      break;
    default: {
      document.title = "meBlog";
    }
  }
});
export default router;
