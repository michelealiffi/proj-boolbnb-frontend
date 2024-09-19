<script>
import { store } from '../store';

import AppApartmentCard from "../components/AppApartmentCard.vue";
import AppFilter from '../components/AppFilter.vue';
import AppSearchBar from "../components/AppSearchBar.vue";
import AppService from "../components/AppService.vue";

import axios from 'axios';

export default {
    name: "Advanced Search",
    data(){
        return {
            store,
            errorMassage: "Caricamento in corso...",
        }
    },
    components: {
        AppApartmentCard,
        AppSearchBar,
        AppFilter,
        AppService
    },
    methods: {
        // cerca gli appartamenti basandosi sui filtri
        searchWithFilters(){
            const encodedSearch = encodeURIComponent(this.store.search.query)

            axios.get(`${this.store.api.url}${this.store.api.endpoints.search}`, {
                params: {
                    'search': encodedSearch,
                    'range': this.store.search.distance,
                    'beds': this.store.search.beds,
                    'rooms': this.store.search.rooms,
                    'services': this.store.search.services
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.status === "ok"){
                    this.store.search.results = response.data.apartments.data;
                    if(this.store.search.results == null || this.store.search.results.length === 0){
                        this.errorMassage = "Non ci sono appartamenti che corrispondono alla tua ricerca."
                    }
                }
            }).catch(error => {
                console.error('Errore nella chiamata API:', error)
                this.errorMassage = "Non riusciamo a cercare gli appartamenti prova a ricaricare la pagina."
            })
        },
        toggleService(service_id){
            const id_position = this.store.search.services.indexOf(service_id)
            if (id_position !== -1){
                // se il servizio era già selezionato lo rimuovo
                this.store.search.services.splice(id_position, 1)
            } else {
                // se il servizio non era selezionato lo inserisco
                this.store.search.services.push(service_id)
            }
        },
        isActiveService(id){
            return this.store.search.services.indexOf(id) !== -1;
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
    <AppFilter @send-search="searchWithFilters()"></AppFilter>
    <AppService></AppService>
    <div class="container text">
        <h2 v-if="hasResults">La tua ricerca:</h2>
        <h2 class="text-center" v-else>{{ errorMassage }}</h2>
        <div class="row row-cols-lg-3 row-cols-xl-4 gx-3 gy-5">
            <div class="col" v-for="apartment in store.search.results">
                <AppApartmentCard :showDistance="true" :apartment="apartment"/>
            </div>
        </div>
    </div>
</template>