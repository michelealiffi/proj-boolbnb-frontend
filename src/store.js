import { reactive } from 'vue';

const store = reactive({ 
    api: {
        url: 'http://localhost:8000/api',
        endpoints: {
            search: '/apartments/search'
        }
    },
    search: {
        results: [],
        num_of_pages: null,
        current_page: null,
        query: "",
        distance: 20,
        services: []
    },
    available_services: []
});

export { store };
