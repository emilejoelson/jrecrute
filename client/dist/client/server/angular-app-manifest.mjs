
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
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9392, hash: '42cbb8c495f4ed8e1ef307553f59d99e3b5ed922506661ae378be3fd5b32f2b5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7747, hash: 'bf40ae4a49043a723355f44d483a429c5c51e74e6db7b9e19aba9f2addf70b7b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33274, hash: '4b9f7de79d6e4babd66d5fb9a784a8c72dc82b1c2ee76ed650420265b02304c8', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37528, hash: 'e506e93e0388b83a534c387863b65560c594e111aca66055ec40644c92ce5907', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31929, hash: 'a670e9c8052246041fe8e357f0308e5538525bd487b5c3f349ec6e35a3e7a84e', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61107, hash: 'ce36fee0a4607472dc9e4ee8e800c12868198e62500cbbc1c29bcb031990e8a2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33908, hash: '9eee5799ee6c085a0ce8c8ef0dfedade050a51b5307d96a60e3b0b897b381362', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-BEPBCHFU.css': {size: 85930, hash: 'jYRCYcIqj4Q', text: () => import('./assets-chunks/styles-BEPBCHFU_css.mjs').then(m => m.default)}
  },
};
