import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
// import Toast from 'primevue/toast';

// import 'primevue/resources/themes/saga-green/theme.css'; // theme
// import 'primevue/resources/primevue.min.css'; // core css
// import 'primeicons/primeicons.css'; // icons

// // PrimeFlex
// import 'primeflex/primeflex.css';
import '@/plugins/primevue';
import posts from '@/localdata/localData';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Dialog', Dialog);

app.provide('localPosts', posts);

app.mount('#app');
// createApp(App).use(router).use(PrimeVue).mount('#app');
