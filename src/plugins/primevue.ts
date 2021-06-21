import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import 'primevue/resources/themes/saga-green/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

// PrimeFlex
import 'primeflex/primeflex.css';
import { App } from 'vue';

export default {
  install: (app:App):void => {
    app.use(PrimeVue);
    app.use(ToastService);

    app.component('Dialog', Dialog);
    app.component('Button', Button);
  },
};
