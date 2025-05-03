import{h as y}from"./chunk-TOR7EDOA.js";import{b as $,c as w,d as k}from"./chunk-4P2RETCG.js";import{l as v,m as D,p as b}from"./chunk-ACVSFJE2.js";import{Aa as p,Ib as N,Kb as _,Sb as n,Tb as i,Ub as E,Vb as u,Wb as R,Xb as x,Yb as f,Zb as o,db as A,dc as r,ec as h,fc as S,gc as g,jb as l,kb as d,mc as G,pc as I,qc as c,tb as O,xa as m,ya as L,yb as C,za as T}from"./chunk-AAWMO74Z.js";var H=()=>[1,2,3,4,5,6,7,8,9];function V(s,e){if(s&1&&E(0,"div",27),s&2){let t=o().$implicit,a=o();N("innerHTML",a.getArticleContent(t),A)}}function j(s,e){if(s&1){let t=x();u(0),n(1,"div",18)(2,"button",19),f("click",function(){let M=m(t).$implicit,B=o();return L(B.toggleArticle(M))}),n(3,"div",20)(4,"div",21)(5,"span",22),r(6),i()(),n(7,"span",23),r(8),i()(),T(),n(9,"svg",24),E(10,"path",25),i()(),C(11,V,1,1,"div",26),i(),R()}if(s&2){let t=e.$implicit,a=o();l(6),h(t),l(2),g("Article ",t," - ",a.getArticleTitle(t),""),l(),_("rotate-180",a.isArticleExpanded(t)),l(2),N("ngIf",a.isArticleExpanded(t))}}var P=class s{constructor(e,t){this.translate=e;this.sanitizer=t}expandedArticles={};toggleArticle(e){this.expandedArticles[e]=!this.expandedArticles[e]}isArticleExpanded(e){return this.expandedArticles[e]||!1}getArticleTitle(e){let t={1:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.1",2:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.2",3:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.3",4:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.4",5:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.5",6:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.6",7:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.7",8:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.8",9:"SALE_GENERAL_CONDITION.ARTICLES.TITLES.9"};return this.translate.instant(t[e]||"")}getArticleContent(e){let t=this.getContentTemplate(e),a=this.translate.instant(t);return this.sanitizer.bypassSecurityTrustHtml(a)}getContentTemplate(e){return{1:`
        <div class="space-y-4">
          <p>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.INTRO")}</p>
          <div class="space-y-2">
            <p class="font-medium">${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.SERVICE_INCLUDES")}</p>
            <ol class="list-decimal pl-6 space-y-3">
              <li><span class="font-bold underline">${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.1.TITLE")}</span>: ${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.1.CONTENT")}</li>
              <li>
                <span class="font-bold underline">${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.TITLE")}</span>:
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.SUBPOINTS.0")}</li>
                  <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.2.SUBPOINTS.1")}</li>
                </ul>
              </li>
              <li>
                <span class="font-bold underline">${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.TITLE")}</span>:
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.SUBPOINTS.0")}</li>
                  <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.3.SUBPOINTS.1")}</li>
                </ul>
              </li>
              <li><span class="font-bold underline">${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.4.TITLE")}</span>: ${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.1.POINTS.4.CONTENT")}</li>
            </ol>
          </div>
        </div>
      `,2:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.1")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.2")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.2.3")}</li>
        </ul>
      `,3:`<p>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.3")}</p>`,4:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.1")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.2")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.4.3")}</li>
        </ul>
      `,5:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.5.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.5.1")}</li>
        </ul>
      `,6:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.6.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.6.1")}</li>
        </ul>
      `,7:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.7.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.7.1")}</li>
        </ul>
      `,8:`
        <ul class="space-y-2">
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.8.0")}</li>
          <li>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.8.1")}</li>
        </ul>
      `,9:`<p>${this.translate.instant("SALE_GENERAL_CONDITION.ARTICLES.CONTENTS.9")}</p>`}[e]||""}static \u0275fac=function(t){return new(t||s)(d($),d(y))};static \u0275cmp=O({type:s,selectors:[["app-sale-general-condition"]],decls:29,vars:11,consts:[[1,"max-w-6xl","md:mx-auto","mx-0","px-6","py-8"],[1,"space-y-8"],[1,"md:bg-white","md:p-8","rounded-xl","md:shadow-sm"],[1,"text-3xl","font-bold","mt-[24px]","flex","text-center","text-purple-600","mb-6"],[1,"md:space-y-4"],[4,"ngFor","ngForOf"],[1,"bg-white","p-F8","rounded-xl","shadow-sm"],[1,"text-3xl","custom-650:flex","custom-650:text-center","font-bold","text-purple-600","mb-6"],[1,"space-y-4"],[1,"text-gray-600"],[1,"flex","flex-col","md:flex-row","md:items-center","space-y-4","md:space-y-0","md:space-x-8"],[1,"flex","items-center","space-x-3"],[1,"w-10","h-10","bg-app-primay-dark","rounded-full","flex","items-center","justify-center"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-gray-100"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"],[1,"text-lg"],[1,"w-[40px]","h-[40px]","bg-app-primay-dark","px-2","rounded-full","flex","items-center","justify-center"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],[1,"md:border","md:border-gray-100","md:rounded-lg","transition-all","duration-200","md:hover:shadow-md"],[1,"w-full","px-6","py-4","flex","items-center","justify-between","text-left","hover:bg-gray-50","rounded-lg","focus:outline-none",3,"click"],[1,"flex","items-center","md:space-x-4"],[1,"custom-650:hidden","w-10","h-10","bg-blue-900","rounded-full","flex","items-center","justify-center"],[1,"text-white","font-medium"],[1,"text-lg","font-medium","text-blue-900"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-blue-900","transform","transition-transform"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M19 9l-7 7-7-7"],["class","px-6 py-4 border-t custom-650:bg-white custom-650:rounded-b-lg",3,"innerHTML",4,"ngIf"],[1,"px-6","py-4","border-t","custom-650:bg-white","custom-650:rounded-b-lg",3,"innerHTML"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),r(4),I(5,"translate"),i(),n(6,"div",4),C(7,j,12,6,"ng-container",5),i()(),n(8,"div",6)(9,"h1",7),r(10),I(11,"translate"),i(),n(12,"div",8)(13,"p",9),r(14),I(15,"translate"),i(),n(16,"div",10)(17,"div",11)(18,"div",12),T(),n(19,"svg",13),E(20,"path",14),i()(),p(),n(21,"span",15),r(22,"+33 1 84 80 95 37"),i()(),n(23,"div",11)(24,"div",16),T(),n(25,"svg",13),E(26,"path",17),i()(),p(),n(27,"span",15),r(28,"contact@consultcollab.com"),i()()()()()()()),t&2&&(l(4),S(" ",c(5,4,"SALE_GENERAL_CONDITION.TITLE")," "),l(3),N("ngForOf",G(10,H)),l(3),S(" ",c(11,6,"SALE_GENERAL_CONDITION.CONTACT_INFO.TITLE")," "),l(4),S(" ",c(15,8,"SALE_GENERAL_CONDITION.CONTACT_INFO.SUBTITLE")," "))},dependencies:[b,v,D,k,w],encapsulation:2})};export{P as SaleGeneralConditionComponent};
