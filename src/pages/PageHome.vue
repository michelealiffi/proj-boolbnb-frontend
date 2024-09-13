<script>
import AppApartmentCard from "../components/AppApartmentCard.vue"

import { store } from '../store'

export default {
    name: 'Homepage',
    data(){
        return {
            store
        };
    },
    components: {
        AppApartmentCard
    },
    beforeMount(){
        document.title = "Boolbnb - Home"
    }
}
</script>

<template>
    <h1 class="text-center">Homepage</h1>
    <AppApartmentCard></AppApartmentCard>
</template>