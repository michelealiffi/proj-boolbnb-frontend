<script>
import { store } from '../store';

import 'swiper/swiper-bundle.css'; // Importa lo stile di Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
  
export default {
  name: "Service",
  components: {
    Swiper,
    SwiperSlide,
  },
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
<swiper-container
  :slides-per-view="3"
  :space-between="spaceBetween"
  :centered-slides="true"
  :navigation="true"
  :pagination="{
  hideOnClick: true
  }"
  :breakpoints="{
    768: {
      slidesPerView: 3,
    },
  }"
>
  <!-- Cicla attraverso i servizi recuperati dal DB -->
  <swiper-slide v-for="(service, index) in store.available_services" :key="index" class="text-center">
    <!-- Icona dinamica e nome del servizio -->
      <div class="rounded-2 border p-2 me-2 button-service" :class="{'active': isActiveService(service.id)}" 
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
  </swiper-slide>

  <!-- Navigazione -->
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</swiper-container>
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