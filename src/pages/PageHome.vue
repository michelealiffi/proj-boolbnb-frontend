<script>
import AppApartmentCard from "../components/AppApartmentCard.vue";
import AppSearchBar from "../components/AppSearchBar.vue";

import { store } from '../store';

export default {
    name: 'Homepage',
    data(){
        return {
            store
        };
    },
    components: {
        AppApartmentCard,
        AppSearchBar
    },
    beforeMount(){
        document.title = "Boolbnb - Home"
    }
}
</script>

<template>
    <AppSearchBar></AppSearchBar>
    <AppApartmentCard></AppApartmentCard>
</template>