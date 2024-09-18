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
    <div class="jumbotron-home container-fluid align-content-center">
        <h1 class="text-center shadow-h1 fs-1 text-white">Affidati a noi e scegli solo il meglio</h1>
    </div>

    <div class="container-xl my-5">


        <div class="row row-cols-lg-3 row-cols-xl-4 gx-4 gy-5">
            <div class="col" v-for="apartment in promoted_apartments">
                <AppApartmentCard class="pointer" :apartment="apartment"/>
            </div>
        </div>
    </div>

</template>

<style>
.shadow-h1 {
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 47vh;
    padding-bottom: 47vh;
}

.pointer {
    cursor: pointer;
}

.jumbotron-home {
    background-image: url(https://romecolosseumtickets.tours/wp-content/uploads/2022/05/rome-colosseum-and-forum.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    height: 100vh;
    
}
</style>