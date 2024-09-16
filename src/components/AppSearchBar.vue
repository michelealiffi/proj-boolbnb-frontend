<script>
import { library } from '@fortawesome/fontawesome-svg-core';

import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add( faMagnifyingGlass, faLocationDot );

import { store } from '../store';

import axios from 'axios';

export default {
    name: 'SearchBar',
    data(){
        return {
            store,
            autocompleteResuluts: [],
            autocompleteTimeout: null,
            shouldAutocomplete: true,
            showAutocompleteList: true,
        }
    },
    methods: {
        sendSearch(){
            if(this.store.search.query){
                this.$emit('sendSearch')
            } 
        },
        goToAdvanceSearch() {
            this.$router.push('/advanceSearch');
        },
        SuggestAutocomplete(){
            // if(!this.shouldAutocomplete){
            //     if (this.autocompleteTimeout == null){
            //         this.autocompleteTimeout = setTimeout(() => {
            //             this.shouldAutocomplete = true;
            //             this.autocompleteTimeout = null;
            //             this.SuggestAutocomplete()
            //         }, 1000);
            //     }
            //     return
            // }
            if (this.store.search.query){
                
                axios.get(this.store.api.url+this.store.api.endpoints.autocomplete+`/${encodeURIComponent(this.store.search.query)}`)
                .then(response => {
                    if(response.data.result === 'ok'){
                        this.autocompleteResuluts = response.data.data.results;
                        this.shouldAutocomplete = false;
                    }
                })
                .catch(error => {
                    console.error('Errore nella chiamata API:', error);
                });

            } else {
                this.autocompleteResuluts = []
            }
        },
        selectOnClick(value){
            console.log('qui')
            this.store.search.query = value;
        },
        showSuggestions(){
            this.showAutocompleteList = true;
        },
        hideSuggestion(){
            this.showAutocompleteList = false
        }
    },
    emits:[
        'sendSearch'
    ]
}
</script>

<template>
    <div class="border-bottom border-secondary-subtle pb-3" @mouseenter="showSuggestions()" @mouseleave="hideSuggestion()">
        <form class="mx-auto px-5" role="search" @submit.prevent="sendSearch()">
            <div class="position-relative d-flex">
                <input @keyup="SuggestAutocomplete(event)" v-model="store.search.query" class="form-control me-2 rounded-5 p-3" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn1 btn-color-searchbar rounded-5 position-absolute end-0 top-50" type="submit">
                    <i>
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </i>
                </button>
                <!-- togliere d-none su ul per mostrare la lista-->
                <ul class="border border-1 rounded-5 position-absolute w-100 bg-white p-3 mt-2 bottom-0 list-searchbar" v-show="showAutocompleteList && autocompleteResuluts.length > 0 && store.search.query !== '' ">
                    <li class="m-2 li-searchbar" v-for="autocompleteSuggestion in autocompleteResuluts" @click="selectOnClick(autocompleteSuggestion.address.freeformAddress)">
                        <i>
                            <font-awesome-icon class="brand-color me-2" icon="fa-solid fa-location-dot" />
                        </i>
                        {{ autocompleteSuggestion.address.freeformAddress }}
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
    z-index: 100;
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