/* eslint-disable prettier/prettier */

import request from "./request";
const http = {
  get(url: string, params?: any) {
    const config: any = {
      method: "get",
      url: url,
    }; /*这里如果GET请求有参数，则携带上传入的参数，在
            URL中以？的方式放在请求链接中*/
    if (params) config.params = params;
    return request(config);
  },
  post(url: string, params: any) {
    const config: any = {
      method: "post",
      url: url,
    }; /*同理也是传入用户需要发送到后台的参数，这些参数
            放在报文中，载体表达标准是JSON*/
    if (params) config.data = params;
    return request(config);
  },
  delete(url: string, params?: any) {
    const config: any = {
      method: "delete",
      url,
    }; /*同理也是传入用户需要发送到后台的参数，这些参数
            放在报文中，载体表达标准是JSON*/
    if (params) config.data = params;
    return request(config);
  },
};

//暴露接口，允许Vue文件或其他js,ts文件使用http结构体中的方法
export default http;
