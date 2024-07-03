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
// export const login = (userName: string, userPwd: string) => {
//   const requestText = `/login?userName=${userName}&userPwd=${userPwd}`;
//   return http.get(requestText);
// };
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
export const upload = (file: any) => {
  // const file = JSON.parse(JSON.stringify(files));
  // console.log(file);

  const requestText = "/upload";
  // const requestText = "/upFile";
  return http.post(requestText, file);
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
  const requestText = `/delArticle/${id}`;
  return http.delete(requestText, false);
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
export const upAricle = (id: number, articleData: string) => {
  const requestText = "/updataArticle";
  return http.post(requestText, { id, articleData });
};

export const delImg = (imgNames: any) => {
  const requestText = "/delImg";
  return http.delete(requestText, { imgNames });
};
export const delBlogarticleType = (id: number) => {
  const requestText = `/delBlogarticleType/${id}`;
  return http.delete(requestText, false);
};
export const addBlogarticleType = (articleTypeName: string) => {
  const requestText = "/addarticleType";
  return http.post(requestText, { articleTypeName });
};
export const changeBlogarticleType = (id: number, articleTypeName: string) => {
  const requestText = "/changeBlogarticleType";
  return http.post(requestText, { id, articleTypeName });
};
