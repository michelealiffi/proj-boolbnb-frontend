<script>
import { store } from '../store'

import axios from 'axios'

export default {
    name: "apartment info",
    data(){
        return {
            store,
            apartment: null,
            aloonPosition: { x: 0, y: 0, scale: 0 },
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
        },

        handleMouseMove(event) {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.aloonPosition = {
                x: x - 50,
                y: y - 50,
                scale: 1
            };
        },
        handleMouseLeave() {
            this.aloonPosition = {
                ...this.aloonPosition,
                scale: 0 
            };
        }
    },
    created(){
        this.getApartmentData();
    }
}
</script>


<template>
    <div class="container">

        <div v-if="loading">
            <p>Caricamento dei dettagli dell'appartamento...</p>
        </div>

        <div v-else-if="apartment" class="row">
        
            <h3 class="py-4">{{ apartment.title }}</h3>

            <div>
                <img :src="apartment.image" :alt="apartment.title" class="img-fluid rounded-start" style="width:600px" />
            </div>

            <div class="row">
                <div class="col me-5">
                    <h5 class="pt-4">{{ apartment.address }}</h5>
                    <div class="border-bottom pb-4">
                        <span>{{ apartment.rooms }} stanza/e &middot;</span>
                        <span>{{ apartment.bathrooms }} bagno/i &middot;</span>
                        <span>{{ apartment.square_meters }} m²</span>
                    </div>

                    <div class="border-bottom pt-3">
                        <p>Inserito da: <strong>{{ apartment.user.name }}</strong></p>
                    </div>

                    <div class="pt-3 border-bottom">
                        <p>{{ apartment.description }}</p>
                    </div>

                    <div class="py-4">
                        <h5>Cosa troverai</h5>
                        <ul class="d-flex flex-wrap pt-3">
                            <li v-for="service in apartment.services" :key="service.id" class="col-6">
                                <i :class="service.icon_name"></i> {{ service.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="price_section" class="col-4 mt-4">
                    <div class="text-center px-4 py-4 mt-4">
                        <div class="apartment-price">
                            <p><strong>{{ apartment.price }} €</strong> notte</p>
                            <p>Prezzo per 5 notti: <strong>{{ apartment.price * 5 }}€</strong></p>
                            <p>Prezzo per una settimana: <strong>{{ apartment.price * 7 }}€</strong></p>
                        </div>
                        <div>
                            <p>Hai qualche domanda o vuoi prenotare? Contatta l'host! <i class="fa-solid fa-arrow-down-long fa-sm"></i></p>
                            <button class="button_magenta fw-bold" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
                                Contatta
                                <div class="alone" :style="{ top: `${aloonPosition.y}px`, left: `${aloonPosition.x}px`, transform: `scale(${aloonPosition.scale})` }"></div>
                            </button>
                            <p class="pt-4">Non riceverai alcun addebito in questa fase</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-5">
            <div class="spinner"></div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

#price_section {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
}

.button_magenta {
    background-color: #e91e63;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s;
    width: 100%;
    height: 55px;
}

.alone {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    background-color: rgba(247, 113, 3, 0.164);
    width: 100px;
    height: 100px;
    transform: scale(0);
    transition: transform 0.2s ease, opacity 0.3s ease;
    box-shadow: 0 0 15px 10px rgba(247, 113, 3, 0.164);
    z-index: 0;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #ff5761;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

</style>