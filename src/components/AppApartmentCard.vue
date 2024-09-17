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
    <div class="card border-0" @click="showApartmentInfo()">
        <div class="card-img-container">
          <picture>
            <img src="https://i.redd.it/zvo9zlpf3dk71.jpg" class="card-img-top rounded" alt="...">
            <img :src="apartment.image" class="rounded apartment-img" onerror="this.style.display='none'">
          </picture>
            <span class="heart-icon">&#9829;</span>
        </div>
        <span class="fw-medium">{{ apartment.title }}</span>
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

    .heart-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      opacity: 0.7;
      text-shadow: 0 0 5px #fff, 0 0 5px #fff;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .fw-medium {
    font-weight: 500;
  }

  .d-flex {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

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
  background-color: #ff8757e3;
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

</style>
