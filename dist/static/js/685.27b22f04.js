"use strict";(self["webpackChunkmeBlog"]=self["webpackChunkmeBlog"]||[]).push([[685,944],{1944:function(e,t,a){a.r(t),a.d(t,{default:function(){return I}});var l=a(3396),c=a(7139),i=a(4870),r=a(8478),s=(a(7658),a(2483));const n={class:"article-item"},o={key:0,class:"item-img"},m=["src"],p={class:"item-info"},g={key:0},u={class:"item-bottom"},d={class:"item-parameter"};var _=(0,l.aZ)({__name:"ArticleItem",props:["articleObj"],setup(e){const t=(0,s.tv)(),a=e=>{console.log(e),t.push({name:"articledetails",params:{id:e}})},i=(e,t="YY-MM-DD hh:mm:ss")=>{const a=new Date(e),l=a.getFullYear(),c=a.getMonth()+1,i=a.getDate(),r=a.getHours(),s=a.getMinutes(),n=a.getSeconds();var o=Array.apply(null,Array(10)).map((function(e,t){return"0"+t}));const m=t.replace(/YY/g,l).replace(/MM/g,o[c]||c).replace(/DD/g,o[i]||i).replace(/hh/g,o[r]||r).replace(/mm/g,o[s]||s).replace(/ss/g,o[n]||n);return m};return(t,r)=>{const s=(0,l.up)("SvgIcon");return(0,l.wg)(),(0,l.iD)("div",n,[e.articleObj?.articleImg?((0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("img",{src:e.articleObj.articleImg,alt:""},null,8,m)])):(0,l.kq)("",!0),(0,l._)("div",p,[(0,l._)("h4",null,[e.articleObj.articleType?((0,l.wg)(),(0,l.iD)("span",g,(0,c.zw)(e.articleObj.articleType),1)):(0,l.kq)("",!0),(0,l.Uk)(" "+(0,c.zw)(e.articleObj.articleTitle),1)]),(0,l._)("p",{class:(0,c.C_)(["item-text",{"item-text-unimg":e.articleObj?.articleImg}])},(0,c.zw)(e.articleObj.articleText),3),(0,l._)("div",u,[(0,l._)("div",d,[(0,l.Wm)(s,{iconName:"riqi",class:"icon-color"}),(0,l.Uk)(" "+(0,c.zw)(i(e.articleObj.articleTime)),1)]),(0,l._)("button",{onClick:r[0]||(r[0]=t=>a(e.articleObj.articleId))},"文章详情")])])])}}}),v=a(89);const b=(0,v.Z)(_,[["__scopeId","data-v-12e94c20"]]);var w=b,f=(0,l.aZ)({__name:"ArticlePage",props:["title","articleType"],setup(e){const t=e;let a=(0,i.iH)();const s=async e=>{const t=await(0,r.D$)({articleType:e});return 0===e?t.data.slice(0,10):t.data};return(0,l.m0)((async()=>{a.value=await s(t.articleType)})),(t,r)=>((0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("h3",null,(0,c.zw)(e.title),1),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,i.SU)(a),(e=>((0,l.wg)(),(0,l.j4)(w,{key:e.articleId,articleObj:e},null,8,["articleObj"])))),128))]))}});const h=(0,v.Z)(f,[["__scopeId","data-v-3f90beb3"]]);var I=h},2685:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var l=a(3396),c=a(7139);const i=e=>((0,l.dD)("data-v-2131b75f"),e=e(),(0,l.Cn)(),e),r={class:"recommend-page"},s=i((()=>(0,l._)("div",{class:"recommend-main"},[(0,l._)("div",{class:"article-item"},[(0,l._)("img",{src:"https://ali.image.hellorf.com/images/2b1b196f7f557d854faa759b8b787617.jpeg?x-oss-process=image/format,webp",alt:""}),(0,l._)("p",null,"1212121")])],-1))),n={class:"recommend-list"},o={class:"article-item"},m=["src"];var p=(0,l.aZ)({__name:"RecommendArticle",setup(e){const t=[{articleTitle:2,articleImg:"https://img.zcool.cn/community/0243oxknsedtruact6y5th3838.jpeg",articleId:1},{articleTitle:3,articleImg:"https://hellorfimg.zcool.cn/preview260/2108174996.jpg?x-oss-process=image/format,webp",articleId:2},{articleTitle:4,articleImg:"https://hellorfimg.zcool.cn/preview260/759448675.jpg?x-oss-process=image/format,webp",articleId:3}];return(e,a)=>((0,l.wg)(),(0,l.iD)("div",r,[s,(0,l._)("div",n,[(0,l._)("ul",null,[((0,l.wg)(),(0,l.iD)(l.HY,null,(0,l.Ko)(t,(e=>(0,l._)("li",{key:e.articleId},[(0,l._)("div",o,[(0,l._)("img",{src:e.articleImg,alt:""},null,8,m),(0,l._)("p",null,(0,c.zw)(e.articleTitle),1)])]))),64))])])]))}}),g=a(89);const u=(0,g.Z)(p,[["__scopeId","data-v-2131b75f"]]);var d=u,_=a(1944);const v={class:"recommend"},b={class:"newest"};var w=(0,l.aZ)({__name:"IndexPage",setup(e){return(e,t)=>((0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",v,[(0,l.Wm)(d)]),(0,l._)("div",b,[(0,l.Wm)(_["default"],{title:"最新发布",articleType:0})])]))}});const f=w;var h=f}}]);
//# sourceMappingURL=685.27b22f04.js.map