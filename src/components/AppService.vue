<script>
import { store } from '../store';
  
export default {
  name: "Service",
  data() {
    return {
          store
    };
  },
  methods: {
    toggleService(service_id){
            const id_position = this.store.search.services.indexOf(service_id)
            if (id_position !== -1){
                // se il servizio era già selezionato lo rimuovo
                this.store.search.services.splice(id_position, 1)
            } else {
                // se il servizio non era selezionato lo inserisco
                this.store.search.services.push(service_id)
            }
        },
        isActiveService(id){
            return this.store.search.services.indexOf(id) !== -1;
        }
  },
};
</script>

<template>
<div class="container">
        <div class="rounded-2 border p-2 m-2 button-service col-6" :class="{'active': isActiveService(service.id)}" 
        @click="toggleService(service.id)">
            <b v-if="isActiveService(service.id)">
                <i :class="service.icon_name"></i>
                {{service.name}}
            </b>
            <span v-else>
                <i :class="service.icon_name"></i>
                {{service.name}}
            </span>
        </div>
</div>
</template>
  
<style lang="scss"scoped>
 @use '../assets/scss/partials/_variables.scss' as *;
  
.button-service {
      border-color: $brand-color-boolbnb;
      color: $brand-color-boolbnb;
      text-decoration: none;
      transition-duration: 0.4s;
      cursor: pointer;
}
  
.button-service:hover {
      background-color: $brand-color-boolbnb;
      color: white;
}
  
.button-service.active {
      background-color: $brand-color-boolbnb;
      color: white;
}
</style>