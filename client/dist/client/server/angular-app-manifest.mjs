
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
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9341, hash: '972d5beccfc5b00aa2b725ce6925fc99fff20866c2daacc4c907b173de7a58cc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7696, hash: '30919c28d3140fa5eb4aa8eb65f3ca6c32ed0c95e186a06ac9cd5e4e16233bce', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37477, hash: '3a83d07d3712c5f342349441819b8cb265a927d3c2c0d2eab67709859794f224', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61078, hash: '571f82928b8071a0365cdad46a4d9216fa127fb9b3a6c0b2d13110d69b0b04c2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33223, hash: '489460317c6454bba28886763dd8caa329cf33919394d164af2def49d846efc5', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31878, hash: '323585263b73e0e3b9bead673cb1695127b0282879ea8a8fac9287474f01ceb7', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33864, hash: '913c304baaf3b16a708c654b9b9e74730c97ee426fea4b4c2d19c9ac4f97b866', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-WPQOM5WO.css': {size: 85433, hash: 'BiyI2acOi4g', text: () => import('./assets-chunks/styles-WPQOM5WO_css.mjs').then(m => m.default)}
  },
};
