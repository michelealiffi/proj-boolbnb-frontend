<script>
import { store } from '../store'
import AppMessageSend from '../components/AppMessageSend.vue'

import axios from 'axios'

import tt from "@tomtom-international/web-sdk-maps"



export default {
    name: "apartment info",
    components: {
        AppMessageSend,
    },
    data(){
        return {
            store,
            apartment: null,
            aloonPosition: { x: 0, y: 0, scale: 0 },
            loading: null,
            mapLoadingInterval: null,
            map: null
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
        },
        loadMap(){
            if(document.getElementById("myMap") == null || this.apartment == null){
                return
            } else {
                clearInterval(this.mapLoadingInterval)
                let longitude = Number(this.apartment.longitude);
                let latitude = Number(this.apartment.latitude);

                let map = tt.map({
                    key: "339jnUQ4eelXVAdO183Aqfa6tCLmSeoj",
                    container: "myMap",
                    center: [longitude , latitude],
                    zoom: 14,

                })
                map.on('load', ()=>{  
                    new tt.Marker().setLngLat([longitude, latitude]).addTo(map)
                })
            }
        
        }
    },
    created(){
        this.getApartmentData();
    },
    mounted(){
        this.mapLoadingInterval = setInterval(this.loadMap, 100);
    }

}
</script>


<template>
    <div class="container">

        <div v-if="loading">
            <p>Caricamento dei dettagli dell'appartamento...</p>
        </div>

        <div v-else-if="apartment" class="row">
            <div class="col-6">
                <h3 class="py-4">{{ apartment.title }}</h3>
    
                <div>
                    <img :src="apartment.image" :alt="apartment.title" class="img-fluid rounded" style="width:600px" />
                </div>
            </div>
            <div class="col-6">
                <div class="h-100 py-5">
                    <div id="myMap" class="h-100"></div>
                </div>
            </div>
            <div class="col me-5">
                <h5 class="pt-4">{{ apartment.address }}</h5>
                <div class="border-bottom pb-4 d-flex gap-2">
                    <span>{{ apartment.rooms }} stanz<span v-if="apartment.rooms > 1">e</span></span>
                    <span>&middot;</span>
                    <span>{{ apartment.beds }} post<span v-if="apartment.beds > 1">i</span><span v-else>o</span></span>
                    <span>&middot;</span>
                    <span>{{ apartment.bathrooms }} bagn<span v-if="apartment.bathrooms > 1">i</span><span v-else>o</span></span>
                    <span>&middot;</span>
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
                        <button class="button_magenta fw-bold" data-bs-toggle="modal" data-bs-target="#MessageModal" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
                            Contatta
                            <div class="alone" :style="{ top: `${aloonPosition.y}px`, left: `${aloonPosition.x}px`, transform: `scale(${aloonPosition.scale})` }"></div>
                        </button>
                        <AppMessageSend ref="messageSendModal" :apartment_id="apartment.id"/>
                        <p class="pt-4">Non riceverai alcun addebito in questa fase</p>
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

#myMap{
    margin-top: 45px;
    border-radius: 10px;
}

</style>