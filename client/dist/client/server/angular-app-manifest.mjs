
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
    'index.csr.html': {size: 14196, hash: '4654f10579fc10f97b649ecb11f635b72ef83d46336967c46a76f6d0531e6808', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: '6d62343cef0a938be2625459ef5cbd9b870db5e428f537841da96074675fae03', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 79249, hash: '7bee9044dbeb26ba651eec097aaebcd928901dbf9ded7996bd9d6706bbc2d8ee', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77420, hash: '3cb3c22a62bb9d3ebd17b20bc3214d5a0b1adfab35f3d2790bfd6ae9a4e00985', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 42263, hash: '458d2c3cf5b292f160020750bb0e91341a2e8e8ac2c4dca4823fe3949d19bb0d', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 40799, hash: '7e6235b2832b2e6d4b7ae2311342975d9c9a4c0428ff3499e373a6e776420b65', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'condition-general-de-vente/index.html': {size: 50287, hash: '56325d64bd1572b75a92b16051b3a9fbbd20e068a0d6147162c39deb7f913a70', text: () => import('./assets-chunks/condition-general-de-vente_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41816, hash: '35cd0943c0a406dc2b7c1b832f9933ac385dcb4b442527149b61378ab7b16a8c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40475, hash: '388ad63ad2432d298efe87c14e21d1792ed2708ec654f1067ba8acbc489b4b57', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40512, hash: '2cb6c3b6de7b51ab6981474e259004a8d5de7dd3e604da1a7ee7bd98587a165d', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-7PZJBGVF.css': {size: 99307, hash: 'u5fYW6OhWRs', text: () => import('./assets-chunks/styles-7PZJBGVF_css.mjs').then(m => m.default)}
  },
};
