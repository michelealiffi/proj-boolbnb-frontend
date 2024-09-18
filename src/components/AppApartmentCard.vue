<script>
export default {
  name:"Apartment Card",
  data(){
    return {
      
    }
  },
  props: {
    apartment:{},
    showDistance: {
      type: Boolean,
      default: false,
  }},
  methods: {
    showApartmentInfo(){
      this.$router.push({name:'ApartmentShow', params:{ 'slug':this.apartment.slug }})
    }
  }
}
</script>

<template>
    <div class="card border-0 h-100" @click="showApartmentInfo()">
        <div class="card-img-container">
          <picture>
            <img src="https://i.redd.it/zvo9zlpf3dk71.jpg" class="card-img-top rounded" alt="...">
            <img :src="apartment.image" class="rounded apartment-img" onerror="this.style.display='none'">
          </picture>
          <button class="btn rounded details-button">Dettagli</button>
          <div v-if="apartment.rooms > 0" class="rooms-label">
            {{ apartment.rooms }}
            <span v-if="apartment.rooms === 1">stanza</span>
            <span v-else>stanze</span>
          </div>
          
        </div>
        <div class="d-flex h-100 flex-column">
          <!-- titolo -->
          <div class="fw-medium">{{ apartment.title }}</div>

          <!-- altri dati -->
          <div>
            <div class="d-flex justify-content-between">
              <span>{{ apartment.address }}</span>
              <span> {{ isNaN(apartment.distance) || apartment.distance === null ? '' : (Math.round(apartment.distance / 100) / 10) + ' km' }} </span>
            </div>
            <div id="rooms_counter" class="position-absolute pt-3">
              <div v-if="apartment.beds > 0" class="bedrooms-container">
                <i class="fa-solid fa-bed fa-sm"></i>
                <span class="number">{{ apartment.beds }}</span>
              </div>
              <div v-if="apartment.bathrooms > 0" class="bathrooms-container">
                <i class="fa-solid fa-toilet fa-sm"></i>
                <span class="number">{{ apartment.bathrooms }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <span>Host: {{apartment.userName}}</span> 
              <div class="d-flex gap-1">
                <span class="fw-medium">{{ apartment.price }} &euro;</span><span>a notte</span>
              </div>
            </div>
          </div>
        </div>
        
        
    </div>
</template>

<!-- 
{ "id": 15, "title": "adsasda", "image": "asdas", "price": 410, "user_id": 1, "distance": 0, "userName": "Alice" }
-->

<style lang="scss" scoped>

.card {
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
  
  .card-img-container {
    position: relative;
    width: 100%;

    .apartment-img{
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
    
    .card-img-top {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .fw-medium {
    font-weight: 500;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
  }
}

// Labels sopra l'immagine
#rooms_counter {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  z-index: 4;
}

.number {
  position: relative;
  top: -10px;
  right: 7px;
  background-color: #f52b46ea;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 11px;
}

#rooms_counter .fa-solid {
  color: #494949;
  background-color: rgba(255, 255, 255, 0.808);
  border-radius: 50%;
  padding: 12px 6px ;
}

.rooms-label {
  position: absolute;
  top: 20px;
  left: 0px;
  background-color: #276e36;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  z-index: 4;
}

// Bottone in hover
.details-button {
  position: absolute;
  bottom: 35%;
  left: 50%;
  transform: translate(-50%, 50%); 
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 4;
}

.details-button:active {
  border: none;
}

.card:hover .details-button {
  opacity: 1;
  background-color: #f52b46;
  color: white;
  padding: 10px 20px;
  transform: translate(-50%, -35%);
}

.card:hover .card-img-top {
  transform: scale(1.05);
}

.card {
  &:hover {
    .apartment-img, 
    .card-img-top {
      filter: brightness(60%);
      transform: none;
    }
  }
}

</style>
