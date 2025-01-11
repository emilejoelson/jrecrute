
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
    'index.csr.html': {size: 14196, hash: 'f4a292ad47260d4c5e4e91f0cf71110762eb2dc24114c8f6ba6bbfc5d5a2b711', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: '05e07ba3fe6f56dc5ea1b669c156b9aded1ddbeb1819a54182ddd76304bdbb55', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76465, hash: 'f5792c7ac4e12695f40a12c31b5bb40e15d2b67477ad33ff1a986f381aabfb78', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 72009, hash: 'e08b50aaed5330464e39f13b0e000d7556b4132934b252eccd0279eff3f32baf', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 45599, hash: 'a76b5c8029558e75b7f935a3dd2e95b3b46a4069e00a4ace94f384862140a1c7', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: 'fb4171edccdc34e5ae70aafb87cc4249dc578357ef5e05502f01ef2b14bfefb2', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: '8f24e1a0014b7f47da845d604760362203c0ebb224f2b6532829017f1703c394', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: '5bd79ffd081b3e26f0143368406f4618055dc0ca338b623919982eb62d857093', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: 'f253c89106680829aca425dc456534d0eed14c4e52f6e7208c9449a12cc9046f', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-QNRC4PXG.css': {size: 92044, hash: 'oMUs1ot0QDw', text: () => import('./assets-chunks/styles-QNRC4PXG_css.mjs').then(m => m.default)}
  },
};
