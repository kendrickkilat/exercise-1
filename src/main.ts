import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import SideBar from 'primevue/sidebar';

import 'primevue/resources/themes/saga-green/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

// PrimeFlex
import 'primeflex/primeflex.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('TextArea', Textarea);
app.component('Toast', Toast);
app.component('SideBar', SideBar);

app.mount('#app');
// createApp(App).use(router).use(PrimeVue).mount('#app');
