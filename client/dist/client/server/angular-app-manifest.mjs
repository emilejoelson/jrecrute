
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
    'index.csr.html': {size: 9290, hash: '2f0651f6b90835f1fa0b2f614de9f8a576284da089cbb39c99821ccc85e5bd3b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: '3c5dda67e52bdbb2d2e127fe3c29622de749443013a430021420e171b94983bb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31794, hash: '8d15109a548da85bcd051feecccf1338e90db3c97862fc09901647aa54af12c6', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60994, hash: '447296d561727bb2bd1ce33ec3e213818fff721183a83ceccf90f42b583b88c9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33773, hash: 'b5f050740b2b3b546c84b90ff9b8159137dae3730bb6695e8378383fadd4b408', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
