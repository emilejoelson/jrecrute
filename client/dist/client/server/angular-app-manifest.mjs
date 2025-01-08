
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
    "route": "/client"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv"
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
  }
],
  assets: {
    'index.csr.html': {size: 9392, hash: 'b442ee91203ad81e245ae5c78103ee2c0017f3dd823fc19c886a3a5bb59c1af0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7747, hash: 'dfa88141ab4aebdccb321dc524afcb1b88f59d1db7a1d3411b307ccf73c4f239', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 45109, hash: '389e369edbfaf86ea31527d1c313e378b6c7afeb262a38634ff4232f130f4ec1', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33585, hash: '36f1a545fec603abec0bc0d920c850c3e8d081efde85464cff3385f8f860bb92', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37414, hash: 'ec22efb4390a20d160536b578f90205615be01e276bf3cfe323554b85a1b07a7', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33034, hash: '8b870edad0b4ab84ec45dac2e5d988c13bd6275ced4f90cf36d2ba5535a9d4d1', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31771, hash: '3d22bb7c006f1b0661290ee597907781622a9e07393a4e759d6f677aae28f85e', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 65329, hash: 'e03c89ca560b1f4cc2aec6ef19dbf282869709e93ea7afa399524d80673908de', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QZWBPWGY.css': {size: 88375, hash: 'CagzNPIGM40', text: () => import('./assets-chunks/styles-QZWBPWGY_css.mjs').then(m => m.default)}
  },
};
