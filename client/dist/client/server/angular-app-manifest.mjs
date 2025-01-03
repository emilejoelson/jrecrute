
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
    'index.csr.html': {size: 9290, hash: '593413eb849a4072c765997c537e1370173920ff5663dfcd61a75d9a570306e5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: '82e446a0f5e8a274911055fa8f83d0812dc9f8541251f517c02448109bb9b32f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31794, hash: '714a70bc111912ce42f0b7e86887b63a127f75850a6050e4fe309ee55487616c', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60994, hash: 'fed6962c63bc89bdcc481c7d11d7372c2a4217b68a83a8fe6f89ac5a4f110e70', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33773, hash: '57bdbe794a25be4f91359763138db1f5b8850e15be2ff527dcddff63a1f86896', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
