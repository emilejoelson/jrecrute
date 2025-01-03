
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
    "route": "/deposer-un-cv-avec-succes"
  },
  {
    "renderMode": 2,
    "route": "/deposer-un-cv"
  }
],
  assets: {
    'index.csr.html': {size: 9290, hash: '5efe4c450d975fdc4aad5092f7eb419807fb9d9f3ca4353c253f9d42087ab2a0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7645, hash: 'fbd1e250e52ef86d7dee3a0d0b9ad98b5da9c3c11d2c4a8113f780f536009d84', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 32274, hash: 'd48eca80d5d5870232f20b7219f30d88411e7344d244d97ae8d05d0352771b93', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'index.html': {size: 60968, hash: 'ade5bee3c3231de0e69b916ab68de84a5286daf043d39608593d91acd12b2134', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33747, hash: '2a68ebe04cfbb1175328ff2852264249cd0bb7e8ab17ab15670a80cceccb3cba', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-VMKIA5M7.css': {size: 83083, hash: '45Dg4Wtn34E', text: () => import('./assets-chunks/styles-VMKIA5M7_css.mjs').then(m => m.default)}
  },
};
