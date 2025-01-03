
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
    "route": "/attente-de-reponse"
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
    'index.csr.html': {size: 9341, hash: 'f2148834965d58ec7a1c1fde999c2b6d054c5c10b0f6e3b60b1381a7685b2493', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7696, hash: '267410ac5fd79a22d98cff0870494264794bdca2eeabe207daea8ffd9b3b16a1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33190, hash: '5fd057d3c2145b2fb5b94026996e8de0e5b10a913c3ed20ca20fcdf2bc64114c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61045, hash: '5d06e7ce78d6c3a01d2c46638c7fa5a7edcf80fe29cb10dc1b6382c9975129a9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33824, hash: '458242cbe30c054aac731149b864a11cd80659171d1358faec5196aa5771f6b6', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31845, hash: '1d89c3bb97dbbcee2f37ebc82a7857a9ba1b8acd78f6bdc1bb770bd55ad91569', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
