
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
    'index.csr.html': {size: 9392, hash: '25eea74715b6c30e9ff626a367988ef950558438d60c01988c41b5f2a60a6554', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7747, hash: '372c9b9d2846939f381aedba3fb1c09fae0efcc8033ef6ded8bb0b05f16022fe', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 32955, hash: '3cbfcd3035085ccae2c8673320802d1a45061efc7b0e001b6d9c5df3676deb8b', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'index.html': {size: 62892, hash: '60aef48aceb74fbceadf3e9b11695e5640c67162097440f69d6ca08109cc597c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 32419, hash: '95b2d8abbb05edfd8877efb98f94446a4eefcfb94c9af908fb147034353f6a07', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 31158, hash: '08f3e52566b9167797518b1845db50ab90d4466ba6413730ab42dd19b9657484', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 36797, hash: '99765c937547163fe7aab1098c478c9ecba944ee3bdbf1b1c3db6938715794ad', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'styles-KNKXQ5SN.css': {size: 85495, hash: 'XICR+meFxwk', text: () => import('./assets-chunks/styles-KNKXQ5SN_css.mjs').then(m => m.default)}
  },
};
