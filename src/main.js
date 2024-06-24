import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar'; // Mengimpor Quasar dari paket yang benar

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const pinia = createPinia();

const app = createApp(App);

// Gunakan Quasar di dalam aplikasi Vue
app.use(Quasar, {
  plugins: {}, // Tambahkan plugin Quasar yang diperlukan di sini
});

app.use(pinia);
app.use(router);

app.mount('#app');
