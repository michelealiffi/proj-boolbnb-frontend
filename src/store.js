import { reactive } from 'vue';

const store = reactive({ 
    api: {
        url: 'http://localhost:8000/api',
        endpoints: {
            search: '/apartments/search',
            services: '/services',
            autocomplete: '/tomtom/autocomplete',
            apartment_info: '/apartments/info',
            send_message: '/messages/store'
        }
    },
    search: {
        results: [],
        num_of_pages: null,
        current_page: null,
        query: "",
        distance: 20,
        beds: 1,
        rooms: 1,
        services: []
    },
    available_services: []
});

export { store };
