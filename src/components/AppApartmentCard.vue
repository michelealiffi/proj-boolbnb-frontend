<script>
export default {
  name:"Apartment Card",
  data(){
    return {
      
    }
  },
  props: ['apartment']
}
</script>

<template>
    <div class="card border-0">
        <div class="card-img-container">
          <picture>
            <img src="https://i.redd.it/zvo9zlpf3dk71.jpg" class="card-img-top rounded" alt="...">
            <img :src="apartment.image" class="rounded apartment-img">
          </picture>
            <span class="heart-icon">&#9829;</span>
        </div>
        <span class="fw-medium">{{ apartment.title }}</span>
        <span>{{ apartment.userName }}</span>
        <div class="d-flex gap-1">
            <span class="fw-medium">{{ apartment.price }} &euro;</span><span>a notte</span>
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
      z-index: 1000;
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

</style>
