"use strict";(self["webpackChunkmeBlog"]=self["webpackChunkmeBlog"]||[]).push([[518],{518:function(e,a,t){t.r(a),t.d(a,{default:function(){return d}});var l=t(3396),r=t(7139),n=t(4870),s=t(8478);const c={class:"details"},i={class:"details-header"},u={class:"details-info"};var o=(0,l.aZ)({__name:"ArticleDetails",props:["id"],setup(e){const a=e;let t=(0,n.iH)({});(0,l.bv)((async()=>{t.value=await o(a.id)}));const o=async e=>{const a=await(0,s.D)({id:e});return a.data},p=(e,a="YY-MM-DD hh:mm:ss")=>{const t=new Date(e),l=t.getFullYear(),r=t.getMonth()+1,n=t.getDate(),s=t.getHours(),c=t.getMinutes(),i=t.getSeconds();var u=Array.apply(null,Array(10)).map((function(e,a){return"0"+a}));const o=a.replace(/YY/g,l).replace(/MM/g,u[r]||r).replace(/DD/g,u[n]||n).replace(/hh/g,u[s]||s).replace(/mm/g,u[c]||c).replace(/ss/g,u[i]||i);return o};return(e,a)=>{const s=(0,l.up)("SvgIcon");return(0,l.wg)(),(0,l.iD)("div",c,[(0,l._)("div",i,[(0,l._)("h2",null,(0,r.zw)((0,n.SU)(t)?.articleTitle),1),(0,l._)("p",u,[(0,l.Wm)(s,{iconName:"riqi"}),(0,l.Uk)(" "+(0,r.zw)(p((0,n.SU)(t)?.articleTime))+" ",1),(0,l._)("span",null,"文章类型: "+(0,r.zw)((0,n.SU)(t)?.blogArticleType?.articleTypeName),1)])]),(0,l._)("p",null,(0,r.zw)((0,n.SU)(t)?.articleText),1)])}}}),p=t(89);const g=(0,p.Z)(o,[["__scopeId","data-v-3afb840d"]]);var d=g}}]);
//# sourceMappingURL=518.7c012786.js.map