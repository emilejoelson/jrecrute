
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
    'index.csr.html': {size: 9341, hash: '7691b1cfeb3ea3bf0e20c864f08fc75c9c935a3d191d810ab915e8c4713b9d7a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7696, hash: '057f5f3a27c72125ec2f882d75a2abe4eaeda2b1f1b660ab0aa86b73d68fa6eb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 32843, hash: '4d30119afa728b5c541aee74225b387bd6501f6793ca2ca0acaf053abaed7c66', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61045, hash: '4060092fd267c7a9b5353a1dbe83e0ddeb6eddfc3806976cace31d4aa2f50d96', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31845, hash: '5f2c46a9ff1e8755e7a86d56da82031f6ace3c03ba7a99b34ea2ca63a7f0823b', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33824, hash: '9fe41768eade7f61227a3f0ad757e6978b6146478aa3d7b114bd5e4a00fd8325', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
