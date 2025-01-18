
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
    "route": "/condition-general-de-vente"
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
    'index.csr.html': {size: 14196, hash: '524965e978f553a10c85514834ede6a181ec33f8e249932bf57e764e45778e86', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: 'a1b36c0d382d9b0d7c9edc963e839a197aad9039d541dd8ddfa5aa0cc702d3f6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 79249, hash: '1444fbb65fcf9e48681509223a65dea22ee771fda6b4ab89ea2146ac64194294', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77420, hash: '0ef3be0f87a6fa247bb5416c0ce9814342e48e2ac8644826038bab1dff6b1bec', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 40799, hash: '8c395acd73f9121f34c0138d7101749e5f0ef6dd0cb15a04119e8284a0dac7c9', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'condition-general-de-vente/index.html': {size: 50304, hash: 'b92509007ce6827968b2a987265ba42777b55b6a8a9700e06577608531882cb2', text: () => import('./assets-chunks/condition-general-de-vente_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41816, hash: '914db23ad24ec993fd2eb7ce60d6ef4e20f67357f9d569151ad564098b3cacf6', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40475, hash: '1fbfc7181e4524a97a861db3ed8ed5b315364c2f37ca3194ed8431dd64904eb9', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40512, hash: '78f9c59326612071d522de97839a9d1d9bc91e15ec4339dae4649c2e761ce178', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 42263, hash: '425cb1c289ba696b91f168648ee79cc5349f2e66d9cec1bd68892cbe756fda5d', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-7PZJBGVF.css': {size: 99307, hash: 'u5fYW6OhWRs', text: () => import('./assets-chunks/styles-7PZJBGVF_css.mjs').then(m => m.default)}
  },
};
