
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
    'index.csr.html': {size: 14196, hash: '24b86869489dd8b04641caa8415f8acbda815714938ac8add4914ccfe9c7b954', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: '42ad02e2a2e59d4332e8fca7807cab613143e6596272f88bc13f1cc740cf1e39', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76487, hash: 'bdef64324186eaeef88833a0f16af734f187c74b08df3cd9d565cdf477fb4d53', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77113, hash: '4af9e1f7bf7bc005b58af76f2a9be5ad2091116524e855381b48fdc7226c4c0e', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 54748, hash: 'bc676398d343a50deaf3b2c8eda6288d765fb6cbbaa24b9f4fdb7abd7d020d76', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: '56fa5eb86c6e4a3609a0cd525a861e189baa896fa8ac7767f23db51ac8521483', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: '0b0066b047ba1181a43537021fba785cf3bba6b7bba2acfd7f5137fae9972e31', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: '814a7bff7ec01bba1948aa7c398702b28447a0ad4f1b66759949fef1e5edbfcb', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: 'c1cdf9f200727cc35506792f269ad6b9521ebb9bd3b5a466001ba68a87198a9b', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-LJ4PLVSV.css': {size: 94666, hash: 'qQzI5MrxyQA', text: () => import('./assets-chunks/styles-LJ4PLVSV_css.mjs').then(m => m.default)}
  },
};
