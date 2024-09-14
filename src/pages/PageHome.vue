<script>
import AppApartmentCard from "../components/AppApartmentCard.vue";
import AppSearchBar from "../components/AppSearchBar.vue";

import { store } from '../store';

import axios from 'axios';

export default {
    name: 'Homepage',
    data(){
        return {
            store,
            promoted_apartments: [],
            search: "",
        };
    },
    components: {
        AppApartmentCard,
        AppSearchBar
    },
    methods:{
        getPromotedApartments(){
            axios.get('http://localhost:8000/api/apartments/sponsored')
            .then(response => {
                if(response.data.status === 'ok'){
                    this.promoted_apartments = response.data.apartments;
                }
                 // Assegna i dati ricevuti
            })
            .catch(error => {
                console.error('Errore nella chiamata API:', error);
            });
        }
    },
    emits:['searchApartments'],
    beforeMount(){
        document.title = "Boolbnb - Home"
        this.getPromotedApartments()
    }
}
</script>

<template>
    <AppSearchBar></AppSearchBar>
    <div class="col-12">
        <input type="text" placeholder="La tua ricerca" v-model="store.search.query">
        <router-link :to="{ name:'AdvanceSearch'}" class="btn btn-primary">Cerca</router-link>
    </div>
    <div class="container">
        <h2>Affidati a noi e scegli solo il meglio</h2>
        <div class="row row-cols-lgs-3 row-cols-xl-4">
            <div class="col g-2" v-for="apartment in promoted_apartments">
                <AppApartmentCard :apartment="apartment"/>
            </div>
        </div>
    </div>

</template>