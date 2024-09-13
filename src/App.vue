<<<<<<< HEAD
<script setup>
// import AppHeader from './components/AppHeader.vue';
// import AppFooter from './components/AppFooter.vue';
// //import { library } from '@fortawesome/fontawesome-svg-core'
=======
<script>
import AppHeader from './components/AppHeader.vue';
//import AppFooter from './components/AppFooter.vue';
//import { library } from '@fortawesome/fontawesome-svg-core'
>>>>>>> 14-create-navbar

// //import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

// //library.add(faUserSecret)

<<<<<<< HEAD
// export default {
//   components: {
//     AppHeader,
//     AppFooter
//   },
// } 
=======
export default {
  components: {
    AppHeader
    //AppFooter
  }
}
>>>>>>> 14-create-navbar
</script>

<template>
<!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
<!-- <AppHeader></AppHeader> -->
<router-view/>
<!-- <AppFooter></AppFooter> -->
</template>
