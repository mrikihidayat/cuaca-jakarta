import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

// 👇 BARIS BARU: Import defineCustomElements dari PWA Elements (DIHAPUS KOMENTARNYA)
import { defineCustomElements } from '@ionic/pwa-elements/loader'; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

// ... (CSS imports lainnya)

/* Theme variables */
import './theme/variables.css';

// 👇 BARIS BARU: Panggil defineCustomElements sebelum createApp()
// Memberi tahu TypeScript bahwa modul ini ada.
declare module '@ionic/pwa-elements/loader' {
  export function defineCustomElements(win: any, opts?: any): void;
}

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});