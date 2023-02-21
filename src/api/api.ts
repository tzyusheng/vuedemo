/* eslint-disable prettier/prettier */
import http from "./http";
export function getArticleData(parameter?: object) {
  let requestText = "/select";
  if (parameter) {
    requestText += `?${Object.keys(parameter)[0]}=${
      Object.values(parameter)[0]
    }`;
  }
  return http.get(requestText);
}

export function getArticleType(title: string) {
  const requestText = `/selectArticleType?articleTypeName=${title}`;
  return http.get(requestText);
}

export const login = (userName: string, userPwd: string) => {
  const requestText = "/login";
  return http.post(requestText, { userName, userPwd });
};
export const isSession = () => {
  const requestText = "/login/isSession";
  return http.get(requestText);
};
export const exitLogin = () => {
  const requestText = "/exitLogin";
  return http.get(requestText);
};
export const selectblogArticleTypeAll = () => {
  const requestText = "/selectblogArticleTypeAll";
  return http.get(requestText);
};
export const addAricle = (data: any) => {
  const requestText = "/add";
  return http.post(requestText, data);
};
export const upload = (flie: any) => {
  const requestText = "/upload";
  return http.post(requestText, flie);
};
export const selectRecommend = () => {
  const requestText = "/selectRecommend";
  return http.get(requestText);
};
export const selectBlogarticleAll = () => {
  const requestText = "/selectAll";
  return http.get(requestText);
};
export const delArticle = (id: number) => {
  const requestText = "/delArticle";
  return http.delete(requestText, id);
};
export const setPriority = (priority: any) => {
  const requestText = "/setPriority";
  return http.post(requestText, { ...priority });
};
export const getUserAll = () => {
  const requestText = "/selectUserAll";
  return http.get(requestText);
};

export const upDataState = (id: number, State: boolean) => {
  const requestText = "/upDataState";
  return http.post(requestText, { id, State });
};

export const delUser = (id: number) => {
  const requestText = "/delUser";
  return http.delete(requestText, id);
};

export const addUser = (
  userName: string,
  userPwd: string,
  Grade: number,
  State?: boolean,
) => {
  const requestText = "/addUser";
  return http.post(requestText, { userName, userPwd, Grade, State });
};
export const changePwd = (id: number, userPwd: string) => {
  const requestText = "/changePwd";
  return http.post(requestText, { id, userPwd });
};
