/*eslint-disable prettier/prettier*/
import { isSession } from "@/api/api";
import { Router } from "vue-router";
// 对数据库中的时间进行格式化
const formatDate = (time: string, format = "YY-MM-DD hh:mm:ss") => {
  const date: any = new Date(time);
  const year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  const preArr = [...Array(10)].map((elem, index) => {
    return "0" + index;
  });

  const newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
};
// 对动态路由进行引入
const routerObj = (obj: any) => {
  if (obj?.children) {
    const { children } = obj;
    obj.children = children.map((item: any) => {
      const url = item?.component;
      item.component = () => import("../page/backstage/" + url + ".vue");
      return item;
    });
  }
  const url = obj.component;
  obj.component = () => import("../page/backstage/" + url + ".vue");
  return obj;
};
// const router = useRouter();
const addBlogBackstagePath = async (
  router: Router,
  path = "/blog",
  grade = false,
) => {
  const routerJson: any = await isSession();
  if (routerJson.status) {
    const routerPath = sessionStorage.getItem("routerPath");
    const login = sessionStorage.getItem("login");
    // 如果路由还存在则无需进行路由添加直接跳转
    if (router.hasRoute("blogbackstage")) {
      // 如果是状态掉了,就进行跳转,防止无限触发
      if (login === "true") {
        router.replace(routerPath || path);
      }
      // 跳转完毕之后清除保存的页面
      sessionStorage.removeItem("routerPath");
      // 跳转完毕之后清除登录离线状态
      sessionStorage.removeItem("login");
      return true;
    }
    await router.addRoute(routerObj(JSON.parse(routerJson.router)));
    sessionStorage.removeItem("routerPath");
    router.replace(routerPath || path);
    return true;
  }
  return false;
};
export { formatDate, addBlogBackstagePath };
