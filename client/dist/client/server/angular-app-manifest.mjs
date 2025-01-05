
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
    'index.csr.html': {size: 9341, hash: '0bcfc90f68beecb2cbf47032d08ab90c3c0df2e7ea02e992f41982a1bcbe3351', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7696, hash: 'df8462c65a14d9d041da3749dd5d65848ff78bf835ce92098cb3662a6d8cd117', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31845, hash: '2f06c91c44c9d17871c3e0a9d25f55b5f400cc08e166edca6ced1c3ef71f1485', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33190, hash: '95efdecb691126fbb1bb45c3046be00a82ff51b4d5d6296ef80e80197de10286', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61045, hash: '98003b4e47504e6695b9c42aa2a3ff3b4f256406f896d87866d6a2f27713f622', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33824, hash: '986f2816dc8a81bb1f0bfdef4c05ff980e871893da4bda50ca88591ad00a18c6', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-O3BS3FP7.css': {size: 85091, hash: 'kBNIJbbDUhA', text: () => import('./assets-chunks/styles-O3BS3FP7_css.mjs').then(m => m.default)}
  },
};
