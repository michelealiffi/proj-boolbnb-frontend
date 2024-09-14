<script>
import { library } from '@fortawesome/fontawesome-svg-core';

import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add( faMagnifyingGlass, faLocationDot );

export default {
    name: 'SearchBar',
}
</script>

<template>
    <div class="border-bottom border-secondary-subtle pb-3">
        <form class="mx-auto px-5" role="search">
            <div class="position-relative d-flex">
                <input class="form-control me-2 rounded-5 p-3" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn1 btn-color-searchbar rounded-5 position-absolute end-0 top-50" type="submit">
                    <i>
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </i>
                </button>
                <!-- togliere d-none su ul per mostrare la lista-->
                <ul class="border border-1 rounded-5 position-absolute w-100 z-1 bg-white p-3 mt-2 bottom-0 list-searchbar d-none">
                    <li class="m-2 li-searchbar">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        Via del Marione 58, Rimini 57031
                    </li>
                    <li class="m-2 li-searchbar">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        Via del Milanese 130, Bari 81296
                    </li>
                    <li class="m-2 li-searchbar">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        Via Sangiuliano Cossu 23, Sassari 75168
                    </li>
                    <li class="m-2 li-searchbar">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        Via Garibaldi 2, Milano 35812
                    </li>
                    <li class="m-2 li-searchbar">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        Viale del Cuzzo 12a, Roma 00185
                    </li>
                </ul>
            </div>
          </form>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/_variables.scss' as *;

.list-searchbar {
    transform: translateY(calc(100% + 25px));
}

.brand-color {
    color: $brand-color-boolbnb;
}

.btn-color-searchbar {
    color: $brand-color-boolbnb;
    border-color: $brand-color-boolbnb;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    transform: translate(-50%, -50%);
}

.btn1 {
    background-color: white; 
  }
  
  .btn1:hover {
    background-color: $brand-color-boolbnb;
    color: white;
  }

  .li-searchbar {
    border-color: $brand-color-boolbnb;
    text-decoration: none;
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .li-searchbar:hover {
    background-color: #F9F9F9;
    padding: 20px;
    border-radius: 20px;
  }
</style>