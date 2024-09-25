<script>
import { store } from '../store';

import AppApartmentCard from "../components/AppApartmentCard.vue";
import AppFilter from '../components/AppFilter.vue';
import AppSearchBar from "../components/AppSearchBar.vue";
import AppService from "../components/AppService.vue";
import AppSpinner from "../components/AppSpinner.vue";
import axios from 'axios';

export default {
    name: "Advanced Search",
    data(){
        return {
            store,
            status: "loading",
        }
    },
    components: {
        AppApartmentCard,
        AppSearchBar,
        AppFilter,
        AppService,
        AppSpinner
    },
    methods: {
        // cerca gli appartamenti basandosi sui filtri
        searchWithFilters(move_page=0, reset=false){
            this.status = "loading";
            this.store.search.results = [];
            const encodedSearch = encodeURIComponent(this.store.search.query)
            // reimposto la pagina a 1
            if(reset){
                this.store.search.current_page = 1;
            } else {
                this.store.search.current_page += move_page;
            }
            axios.get(`${this.store.api.url}${this.store.api.endpoints.search}`, {
                params: {
                    'search': encodedSearch,
                    'range': this.store.search.distance,
                    'beds': this.store.search.beds,
                    'rooms': this.store.search.rooms,
                    'services': this.store.search.services,
                    'min_price' : this.store.search.priceMin,
                    'max_price' : this.store.search.priceMax,
                    'square_meters' : this.store.search.squareMeters,
                    'page': this.store.search.current_page
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.status === "ok"){
                    console.log(response);
                    
                    this.store.search.results = response.data.apartments.data;
                    this.store.search.num_of_pages = response.data.apartments.last_page;
                    this.store.search.current_page = response.data.apartments.current_page;
                    if(this.store.search.results == null || this.store.search.results.length === 0){
                        this.status = "empty"
                    }
                }
            }).catch(error => {
                console.error('Errore nella chiamata API:', error)
                this.status = "error"
            })
        }
    },
    computed:{
        hasResults(){
            if(this.store.search.results.length > 0){
                return true
            }
            return false
        },
    },
    beforeMount(){
        if(this.store.search.query){
            this.searchWithFilters();
        } else {
            this.$router.push({name:'Home'})
        }

    }

}
</script>

<template>
    <AppSearchBar @send-search="searchWithFilters(0, true)"></AppSearchBar>
    <AppFilter @send-search="searchWithFilters(0, true)"></AppFilter>
    <AppService @send-search="searchWithFilters(0, true)"></AppService>
    <div class="container">
        <h2 v-if="hasResults">La tua ricerca:</h2>
        <h2 class="text-center" v-else>
            <AppSpinner v-if="this.status === 'loading'"/>
            <div v-if="this.status === 'empty'">
                <h2>Nessun appartamento corrisponde alla ricerca</h2>
            </div>
            <div v-if="this.status === 'error'">
                <h2>Errore interno. Ti preghiamo di ricaricare la pagina</h2>
            </div>
        </h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  gx-3 gy-5 mb-5">
            <div class="col" v-for="apartment in store.search.results">
                <AppApartmentCard :showDistance="true" :apartment="apartment"/>
            </div>
        </div>
        <div class="row justify-content-between" v-if="hasResults">
            <div class="col text-center">
                <button class="btn btn-secondary me-4" @click="searchWithFilters(-1)" :class="{'disabled': store.search.current_page == null || store.search.current_page === 1}">Precedente</button>
                <button class="btn btn-secondary" @click="searchWithFilters(1)" :class="{'disabled': store.search.current_page == null || store.search.current_page === store.search.num_of_pages }">Successivo</button>
            </div>
        </div>
    </div>
</template>