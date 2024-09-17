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
            showAutocompleteList: true,

            // autocomplete
            autocompletedQuery: "",
            autocompleteInterval: null,
            autocompleteIntervalTime: 800
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
            // se non c'è un indirizzo da cercare
            if (this.store.search.query === ""){
                this.autocompleteResuluts = []
                return
            }

            // se ho già cercato l'attuale indirizzo
            if(this.store.search.query === this.autocompletedQuery){
                return
            }

            // imposto l'ultim query cercata a quella attuale
            this.autocompletedQuery = this.store.search.query

            // cerco la query salvata per eventuali risultati   
            axios.get(this.store.api.url+this.store.api.endpoints.autocomplete+`/${encodeURIComponent(this.autocompletedQuery)}`)
            .then(response => {
                if(response.data.result === 'ok'){
                    this.autocompleteResuluts = response.data.data.results;
                }
            })
            .catch(error => {
                console.error('Errore nella chiamata API:', error);
            });

        },
        selectOnClick(value){
            this.store.search.query = value;
            this.$emit('sendSearch')
        },
        showSuggestions(){
            this.showAutocompleteList = true;
        },
        hideSuggestion(){
            this.showAutocompleteList = false
        }
    },
    mounted(){
        this.autocompleteInterval = setInterval( this.SuggestAutocomplete , this.autocompleteIntervalTime);
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
                <input v-model="store.search.query" class="form-control me-2 rounded-5 p-3" type="search" placeholder="Search" aria-label="Search">
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