import{u as m,a as k,c as f,o as s,b as a,d as n,F as i,r as _,e as g,f as w,p as y,g as C,w as v,h as D,t as S}from"./index-29b28995.js";const x=n("h1",{class:"page-title"},"All Sessions",-1),B={class:"sessions"},$={class:"session-wrapper"},b=["onClick"],A={__name:"sessions",setup(F){const r=m(),c=k();r.dispatch("fetchSessions");const d=f(()=>r.getters.sessions);function p(t){c.push({name:"info",params:{id:t}})}function h(t,l,e){c.push({name:"book",query:{id:t,showdate:l,daytime:e}})}return(t,l)=>(s(),a(i,null,[x,n("section",B,[(s(!0),a(i,null,_(g(d),e=>(s(),a("div",{class:"movie",key:e.id},[w(y,{image:e.image,title:e.name,onClick:o=>p(e.id)},null,8,["image","title","onClick"]),n("div",$,[(s(!0),a(i,null,_(e.sessions,(o,N)=>(s(),C(D,{key:"${movie.id}_${iDate}",title:new Date(o.showdate).toDateString(),items:o.daytime.split(";")},{default:v(({item:u})=>[n("div",{class:"time",onClick:V=>h(e.id,o.showdate,u)},S(u),9,b)]),_:2},1032,["title","items"]))),128))])]))),128))])],64))}};export{A as default};
