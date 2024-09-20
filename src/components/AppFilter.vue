<script>
import { library } from '@fortawesome/fontawesome-svg-core';

import { faSliders } from '@fortawesome/free-solid-svg-icons';

library.add( faSliders );

import { store } from '../store';

export default {
    name: 'Filter',
    data(){
        return {
            store,
            distance: 1,      
            squareMeters: 20,  
            rooms: 1,       
            beds: 1,      
            priceMin: 50,
            priceMax: 500
        }
    },
    methods: {
      // Assicurati che il prezzo massimo non sia inferiore al prezzo minimo
      updatePriceMax() {
        if (parseInt(this.store.search.priceMin) > parseInt(this.store.search.priceMax)) {
          this.store.search.priceMax = parseInt(this.store.search.priceMin);
        }
      },
      // Assicurati che il prezzo minimo non superi il prezzo massimo
      updatePriceMin() {
        if (parseInt(this.store.search.priceMax) < parseInt(this.store.search.priceMin)) {
          this.store.search.priceMin = parseInt(this.store.search.priceMax);
        }
      },
      resetPreviousData(){
        console.log(this.beds, this.store.search.beds);
        
        this.store.search.beds = this.beds;
        this.store.search.rooms = this.rooms;
        this.store.search.distance = this.distance;
        this.store.search.priceMin  = this.priceMin;
        this.store.search.priceMax = this.priceMax;
        this.store.search.squareMeters = this.squareMeters;
      }
    },
    mounted(){
      console.log(this.$refs.myModal);
      
      this.$refs.myModal.addEventListener('shown.bs.modal', (event) => {
          this.beds = this.store.search.beds;
          this.rooms = this.store.search.rooms;
          this.distance = this.store.search.distance;
          this.priceMin = this.store.search.priceMin;
          this.priceMax = this.store.search.priceMax;
          this.squareMeters = this.store.search.squareMeters;
      })  
    },
    emits:['sendSearch']

}
</script>

<template>
    <button class="btn btn1 btn-color-searchbar rounded-5 position-absolute end-0 top-0" type="button" data-bs-toggle="modal" data-bs-target="#modalFilter">
        <i>
            <font-awesome-icon icon="fa-solid fa-sliders" />
        </i>
    </button>

    <div class="modal fade" ref="myModal" id="modalFilter" tabindex="-1" aria-labelledby="modalFilterLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalFilterLabel">Filtri</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <!-- Prezzo -->
                <div class="mb-2">
                    <label for="price" class="form-label fw-bold">Fascia di prezzo (&euro;)</label>
                    <div>
                      <h4 class="d-inline">{{ store.search.priceMin }} &euro; - {{ store.search.priceMax }} &euro;</h4>
                    </div>
        
                    <!-- Slider prezzo minimo -->
                    <input type="range" class="form-range" min=10 max=1000 step="5" v-model="store.search.priceMin"
                      @input="updatePriceMax" id="price-min" name="price-min">
        
                    <!-- Slider prezzo massimo -->
                    <input type="range" class="form-range" min=10 max=1000 step="5" v-model="store.search.priceMax"
                      @input="updatePriceMin" id="price-max" name="price-max">
                </div>
        
                <hr>
                
                <h4>Stanze e Letti</h4>

                <div class="my-4">
                    <!-- Stanze da Letto -->
                    <div class="mb-2">
                        <label for="rooms" class="form-label fw-bold">Quante stanze da letto deve avere?</label>
                        <h4>{{ store.search.rooms }}</h4>
                        <input type="range" class="form-range" min="1" max="10" step="1"
                            v-model="store.search.rooms" id="rooms"
                            name="rooms">
                    </div>

                    <!-- Bagni -->
                    <div class="mb-2">
                        <label for="letti" class="form-label fw-bold">Quanti letti deve avere?</label>
                        <h4>{{ store.search.beds }}</h4>
                        <input type="range" class="form-range" min="1" max="20" step="1"
                            v-model="store.search.beds" id="letti">
                    </div>
                </div>

                <hr>

                <!-- Metri Quadrati deisiderati -->
                <div class="mb-2">
                    <label for="square_meters" class="form-label fw-bold">Quanti metri quadrati dev'essere?</label>
                    <h4>{{ store.search.squareMeters }} m²</h4>
                    <input type="range" class="form-range" min="20" max="1000" step="10"
                        v-model="store.search.squareMeters" id="square_meters"
                            name="square_meters">
                </div>

                <!-- Distanza dal luogo in km -->
                <div class="mb-2">
                    <label for="distance" class="form-label fw-bold">Distanza</label>
                    <h4>{{ store.search.distance }} km</h4>
                    <input type="range" class="form-range" min="1" max="40" step="1"
                        v-model="store.search.distance" id="distance"
                        name="distance">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetPreviousData()">Annulla</button>
              <button type="button" class="btn btn-brand" data-bs-dismiss="modal" @click="$emit('sendSearch')">Cerca Risultati</button>
            </div>
          </div>
        </div>
      </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/_variables.scss' as *;

.btn-color-searchbar {
    color: $brand-color-boolbnb;
    border-color: $brand-color-boolbnb;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
}

.btn-brand {
    background-color: $brand-color-boolbnb  ;
}

.btn1 {
    background-color: white; 
  }
  
  .btn1:hover {
    background-color: $brand-color-boolbnb;
    color: white;
  }

.top-0 {
    margin-top: 100px;
    margin-right: 5px;
}

</style>