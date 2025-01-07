
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
  }
],
  assets: {
    'index.csr.html': {size: 9392, hash: '282b3a1b01b6c96097cd9f8809caf27545622525ffe618a918f0de25979dae0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7747, hash: 'd4e16e3233991be2aff85b410d5ed5abd4522a605fbaf9b37e2c56b3c1d8ab96', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 62827, hash: 'e870ead5e18a174547e18b7a0c7f85cd4f656fd28206b52ddf0a8b78577ac37c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 32419, hash: '56f6ebb2217fb3dfd473bc29934d993bb105009e32e0d70fb703c3a9117e6b24', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 32955, hash: 'adfe36ed1d3e9c2aa8cc07f28e0f48f4383a8dc1c506b7b0856c406fbe77e9fb', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31158, hash: 'fe106b54bc166db5bf44864e40b205144cf109d6afc28db70dd0b6ed8303f888', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 36797, hash: '731c3f64c538146562112d3cde6305c1ddcf6c2110730fe87aa6ad3c3b544060', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'styles-22B5N3H2.css': {size: 85413, hash: '6HZfGLUNpSk', text: () => import('./assets-chunks/styles-22B5N3H2_css.mjs').then(m => m.default)}
  },
};
