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
};
</script>

<template>
    <div class="swiper-container my-4">
        <swiper
          :slides-per-view="3"
          :space-between="30"
          navigation
          pagination
        >
          <!-- Cicla attraverso i servizi recuperati dal DB -->
          <swiper-slide v-for="(service, index) in store.available_services" :key="index" class="text-center">
            <!-- Icona dinamica e nome del servizio -->
            <i :class="service.icon_name"></i>
            {{ service.name }}
          </swiper-slide>
  
        <!-- Navigazione -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </swiper>
    </div>
  </template>
  
  <style scoped>
  /* Personalizza la visualizzazione delle slide */
  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  </style>