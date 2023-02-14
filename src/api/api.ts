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
