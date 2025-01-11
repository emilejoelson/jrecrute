
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
    'index.csr.html': {size: 13961, hash: '4c085d346fef5bdabcb5ae73430729b7ee117b050da5a7c52d6ac43b2221e68a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11893, hash: 'bf8f604c3d8a84a60b778e5d655e0ede44139d2121f0f9c80653cdcb3edd2fa6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76180, hash: '4e7a5ddbd8ca7fd91ddbe870bbdb2463d4c1b110607f2e91ec46256c0792a996', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 71724, hash: 'ff30547e309ee626785f994c2a675b0c1131f97492abfebe7a1399424964cc4f', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41671, hash: '93ffef673992858f297a3c7ffb38be59a1cba3d605a48f3867961a812f5db43f', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 45314, hash: 'fc1fdf257fbab192b6fecbbd8ed3f2b18d2087cb85a7919f4ad34778c7baaedf', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41224, hash: '7fa3d4f55d601cd929f27b4140d6a3a259693d9873d21b445e88c438b213ba12', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 39883, hash: '0ef8df5eef543cabbfd46a00fe8afab0c2272ddb280263543e19b20dc1fcc37d', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 39920, hash: '2e00fbd1e33a34b633453db7d4e6fb0a53c3218721c109edda4aff5e03a6af6e', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-QNRC4PXG.css': {size: 92044, hash: 'oMUs1ot0QDw', text: () => import('./assets-chunks/styles-QNRC4PXG_css.mjs').then(m => m.default)}
  },
};
