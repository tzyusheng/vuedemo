/*eslint-disable prettier/prettier*/
import { isSession } from "@/api/api";
import { Router } from "vue-router";

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

const routerObj = (obj: any) => {
  if (obj?.children) {
    const { children } = obj;
    obj.children = children.map((item: any) => {
      console.log(item?.component);
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
const addBlogBackstagePath = async (router: Router) => {
  const routerJson: any = await isSession();
  if (routerJson.status) {
    await router.addRoute(routerObj(JSON.parse(routerJson.router)));
    router.replace("/blog");
    return true;
  }
  return false;
};

export { formatDate, addBlogBackstagePath };
