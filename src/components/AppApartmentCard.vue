<script></script>

<template>
    <div class="card border-0" style="width: 18rem;">
        <div class="card-img-container">
            <img src="https://images.adsttc.com/media/images/6613/f564/ce8b/1207/0e8c/582b/newsletter/tokyo-blue-apartment-roovice_7.jpg?1712584050" class="card-img-top rounded" alt="...">
            <span class="heart-icon">&#9829;</span>
        </div>
        <span class="fw-medium">Nome appartamento</span>
        <span>Nome user</span>
        <div class="d-flex gap-1">
            <span class="fw-medium">Prezzo</span><span>a notte</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.card {
  position: relative;
  width: 18rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  overflow: hidden;
  
  .card-img-container {
    position: relative;
    width: 100%;
    
    .card-img-top {
      width: 100%;
      height: auto;
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
