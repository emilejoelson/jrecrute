
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
    'index.csr.html': {size: 9443, hash: 'cb1782a5c6d16836c140557b6b68ae1b3b9d1bf6bf86fa093c3ca812ed6ce7b4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7798, hash: 'bc02f5c885cf26f1eb714779c5ef0d45cdfba6136bdf0c76765dd0e90d05c922', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 51461, hash: 'b7ae835e4bca87f973a74fc46058319e921a53dac0b771340a197ea11e7e31c6', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33655, hash: '9a5198e155a0087a2d426fa550e0a847b5e124a5f62c58f90b84e396d9502c2a', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 66868, hash: '4ed0cc8ce3a94b649fb044cf05441fcb32e813f09a7b47f71c531f3e8c01b1cb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33104, hash: '723018314f6697a0e20a828a515a3eb757f269cc19472b4da641ef4f5e247582', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37486, hash: 'a2a9b807c1439dba73809d4b07070d73e852123ed5a3b1cc70a8a947dc1f4644', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31843, hash: 'b3b4a854b2386805653aad9f454d2719b10bf646458f840f9fc77c6dbe7acd47', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-EDUSYTBE.css': {size: 90416, hash: 'Af32WouqCho', text: () => import('./assets-chunks/styles-EDUSYTBE_css.mjs').then(m => m.default)}
  },
};
