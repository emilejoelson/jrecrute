
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
    'index.csr.html': {size: 14196, hash: 'fcdc323f8a89b323514038d0e6be2ec7c7ee3ffd850c2dc5bbcfe14ed7c2d27e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: 'ee01e9f84b10069b98b6942a4f9bf2be2ae20b2650b7a9bfafb4e96dd8e93d5b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: '80de580798fe594516652d47066ddebd3ea36e7ac0cb23d3954a50f1f6531dc0', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 76975, hash: '1e087320d965e7a41f47a37275974f94c7c8e2364596dba0affe5c3e83fcc543', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 45599, hash: '281df87e29fcadffbb631a94bc633798747da218b6be73ec6eaa40035835b4ac', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: '9e0b1e4ba548d6f391268dbb06db3774a68df909660caede65ab47f42d876c5c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: 'ac8a5abec5d377a0eeb23bfcd62e2159feebe64b376b31334a7d22d160d0675f', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: 'da758c72972f9d80cddf2adbfbf437f9a52fa7b3bf38482e1fa32442083b1361', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 76467, hash: 'd5b007f05a9c0358bb623905a4cdbdcfca74b9b6d15f98f44d2e9358953cc065', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-62YVBQVS.css': {size: 92474, hash: 'CHjvKGe7jAo', text: () => import('./assets-chunks/styles-62YVBQVS_css.mjs').then(m => m.default)}
  },
};
