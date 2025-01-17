
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/client"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv"
  },
  {
    "renderMode": 2,
    "route": "/mention-legal"
  },
  {
    "renderMode": 2,
    "route": "/attente-de-reponse"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv-avec-succes"
  },
  {
    "renderMode": 2,
    "route": "/fiche-de-poste-remplie-avec-succes"
  }
],
  assets: {
    'index.csr.html': {size: 14196, hash: '90cb0da0b5d5caec3a136f1bfe451c47dc35ce32a8defb07a338813e8d6b2438', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: '7c1c81d59509e46c9ebcdfa15d5b4013c2f8516f33911a55102f8a243bd2e0eb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77113, hash: 'c670af330509abc2ac02ea80bd4915f8dc6da4bb203c714c3aa569bba8b1a147', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'index.html': {size: 78907, hash: '0c37358af1460cb838c01e1ca8315df5db3ef1a13121aafda28700c636505142', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: '256f47843464b3ea4da54f2fcf79ceaa6c39a4abf0b47590f0d6bd086851dbb2', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: '3ed581ffea24feaad53030951408eeb9ee16a8ec7429d688f48af559c0c42fa6', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 54748, hash: '4fb9f888b8c059573f92c1b34ead53768d8fb3220184e062c6db9994ee494133', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: '5972b8343f9df7f389ed78209be69a98e917d376a450b7cbcb17d0bd8679fe25', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: '95a781c0c2a52381ed885c6ca6551bfaee6307c68117ab819d86d3c96b5d2793', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-CVFL5DAD.css': {size: 99420, hash: 'AO54xzU1b1I', text: () => import('./assets-chunks/styles-CVFL5DAD_css.mjs').then(m => m.default)}
  },
};
