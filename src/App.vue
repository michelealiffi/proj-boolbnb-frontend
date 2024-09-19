<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
// //import { library } from '@fortawesome/fontawesome-svg-core'

// //import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

// //library.add(faUserSecret)

import { store } from './store';

import axios from 'axios';

export default {
  data(){
    return{
      store
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    getAvailableServices(){
      axios.get(this.store.api.url + this.store.api.endpoints.services)
      .then(response => {
        if(response.data.status === 'ok'){
          this.store.available_services = response.data.services;
        }
      }).catch(error => {
        console.error('Errore nella chiamata API:', error);
      })
    }
  },
  mounted(){
    // se non ci sono servizi salvati li richiedo
    if (this.store.available_services.length === 0){
      this.getAvailableServices()
    }
  }
}
</script>

<template>
<!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
<AppHeader></AppHeader>
<router-view/>
<AppFooter></AppFooter>
</template>
