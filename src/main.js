import { createApp } from 'vue';

import './styles.css';
import 'mosha-vue-toastify/dist/style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import VueCookies from 'vue-cookies';
import QrCodeVue from 'qrcode.vue';

import router from './router.js';
import api from './plugins/api.js';

import App from './App.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

const app = createApp(App);

app.use(router);
app.use(api);

app.provide('$cookies', VueCookies);

app.component('the-header', TheHeader);
app.component('the-footer', TheFooter);
app.component('qrcode-vue', QrCodeVue);
app.component('custom-loader', BounceLoader);

app.mount('#app');
