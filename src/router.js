import PageAdvanceSearch from './pages/PageAdvanceSearch.vue';
import PageHome from './pages/PageHome.vue';
import PageApartmentShow from './pages/PageApartmentShow.vue';

import NotFound from './pages/NotFound.vue';

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        component: PageHome,
        name: 'Home',
        path: '/'
    },
    {
        component: PageAdvanceSearch,
        name: 'AdvanceSearch',
        path: '/advanceSearch'
    },
    {
        component: PageApartmentShow,
        name: 'ApartmentShow',
        path: '/apartments/:slug'
    },


    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
});

export { router };
