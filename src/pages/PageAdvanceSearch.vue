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

            axios.get(`${this.store.api.url}${this.store.api.endpoints.search}`, {
                params: {
                    'search': encodedSearch,
                    'range': this.store.search.distance
                }
            })
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
    computed:{
        hasResults(){
            if(this.store.search.results.length > 0){
                return true
            }
            return false
        }
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
    <AppSearchBar @send-search="searchWithFilters()"></AppSearchBar>
    <div class="container">
        <h2 v-if="hasResults">La tua ricerca:</h2>
        <h2 v-else>La tua ricerca non ha prodotto risultati, prova a cercare qualcos'altro</h2>
        <div class="row row-cols-lgs-3 row-cols-xl-4">
            <div class="col g-2" v-for="apartment in store.search.results">
                <AppApartmentCard :apartment="apartment"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>