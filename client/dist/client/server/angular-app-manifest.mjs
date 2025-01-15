
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
    'index.csr.html': {size: 14196, hash: '70ad365d20cf825cc87b059b9f91b65cd585c12cd065cea970de06c6d0d876d8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: 'db0e12f5ecd0693aa50edf9927e7f54c5f5034e57d04b60facab053b43eb1c35', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76467, hash: '6c3f35341f626fd93976dea576c80f7cd4eaee7928211be71a7ac2db511fd6c3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 53244, hash: '844a4b7f57177d87f25f990346edfb578770d868873a3dbd8f6fa92278f19998', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77113, hash: 'bc9be50418b0bd1ecf2367a03ed1810964bdb88b9879718d61befee0831b61db', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: '40e7d1b632d0d19abefa102b4f78725c12f7e6de8ec74cddc2da64f25800ad70', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: 'fc0f4e84727b57347df5b77def2592a78113028a4a9de50cd6f9d397605f4cc8', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: 'f90d44ad8c474c9dc9e08b12f216b1ed07386a18bd1fd942337037ebdcf6141a', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: '26d96267224d0797c0b20270b311ab456b073272ef80ab6c89baa95b7ad13b14', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-2K6LPUR4.css': {size: 93826, hash: 'IqHTKNELiDI', text: () => import('./assets-chunks/styles-2K6LPUR4_css.mjs').then(m => m.default)}
  },
};
