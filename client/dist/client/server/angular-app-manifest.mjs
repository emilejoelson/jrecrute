
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
    'index.csr.html': {size: 9545, hash: 'a0a47354af84e55e73f88f64b5406b3050a812369cbf793b1edecbbca2f5fb90', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7900, hash: '4ecdf02c253dfb55ccd1294d2dc8ccc26cb37462503f5abe1deaaf181c7a2d7a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 65666, hash: '41fdf455ba0e08f1d6b9bad2547f36d390d3fb86186053e61a883b87535d80e6', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 39696, hash: '0f4657f912f4a4b049ec1883bf24ba37b8da579d2f5ad525c428c24ee415b0d5', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'index.html': {size: 69847, hash: '10b50e8642c760f47f195d50e2abcfdcb0c60d334533f5d5c5abb6269853dc98', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 35606, hash: '4ab2200f91494402023f318e572370db27c24a6a7823cd6be4e8eabbeba2975c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 36011, hash: 'a18f90088d2bf9ed609d27c268b3b4174a1e01737cc818a5d720e6971eb596b0', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 34302, hash: 'a543e94c9ba06ac55e38fec5f74e4fa18f9973925b975bb24006660a32c99844', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 34265, hash: '9291993132b8637666df5a5335592eb642f89c4aa067829554333dc0b479b586', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-6BC2YUN7.css': {size: 91274, hash: 'GEyqZGI/BYI', text: () => import('./assets-chunks/styles-6BC2YUN7_css.mjs').then(m => m.default)}
  },
};
