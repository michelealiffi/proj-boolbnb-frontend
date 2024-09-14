<script>
import { store } from '../store';

import AppApartmentCard from "../components/AppApartmentCard.vue";
import AppSearchBar from "../components/AppSearchBar.vue";

import axios from 'axios';

export default {
    name: "Advanced Search",
    data(){
        return {
            store
        }
    },
    components: {
        AppApartmentCard,
        AppSearchBar
    },
    methods: {
        // cerca gli appartamenti basandosi sui filtri
        searchWithFilters(){
            const encodedSearch = encodeURIComponent(this.store.search.query)

            axios.get(`${this.store.api.url}${this.store.api.endpoints.search}?search=${encodedSearch}&distance=${this.store.search.distance}`)
            .then(response => {
                console.log(response);
                if(response.data.status === "ok"){
                    store.search.results = response.data.apartments.data;
                }
            }).catch(error => {
                console.error('Errore nella chiamata API:', error)
            })
        }
    },
    beforeMount(){
        this.searchWithFilters();
    }

}
</script>

<template>
    <AppSearchBar></AppSearchBar>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <input type="text" placeholder="La tua ricerca" v-model="store.search.query">
                <button @click="searchWithFilters()" class="btn btn-primary">Cerca</button>
            </div>
            <div class="col g-2" v-for="apartment in store.search.results">
                <AppApartmentCard :apartment="apartment"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>