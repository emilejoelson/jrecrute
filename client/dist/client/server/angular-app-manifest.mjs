
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
    "route": "/condition-general-de-vente"
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
    'index.csr.html': {size: 14247, hash: 'be1a2f81a16b5ff58322ee1b310c559e74847238d9820699b0c3098aef652834', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12179, hash: 'd2b16b725d4301e690951d87a9fa6d93016d5308ba7d8c184d550b9b45c3a61d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 79300, hash: '68fed8f23e1a070a45507147ed003dbe183039f89b1b2a95af4f4cd94c1ead74', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 77471, hash: '0e92b369bfe7fe2ba8f218e68b2e1f71a4a2341ee267277070165bb32d68d6e2', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 40850, hash: 'b40a8e5c54b49b6fc57dda7fcaa1f6ac5091cd1f1674552172963a6f5f63a4f1', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'condition-general-de-vente/index.html': {size: 50338, hash: 'f9dcb594531f3bcc3ec0884499631699d397b153fe1005ff81570342d2cbbd8b', text: () => import('./assets-chunks/condition-general-de-vente_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 41867, hash: '2967138a53041a0fc032de78cf30c5d4cbef397e1f5c4942a38c013bae0a7a16', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 40563, hash: '4f80f34abd069ddcbaf9d98402c023b5a33e90190cea74c3566a75e6cfdc5ee6', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 40526, hash: '036a426b6f061ffcd3c01758ec2a68cafcba823387f635dcf8917caa2b15b021', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 42314, hash: '852633825fb75629326525c4a7946af9127b761539e44f539ea5d3be5cdab487', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'styles-7PZJBGVF.css': {size: 99307, hash: 'u5fYW6OhWRs', text: () => import('./assets-chunks/styles-7PZJBGVF_css.mjs').then(m => m.default)}
  },
};
