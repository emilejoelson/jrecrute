
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
    "route": "/attente-de-reponse"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv-avec-succes"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9674, hash: '1b5fcda8585c864204f29a6322a858323da4c3daf44517e3d8b8684d1ae49085', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 8030, hash: '10ccae78792aed26eb29fa4606c4a69610b5e8a21d5aaf2fd0ee95d18cdc7d75', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 61378, hash: '81f7c6bb7895d5dd7fd54f98a33ddcc5ba53baf4fd8ee79b8b8ead2eadcaac41', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33523, hash: '5b2d7fd222156e7b98892d572b117b8ab5a86e060b34d30dc6461a49fc58da2c', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 32178, hash: '184cc0f862bed5033828d3de0fafe3917c941dd898d1fbe5c7adb7b0e8a91651', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 34164, hash: '25fdf8bedfdde26c1e71847d54ee30ffe0e81db69bf1c8ac4bab9d5208d04b4f', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-2EAGLGPP.css': {size: 81924, hash: '9iMF757PQIk', text: () => import('./assets-chunks/styles-2EAGLGPP_css.mjs').then(m => m.default)}
  },
};
