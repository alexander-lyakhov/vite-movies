import{u as x,g as M,h as n,i as S,j as g,s as p,o as r,b as f,d as t,t as l,F as b,r as D,k as R,w as E,l as F,n as H}from"./index-4f5c219e.js";const N=t("h1",{class:"page-title"},"Book Tickets",-1),j={class:"booking"},z=["innerHTML"],I={class:"movie-date"},P={class:"movie-time"},V=["onClick"],G={__name:"book",setup($){var k,y,w;const B=x(),o=M(),u=(k=o.query)==null?void 0:k.id,d=n((y=o.query)==null?void 0:y.showdate),_=n((w=o.query)==null?void 0:w.daytime),m=n([]),v=n({});S(async()=>{try{m.value=await g.getPlaces(o.query),v.value=await B.dispatch("getMovieById",u)}catch(e){p(e)}});function h(e){var s;return((s=e[0])==null?void 0:s.row)||""}function C(e){return e[1]||[]}async function L(e,s,i){try{await g.bookTicket({movie_id:u,row:s,seat:i,showdate:d.value,daytime:_.value}),e.target.classList.remove("is-free"),e.target.classList.add("is-booked")}catch(a){p(a)}}return(e,s)=>{var i;return r(),f(b,null,[N,t("section",j,[t("div",{class:"movie-title",innerHTML:(i=v.value)==null?void 0:i.name},null,8,z),t("div",I,l(new Date(d.value).toDateString()),1),t("div",P,l(_.value),1),(r(!0),f(b,null,D(m.value,(a,T)=>(r(),R(F,{key:T,title:`Row ${h(a)}`,items:C(a),"item-width":32},{default:E(({item:c})=>[t("div",{class:H(["seat",[c.is_free?"is-free":"is-booked"]]),onClick:q=>L(q,h(a),c.seat)},l(c.seat),11,V)]),_:2},1032,["title","items"]))),128))])],64)}}};export{G as default};
