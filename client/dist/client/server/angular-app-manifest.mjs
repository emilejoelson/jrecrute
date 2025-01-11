
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
    'index.csr.html': {size: 13961, hash: 'a58676057b3a7951d53c1c3c692e69d4afacaf9613c221658505b7f990f6ad79', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11893, hash: '40249746ec8d1851d6b16676efd7ecfe4a6c0bb73fb0249b7aff4fe8196e6122', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 69910, hash: '52b8e7e9cd1bc64cc336c9e98725ad89f9ef9a7e75fd6e4b6b5d7ad34d1e6ac4', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'index.html': {size: 74065, hash: '319959ad336605103ad1a70d06264767f968bf55976a3d3b589dd08bb2166212', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 40255, hash: 'a752b40e967a7f02987581d15a59063b21e026882364a453327fd2f8da75c5ba', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 43940, hash: '05632ac9a86d0aa727874b6cb45944e6da07dc41404cf93af98b44c02ce5ea74', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 39850, hash: 'da7225b880e79084bbd8b1c9237d1a52f1b497eb0d952c40d6b0e619510713ad', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 38509, hash: '4b06d6667bdbca4bf04b0e44d3069bf58bbcecaea85c81f7637e037656a5200a', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 38546, hash: '958216ec56fa8c299bbffc06a2dfbcf41df0558985a1669b1611c829f7b8f91c', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-WN2ME5AG.css': {size: 92042, hash: '9Zbpqmzvh18', text: () => import('./assets-chunks/styles-WN2ME5AG_css.mjs').then(m => m.default)}
  },
};
