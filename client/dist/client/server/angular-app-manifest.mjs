
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
    'index.csr.html': {size: 9392, hash: '19d7e3f8ac737d7c70eb25a4f0c4d4130d34a5cf8aa508fa060356c63b4699df', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7747, hash: '4a985f2a28de5211e1502c2254e5940e26d31545294a3a30f69eab97214727d5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 36797, hash: '6e6f7a5e75fccc986a88c7e4a254be5eeb70bbe75767d246555a949ac59494c7', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 32415, hash: '2e9d844a979a9e3139e2780e72e2b465eb00d2bcd84c0fce98b0e331a042b574', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31154, hash: 'ccd04ce1e487d6358278aa07eb3dcff299c7eb9d7ed1cdf69d2882d54cc2a751', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 62827, hash: '2e6de1856ba49b631b240abba0867fb8a58abde94986323526615a6990ecbb83', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 32954, hash: 'e77e3b6d3fdc6f9cd7f6ad9f65f5d0a595267dbcbd482cb096e9884360f46187', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-22B5N3H2.css': {size: 85413, hash: '6HZfGLUNpSk', text: () => import('./assets-chunks/styles-22B5N3H2_css.mjs').then(m => m.default)}
  },
};
