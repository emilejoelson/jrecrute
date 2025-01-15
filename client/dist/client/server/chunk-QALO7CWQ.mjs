import './polyfills.server.mjs';
import{n as A,o as L,q as k}from"./chunk-NJRJKORO.mjs";import{$b as C,Ab as u,Mb as m,Ob as b,Wb as n,Xb as e,Yb as o,Zb as h,_b as y,ac as E,bc as c,db as g,fc as t,gc as S,ic as _,kb as s,nc as w,ub as v,va as x,wa as f,xa as d,ya as p}from"./chunk-PMVEATU5.mjs";import"./chunk-X2SEQXRR.mjs";var P=()=>[1,2,3,4,5,6,7,8,9];function V(a,l){if(a&1&&o(0,"div",30),a&2){let i=c().$implicit,r=c();m("innerHTML",r.getArticleContent(i),g)}}function G(a,l){if(a&1){let i=C();h(0),n(1,"div",21)(2,"button",22),E("click",function(){let N=x(i).$implicit,T=c();return f(T.toggleArticle(N))}),n(3,"div",23)(4,"div",24)(5,"span",25),t(6),e()(),n(7,"span",26),t(8),e()(),d(),n(9,"svg",27),o(10,"path",28),e()(),u(11,V,1,1,"div",29),e(),y()}if(a&2){let i=l.$implicit,r=c();s(6),S(i),s(2),_("Article ",i," - ",r.getArticleTitle(i),""),s(),b("rotate-180",r.isArticleExpanded(i)),s(2),m("ngIf",r.isArticleExpanded(i))}}var M=class a{expandedArticles={};toggleArticle(l){this.expandedArticles[l]=!this.expandedArticles[l]}isArticleExpanded(l){return this.expandedArticles[l]||!1}getArticleTitle(l){return{1:"Description du service",2:"Conditions financi\xE8res",3:"Lancement de la prestation",4:"Facturation",5:"Garantie de remplacement",6:"Engagement de l'entreprise",7:"Confidentialit\xE9 et usage des donn\xE9es",8:"Droit applicable",9:"Acceptation des CGV"}[l]||""}getArticleContent(l){return{1:`
        <div class="space-y-4">
          <p>Consult Collab Recrutement propose un service de mise en relation entre entreprises et freelances qualifi\xE9s, bas\xE9s \xE0 l'\xE9tranger, disponibles pour un poste en t\xE9l\xE9travail \xE0 temps plein.</p>
          <div class="space-y-2">
            <p class="font-medium">Le service inclut :</p>
            <ol class="list-decimal pl-6 space-y-3">
              <li> <span class="font-bold underline">Analyse des besoins</span> : Identification des crit\xE8res du poste et des comp\xE9tences requises</li>
              <li>
              <span class="font-bold underline">Recherche cibl\xE9e et pr\xE9s\xE9lection</span> :
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Recherche approfondie dans notre base de donn\xE9es internationale de freelances</li>
                  <li>Pr\xE9s\xE9lection et organisation d'un entretien anonyme via Google Meet sous 48 \xE0 72 heures</li>
                </ul>
              </li>
              <li>
                <span class="font-bold underline">Mise en relation</span>
                 :
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Pr\xE9sentation du freelance s\xE9lectionn\xE9 pour validation par l'entreprise</li>
                  <li>Suivi initial apr\xE8s la mise en relation pour garantir la satisfaction</li>
                </ul>
              </li>
              <li> <span class="font-bold underline">Garantie d'ajustement</span>  : Possibilit\xE9 de remplacement gratuit dans les 15 jours</li>
            </ol>
          </div>
        </div>
      `,2:`
        <ul class="space-y-2">
          <li>Frais de service pour la mise en relation r\xE9ussie : 1 490 \u20AC</li>
          <li>Acompte pour le lancement de la recherche : 447 \u20AC</li>
          <li>TVA non applicable (article 293 B du CGI)</li>
          <li>Total : 1 490 \u20AC</li>
        </ul>
      `,3:`
        <p>Le service commence \xE0 r\xE9ception de l'acompte de 447 \u20AC, accompagn\xE9 de l'acceptation du devis sign\xE9.</p>
      `,4:`
        <ul class="space-y-2">
          <li>Le paiement de l'acompte de 447 \u20AC est requis avant le d\xE9marrage de la recherche.</li>
          <li>Une fois la mise en relation r\xE9ussie confirm\xE9e, une facture finale de 1 043 \u20AC sera \xE9mise</li>
          <li>Le contact du freelance sera communiqu\xE9 uniquement apr\xE8s r\xE9ception du paiement int\xE9gral.</li>
          <li>Le r\xE8glement de la facture finale est exig\xE9 sous 7 jours suivant son \xE9mission.</li>
        </ul>
      `,5:`
        <ul class="space-y-2">
          <li>Si le freelance ne r\xE9pond pas aux attentes de l'entreprise dans les 15 jours suivant le d\xE9marrage, un remplacement gratuit sera propos\xE9.</li>
          <li>Aucun remboursement ne sera accord\xE9</li>
        </ul>
      `,6:`
        <ul class="space-y-2">
          <li>L'entreprise contractualise directement avec le freelance pour un montant de 700 \u20AC par mois, conform\xE9ment \xE0 l'accord \xE9tabli lors de la mise en relation.</li>
          <li>Consult Collab Recrutement n'intervient pas dans le cadre du contrat entre l'entreprise et le freelance.</li>
        </ul>
      `,7:`
        <ul class="space-y-2">
          <li>Les informations \xE9chang\xE9es dans le cadre de la prestation sont strictement confidentielles.</li>
          <li>Consult Collab Recrutement s'engage \xE0 prot\xE9ger les donn\xE9es personnelles conform\xE9ment au R\xE8glement G\xE9n\xE9ral sur la Protection des Donn\xE9es (RGPD).</li>
        </ul>
      `,8:`
        <ul class="space-y-2">
          <li>Les pr\xE9sentes conditions g\xE9n\xE9rales de vente sont r\xE9gies par le droit fran\xE7ais.</li>
          <li>Tout litige relatif \xE0 leur interpr\xE9tation ou \xE0 leur ex\xE9cution rel\xE8ve de la comp\xE9tence des tribunaux fran\xE7ais.</li>
        </ul>
      `,9:`
        <p>L'acceptation du devis implique l'adh\xE9sion pleine et enti\xE8re aux pr\xE9sentes conditions g\xE9n\xE9rales de vente</p>
      `}[l]||""}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=v({type:a,selectors:[["app-legal-notice"]],decls:68,vars:2,consts:[[1,"max-w-6xl","md:mx-auto","mx-0","px-6","py-8","bg-gray-50"],[1,"space-y-8"],[1,"bg-white","p-8","rounded-xl","shadow-sm"],[1,"text-3xl","font-bold","custom-650:flex","custom-650:text-center","text-purple-600","mb-6"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6"],[1,"space-y-3"],[1,"font-medium"],[1,"md:bg-white","md:p-8","rounded-xl","md:shadow-sm"],[1,"text-3xl","font-bold","mt-[24px]","flex","text-center","text-purple-600","mb-6"],[1,"md:space-y-4"],[4,"ngFor","ngForOf"],[1,"text-3xl","custom-650:flex","custom-650:text-center","font-bold","text-purple-600","mb-6"],[1,"space-y-4"],[1,"text-gray-600"],[1,"flex","flex-col","md:flex-row","md:items-center","space-y-4","md:space-y-0","md:space-x-8"],[1,"flex","items-center","space-x-3"],[1,"w-10","h-10","bg-app-primay-dark","rounded-full","flex","items-center","justify-center"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-gray-100"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"],[1,"text-lg"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],[1,"md:border","md:border-gray-100","md:rounded-lg","transition-all","duration-200","md:hover:shadow-md"],[1,"w-full","px-6","py-4","flex","items-center","justify-between","text-left","hover:bg-gray-50","rounded-lg","focus:outline-none",3,"click"],[1,"flex","items-center","md:space-x-4"],[1,"custom-650:hidden","w-10","h-10","bg-blue-900","rounded-full","flex","items-center","justify-center"],[1,"text-white","font-medium"],[1,"text-lg","font-medium","text-blue-900"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-5","h-5","text-blue-900","transform","transition-transform"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M19 9l-7 7-7-7"],["class","px-6 py-4 border-t custom-650:bg-white custom-650:rounded-b-lg",3,"innerHTML",4,"ngIf"],[1,"px-6","py-4","border-t","custom-650:bg-white","custom-650:rounded-b-lg",3,"innerHTML"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),t(4," Informations de l'entreprise "),e(),n(5,"div",4)(6,"div",5)(7,"p")(8,"span",6),t(9,"Raison sociale:"),e(),t(10," OUBERNI LOUBNA"),e(),n(11,"p")(12,"span",6),t(13,"Num\xE9ro Siren:"),e(),t(14," 830009296"),e(),n(15,"p")(16,"span",6),t(17,"Num\xE9ro Siret:"),e(),t(18," 83000929600021"),e(),n(19,"p")(20,"span",6),t(21,"TVA intracommunautaire:"),e(),t(22," FR70830009296 "),e(),n(23,"p")(24,"span",6),t(25,"Greffe:"),e(),t(26," RCS Nanterre"),e()(),n(27,"div",5)(28,"p")(29,"span",6),t(30,"Code NAF / APE:"),e(),t(31," 8220Z"),e(),n(32,"p")(33,"span",6),t(34,"Forme juridique:"),e(),t(35," Entrepreneur individuel "),e(),n(36,"p")(37,"span",6),t(38,"Date d'immatriculation:"),e(),t(39," 31/05/2017 "),e(),n(40,"p")(41,"span",6),t(42,"Commune d'implantation:"),e(),t(43," Clichy (Hauts-de-Seine) "),e()()()(),n(44,"div",7)(45,"h1",8),t(46," Conditions G\xE9n\xE9rales de Vente (CGV) de Consult Collab Recrutement "),e(),n(47,"div",9),u(48,G,12,6,"ng-container",10),e()(),n(49,"div",2)(50,"h1",11),t(51," Informations de Contact "),e(),n(52,"div",12)(53,"p",13),t(54," Pour toute question ou information suppl\xE9mentaire, veuillez nous contacter : "),e(),n(55,"div",14)(56,"div",15)(57,"div",16),d(),n(58,"svg",17),o(59,"path",18),e()(),p(),n(60,"span",19),t(61,"+33 1 84 80 95 37"),e()(),n(62,"div",15)(63,"div",16),d(),n(64,"svg",17),o(65,"path",20),e()(),p(),n(66,"span",19),t(67,"contact@consultcollab.com"),e()()()()()()()),i&2&&(s(48),m("ngForOf",w(1,P)))},dependencies:[k,A,L],styles:['[_nghost-%COMP%]{display:block;background-color:#f9fafb;min-height:100vh}ul.space-y-2[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none}ul.space-y-2[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"- ";font-weight:700}']})};export{M as LegalNoticeComponent};
