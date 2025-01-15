
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
    'index.csr.html': {size: 14196, hash: 'aa8fd29517c71df380639f63123879e8c91d44efc856ba5f02f8eba45fc561a5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12128, hash: '67d7fb5ecad9d4a28f532f10810fa993ec67f1a8e6d0ac5a7ede3018f666e2e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 76487, hash: 'd39d471ca35beb5400a4030749fbe6bde568f40cf25548805d4c4177b2957965', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 41956, hash: '85ce987ff5b038359c62e69fc3aec7e96e823041afd59076d5213664c5af5ebd', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77113, hash: 'abcc610929343459ab72da2566ddc6211dde11ba1274aa3ef3626fa13efa04b5', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41509, hash: '4493c81f7b8fe27ea7c3448b8315c52557a6314ea2500e33c40c72e635f3a448', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 54643, hash: '0a0d1d020ad7aa8c382092f478d375e3b6723e1c4cd0ffea26d02d553eb44537', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40205, hash: '7fa1ff8c47873c5ad54b618a2349310514b370def0c3fb3777c2f27ca3a023c8', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40168, hash: '823164777771dd1e64ff0036e02ae1aa6e7b9db074a313d247f7489493ca4719', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-LJ4PLVSV.css': {size: 94666, hash: 'qQzI5MrxyQA', text: () => import('./assets-chunks/styles-LJ4PLVSV_css.mjs').then(m => m.default)}
  },
};
