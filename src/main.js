import { createApp } from 'vue';

//import style
import './assets/scss/main.scss';

// Importa il CSS di Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Importa il bundle JavaScript di Bootstrap (inclusi i modali e altri plugin)
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


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
