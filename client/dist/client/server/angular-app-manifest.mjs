
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
    'index.csr.html': {size: 13961, hash: '1f5c2f36a61f8008d8ab866638b869f7be54c648212a0db8b9430a9cdd6034df', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11893, hash: '7999794667aa37e0f2a172f522b8a0a85cb33ede1c552b904acebdde769230d6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76230, hash: 'f1c0ee237c4943b0a537766132f005d90a010e8234a6a483fbb915a031765aaa', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 45364, hash: '8963860531d1510fca4daa43d1e5ed2ad20af8ee9aae4f165d9ac3e433879b9a', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 71774, hash: 'dedee9fa654f9761181b8a146da8381cb7f2ae1e9a1f98cf3341c1f792280015', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41721, hash: 'a7a37d811ec2342f72897873fa923aeed58425a9eef106a458aa69ad325c9619', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41274, hash: '8d16d419ef8844b8eb54fdeb46a7b5764a7c4e32d9f858d4ff47983f6572e380', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 39933, hash: 'ecef88574cadae2a0ec0f40171fccb2aee854719dd6bfaa9627e04dc4cc0b2bc', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 39970, hash: 'c86d44911a1f75353756e9f2b0f237ed4660afa9d010796fa338430e41a787af', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-QNRC4PXG.css': {size: 92044, hash: 'oMUs1ot0QDw', text: () => import('./assets-chunks/styles-QNRC4PXG_css.mjs').then(m => m.default)}
  },
};
