
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
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9290, hash: '41ba42ae008527fdb71657665d250aaaffdfdd372ce2810d621eac121c56e007', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: '135e00ff776a8162f95cd8e9cb44eef08f5392d4c480c7417a01f721f03447e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33784, hash: '67538b5e0a68a7c246ddc816f8f6ecaade88a9eba13aa6bb42b805eb4ffb168e', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61017, hash: 'b89b765322558de1ff8100e2ab193dbd53bd677f75cd76b3ce2bc48c102a4279', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2TPOCWXF.css': {size: 83063, hash: 'jOfJJY5zThw', text: () => import('./assets-chunks/styles-2TPOCWXF_css.mjs').then(m => m.default)}
  },
};
