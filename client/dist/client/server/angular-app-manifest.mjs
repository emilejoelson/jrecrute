
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
    'index.csr.html': {size: 13961, hash: '7876da9c01bbb2836d98226e1197bb6f60de7b28888ffc55d6b5c6f35883c650', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 11893, hash: '0191c2b78786760dd4df80c1a36bbfa085fab740ca861230fda7e9971168befa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 73523, hash: '5467b27471b9de0f3ba25563ab2ae581092a34b8bbb19fbf9370c2f1f5204ff7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 69342, hash: '90365e93e7c7211bcd67f026ccb326cc8f5a279d406c1a60a462e966376be608', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 39686, hash: 'c80eda38ae9b92515dd7c9fb71a5dc966721dc4224167cce260bedea535a23da', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 43371, hash: 'dcd552c4d0406d3a9b230ed7feb4196ac9dd7c986cd618af2412369a899fe675', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 39281, hash: '3fadca1e96a2c83bed92a2409532f2e2115283f5b3fdae4afeddae7272e1b515', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 37977, hash: 'f3fb9e706d2f21659d30341fb93b8972fa1355e2cf1f63b92507742c3e209479', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 37940, hash: '35d40067e351c40d79979ec0962a1e2cd6466fe7812f2571e48020531bf9b64e', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-CBNVIQWI.css': {size: 91985, hash: 'QqpJyg3YWzI', text: () => import('./assets-chunks/styles-CBNVIQWI_css.mjs').then(m => m.default)}
  },
};
