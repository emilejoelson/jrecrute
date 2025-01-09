
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
    'index.csr.html': {size: 9443, hash: '022ccf42c372c88bc241c43775d959fad6b0527ea45bb293ec0d0233c25b3550', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7798, hash: 'c1923f3d6f42d254f0f2545ad0acf117d1188614deb8dff868fdfe9a890377f2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 67716, hash: '86f039bdb26b8acdc6f4b3ac5e97e4b684bd97ff16e55e6a801c6dedbf05ff25', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37850, hash: '5fc02010ec32d2be013b0254e65687ed880729338759c4c8b0b1ec0099cdc6a0', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33894, hash: 'a402af4c98a94ef1c7763f373b6eff9c108b8c77de4c01f7c43ed61b813412fb', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 51974, hash: 'a12db7f49b3c08bf9709c7e08161839252b5614a6a5e63da31e67dc2228916ef', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33552, hash: '59362cb1486c8ff307b46300ba16bfc62b3eb0e183afeacd4032e6ef3d07f018', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 32207, hash: '4af534f74c4c77d1fb97ab2075e82c51825a1c7094e160ca74dce089c1094576', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'styles-UUQAUWC4.css': {size: 89987, hash: 'irE0VvHo7zc', text: () => import('./assets-chunks/styles-UUQAUWC4_css.mjs').then(m => m.default)}
  },
};
