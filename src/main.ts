import { createApp } from 'vue';
import primevue from '@/plugins/primevue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(primevue);
app.use(router);

app.mount('#app');
// createApp(App).use(router).use(PrimeVue).mount('#app');
