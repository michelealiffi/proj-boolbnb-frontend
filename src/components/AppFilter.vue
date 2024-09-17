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
            bathrooms: 1,      
            priceMin: 50,
            priceMax: 500
        }
    },
    methods: {
    // Assicurati che il prezzo massimo non sia inferiore al prezzo minimo
    updatePriceMax() {
      if (this.priceMin > this.priceMax) {
        this.priceMax = this.priceMin;
      }
    },
    // Assicurati che il prezzo minimo non superi il prezzo massimo
    updatePriceMin() {
      if (this.priceMax < this.priceMin) {
        this.priceMin = this.priceMax;
      }
    }
  }
}
</script>

<template>
    <button class="btn btn1 btn-color-searchbar rounded-5 position-absolute end-0 top-0" type="button" data-bs-toggle="modal" data-bs-target="#modalFilter">
        <i>
            <font-awesome-icon icon="fa-solid fa-sliders" />
        </i>
    </button>

    <div class="modal fade" id="modalFilter" tabindex="-1" aria-labelledby="modalFilterLabel" aria-hidden="true">
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
                      <h4 class="d-inline">{{ priceMin }} &euro; - {{ priceMax }} &euro;</h4>
                    </div>
        
                    <!-- Slider prezzo minimo -->
                    <input type="range" class="form-range" min="10" max="1000" step="5" v-model="priceMin"
                      @input="updatePriceMax" id="price-min" name="price-min">
        
                    <!-- Slider prezzo massimo -->
                    <input type="range" class="form-range" min="10" max="1000" step="5" v-model="priceMax"
                      @input="updatePriceMin" id="price-max" name="price-max">
                </div>
        
                <hr>
                
                <h4>Stanze e Bagni</h4>

                <div class="my-4">
                    <!-- Stanze da Letto -->
                    <div class="mb-2">
                        <label for="rooms" class="form-label fw-bold">Quante stanze da letto deve avere?</label>
                        <h4>{{ rooms }}</h4>
                        <input type="range" class="form-range" min="1" max="10" step="1"
                            v-model="rooms" id="rooms"
                            name="rooms">
                    </div>

                    <!-- Bagni -->
                    <div class="mb-2">
                        <label for="bathrooms" class="form-label fw-bold">Quanti bagni deve avere?</label>
                        <h4>{{ bathrooms }}</h4>
                        <input type="range" class="form-range" min="1" max="6" step="1"
                            v-model="bathrooms" id="bathrooms"
                            name="bathrooms">
                    </div>
                </div>

                <hr>

                <!-- Metri Quadrati deisiderati -->
                <div class="mb-2">
                    <label for="square_meters" class="form-label fw-bold">Quanti metri quadrati dev'essere?</label>
                    <h4>{{ squareMeters }} m²</h4>
                    <input type="range" class="form-range" min="20" max="1000" step="10"
                        v-model="squareMeters" id="square_meters"
                            name="square_meters">
                </div>

                <!-- Distanza dal luogo in km -->
                <div class="mb-2">
                    <label for="distance" class="form-label fw-bold">Distanza</label>
                    <h4>{{ distance }} km</h4>
                    <input type="range" class="form-range" min="1" max="20" step="0.5"
                        v-model="distance" id="distance"
                        name="distance">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
              <button type="button" class="btn btn-brand">Cerca Risultati</button>
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