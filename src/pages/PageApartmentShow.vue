<script>
import { store } from '../store'

import axios from 'axios'

export default {
    name: "apartment info",
    data(){
        return {
            store,
            apartment: null
        }
    },
    methods: {
        getApartmentData(){
            axios.get(this.store.api.url+this.store.api.endpoints.apartment_info, {
                params:{
                    'apartment_slug': this.$route.params.slug
                }
            }).then(response => {
                if (response.data.status === 'ok'){
                    this.apartment = response.data.apartment;
                }
            }).catch(error => {
                console.error('Errore nella chiamata API:', error)
            })
        }
    },
    created(){
        this.getApartmentData();
    }
}
</script>


<template>
    <h1>Dati disponibili da paginare</h1>
    <ul>
        <li v-for="value, key in apartment">
            {{ key }} => {{ value }}
        </li>
    </ul>
</template>