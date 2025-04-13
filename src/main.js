import './assets/main.css';
import 'primeicons/primeicons.css';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const app =  createApp(App);
const pinia = createPinia();
pinia.use(({store}) => store.router = markRaw(router));

app.use(pinia);
app.use(router);
app.use(Toast);

app.mount('#app');
