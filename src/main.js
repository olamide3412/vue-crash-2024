import './assets/main.css';
import 'primeicons/primeicons.css';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// const app =  createApp(App);
// const pinia = createPinia();
// pinia.use(({store}) => store.router = markRaw(router));

// app.use(pinia);
// app.use(router);
// app.use(Toast);

// // 🚀 Lazy load auth
// const auth = useAuthStore();
// await auth.loadAuth();  // <-- load user from token on app mount

// app.mount('#app');

(async () => {
    const app =  createApp(App);
    const pinia = createPinia();

    pinia.use(({store}) => store.router = markRaw(router));
    pinia.use(piniaPluginPersistedstate);

    app.use(pinia);
    app.use(router);
    app.use(Toast);

    // 🚀 Lazy load auth
    const auth = useAuthStore();
    await auth.loadAuth();  // <-- load user from token on app mount

    app.mount('#app');
  })();
  