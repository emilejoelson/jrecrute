
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
  }
],
  assets: {
    'index.csr.html': {size: 9290, hash: '4e9ebed5b0c703bf1e794ac5fb4c09be6ce4273e373de28015764d1594163121', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: '9e549cc61bd60dabfbceda2857201d96a1018e588f14a6d9e9113d5454e8b13f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33784, hash: '6f622ecbf459818b5206aa9c49714b32da290e148dc2117a354eff06ff00d8dc', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61017, hash: '5bf586bbdc05794c50d7cf00658c0cb2b2acc7c1887dd96d138177aceac24523', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2TPOCWXF.css': {size: 83063, hash: 'jOfJJY5zThw', text: () => import('./assets-chunks/styles-2TPOCWXF_css.mjs').then(m => m.default)}
  },
};
