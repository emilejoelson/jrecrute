
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
    'index.csr.html': {size: 9290, hash: 'd11da09e07005e427f19afb59027711f75655ea8a17629e50f29f951b1d63bd4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: '9bf1341e602dc927ea1c38a483ad173ec3a9f823a490fa01132a3aa99f1f107d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31768, hash: 'bcfcf1e74b2e6dbdee90c15a4d32cd6807f0320de4554887ab3d4467acf2c4ec', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60968, hash: '9766ad4b09923b7e45bc3ed31c639c1d01d1f044bd9be2a63f8cf23c281305d1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33747, hash: 'c3b9824a9bc0a026724f1a94b0b0017caa034cb8d266b4b59aaf8e10b0d6c78a', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
