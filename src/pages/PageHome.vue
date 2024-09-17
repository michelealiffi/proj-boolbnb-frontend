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
    <AppSearchBar @send-search="this.$router.push({name:'AdvanceSearch'})"></AppSearchBar>
    <div class="container-xl">
        <h2 class="text-center mt-2">Affidati a noi e scegli solo il meglio</h2>
        <div class="row row-cols-lg-3 row-cols-xl-4 gx-4 gy-5">
            <div class="col" v-for="apartment in promoted_apartments">
                <AppApartmentCard :apartment="apartment"/>
            </div>
        </div>
    </div>

</template>