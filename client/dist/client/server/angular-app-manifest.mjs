
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
    'index.csr.html': {size: 9545, hash: '765c17eb5e10cdb6601f3932d7683865a326e4a574de6d8fb4fd5ff18ee53bf7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7900, hash: '216200f684c1745168ac87ad63279271989d2a971e84356e14acc62961e8d624', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'client/index.html': {size: 63619, hash: 'de5edf5ac05e70ecce65877c86c84cdb190d0d9c0b80edb5f54f3d089c9087e5', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'deposer-un-cv/index.html': {size: 33996, hash: 'f0a582b1fa122afb0abeed32251ea387d9adb1dff69fce45ae8e3ebd338dc753', text: () => import('./assets-chunks/deposer-un-cv_index_html.mjs').then(m => m.default)},
    'mention-legal/index.html': {size: 37965, hash: '3d83b5f6669db2d6981ce0f878f178920fefa55050bce7f1e6015fd1483cbbcc', text: () => import('./assets-chunks/mention-legal_index_html.mjs').then(m => m.default)},
    'index.html': {size: 67832, hash: 'c44de9a85ca9a5f6a24641fff0edf52ded9d4e09a9d2c64a5f8b28688314d98f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'deposer-un-cv-avec-succes/index.html': {size: 32313, hash: 'b8fb21467f8c766f7d2621b3484caa1bf43ef1bccc87ee4555ecdaff2c6cec1a', text: () => import('./assets-chunks/deposer-un-cv-avec-succes_index_html.mjs').then(m => m.default)},
    'fiche-de-poste-remplie-avec-succes/index.html': {size: 32350, hash: 'c35d67fd2942052d0a60d95c3f0b7bca365d40050a4331669c3df6e72e06daeb', text: () => import('./assets-chunks/fiche-de-poste-remplie-avec-succes_index_html.mjs').then(m => m.default)},
    'attente-de-reponse/index.html': {size: 33654, hash: 'e2130f3b04d1232ba5c5a8e16a989ccb50eb72e07caaa005e4c7808d1e0b1dcf', text: () => import('./assets-chunks/attente-de-reponse_index_html.mjs').then(m => m.default)},
    'styles-6BC2YUN7.css': {size: 91274, hash: 'GEyqZGI/BYI', text: () => import('./assets-chunks/styles-6BC2YUN7_css.mjs').then(m => m.default)}
  },
};
