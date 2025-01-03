
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
    'index.csr.html': {size: 9290, hash: '81d4145a9a5f3239b8393ee721ffb6e0a664f073d8dfa55f0618675ea73af67f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: 'f2fd1c8998d28d4cf32d27c3115f9e61cfdd5bd7b567a1f58c53d130079e6951', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31794, hash: '7ad92acd0486feeec84b4768df5987e265294b86f3297842dac3cea63d22c659', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33773, hash: '5dd35cae950d1ad6ebc0eb106ef11b8f1d389088a28b5120e25b23b932769fd4', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60994, hash: 'b27f2db88669692d5273e698d99a2c2e6feee4c64688c0b76b4c1f1a857ebcaa', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
