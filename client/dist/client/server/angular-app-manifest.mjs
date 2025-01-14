
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
  },
  {
    "renderMode": 2,
    "route": "/fiche-de-poste-remplie-avec-succes"
  }
],
  assets: {
    'index.csr.html': {size: 14196, hash: 'f4f5b2312b6d5a98b3b944048e5bca74c0ddc8d4036e74893290389b3d082e6f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: 'd069d3bb3473df6c00b7a8a69492b333401a90d6bb12cfbef9d22a5f821096ed', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77113, hash: 'eef03ecb95175731498ede8ad08fce8ca3fbf1d9d5f05c011cbd4f06a202ecd6', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 45599, hash: '40542449f5c268f735962068343d468d30d46571be48887427dcd5e3d94cc62c', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: '6862043dfb99cc22854a53db647b14a1254bc9067f23f1b5c4fc8fffd5649a2f', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 76467, hash: 'c3ad43e6cd5c2dc214d4a0426c0f05db89552890f84eaabcb5ffec5cc69adc36', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: 'df88f68ed55b6552f20abde346c79b871195d1e1f79a992db986b4cde3bbeb82', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: 'ee4b3ace00d228fdba026d351895bf13ba3b5f4927a76f1b18d3e278c6de5be3', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: 'd7d4230ba2d2d7f09b0ce6fb431cceb731ac28e749d2d2f150109ba02de1ae90', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-UDBXXYD2.css': {size: 92573, hash: 'YAP0z+zZec8', text: () => import('./assets-chunks/styles-UDBXXYD2_css.mjs').then(m => m.default)}
  },
};
