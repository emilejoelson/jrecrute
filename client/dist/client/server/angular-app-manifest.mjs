
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
    "route": "/deposer-un-cv-avec-succes"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9290, hash: 'bc5799cf9dd1b774b40cf9fceb5bcbe9f22d896296a68005ec6d873db920cc4b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: 'e67ada875e81b3fed261d6e905f2305a5ffd395c5706b2cebac063c425429b80', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 60968, hash: 'f96842c61a0f4416e1d8c04e3e6fc6eaf2066bc4cf4823bce0eff6fb64714370', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 32274, hash: 'bc58d1139154c596301daeb27280f52aa0b21236bb8ed1eb939110a37715c85c', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33747, hash: '1fea9aceff35dc391a1cc5de3b899e8cf17bd60eef0bc3691839bbb9f7a5bb24', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-VMKIA5M7.css': {size: 83083, hash: '45Dg4Wtn34E', text: () => import('./assets-chunks/styles-VMKIA5M7_css.mjs').then(m => m.default)}
  },
};
