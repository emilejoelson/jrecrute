
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
    'index.csr.html': {size: 9443, hash: 'cad260e8de353477411622deb33709639cfad2824811e57b6dec59d732c7f22a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7798, hash: 'e30e36e33713c5aa014e7b6f941ff251500755bfaf2119613305506ed2256839', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 66889, hash: '561c1425e84f6f462885b3928b6b22d4937619c40109183f906e227ac16f3086', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37486, hash: '64025791ade6b693976c2d4483113f86f6eae4bde5a764373ce1b7ceb6e6dfe0', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33104, hash: 'c097132b1da49218d7dcc7e6fd8cc0b59fc1e646ec3ffadc2b3daaf702f3b67c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 51461, hash: '6036fcef14fcf5bb71e472dcf284d2a533830752fc93fd9fd19cbbca26da30e7', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31843, hash: '17c4c9510bd6d89cab84b1c1bb7e2eeb9fab00ecfdc1f7ccb2220ceb0711fdf1', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33655, hash: 'bedc2c45995141f90aed4ca269d9750ddb909c450118203b7b59a0149aa78ded', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-Y2MQ26VG.css': {size: 90461, hash: 'n4k9ETOfSbo', text: () => import('./assets-chunks/styles-Y2MQ26VG_css.mjs').then(m => m.default)}
  },
};
