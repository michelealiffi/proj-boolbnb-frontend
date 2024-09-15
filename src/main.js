import { createApp } from 'vue';

//import style
import './assets/scss/main.scss';

//import bootstrap
import '../node_modules/bootstrap';

//import font-awesome
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


//import router
import { router } from './router';

//import vue root component
import App from './App.vue';

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
