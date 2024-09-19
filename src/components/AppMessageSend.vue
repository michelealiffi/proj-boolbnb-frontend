<script>
import axios from 'axios';

import { store } from '../store';


export default {
  name: "Message Modal",
  data() {
      return {
        store,
        email: "",
        message: "",
        sending_message: false,
        response_message: {
          show: false,
          content: ""
        }
      };
  },
  props: ['apartment_id'],
  methods: {
    sendMessage(){
      this.sending_message = true;

      if(this.email && this.message && this.name){
        // invio i dati al backend
        axios.post(this.store.api.url+this.store.api.endpoints.send_message, {
          email: this.email,
          name: this.name,
          content: this.message,
          apartment_id: this.apartment_id
        }).then(response => {
          console.log(response);
          this.sending_message = false;
          if(response.data.status === 'ok'){
            this.response_message.content = "Messaggio inviato correttamente";
            this.response_message.show = true;
          }
        }).catch(error => {
          this.sending_message = false;
          console.error('Errore nella chiamata api.', error)
        }) 

      } else {
        window.alert("email e messaggio sono obbligatori")
      }
    }
  },
  mounted(){
    console.log(this.$refs.myModal);
    
    this.$refs.myModal.addEventListener('hidden.bs.modal', (event) => {
      this.response_message.content = "";
      this.response_message.show = false;
      this.name="";
      this.message = "";
      this.email = "";
    })  
  }
};
</script>

<template>
  <div class="modal fade" ref="myModal" id="MessageModal" tabindex="-1" aria-labelledby="MessageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="fs-5 m-auto" id="exampleModalLabel" v-show="!response_message.show">Contatta l'host per avere più informazioni</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-show="!response_message.show">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Il tuo nome *</label>
              <input type="email" class="form-control" :disabled="sending_message" id="name" v-model="name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">La tua email *</label>
              <input type="email" class="form-control" :disabled="sending_message" id="email" v-model="email" required />
            </div>
            <div class="mb-3">
              <label for="messageText" class="form-label">Il tuo messaggio *</label>
              <textarea class="form-control" :disabled="sending_message" id="messageText" placeholder="Ciao, sono interessato a questo appartamento. Puoi fornirmi ulteriori dettagli sulle condizioni della prenotazione e su eventuali caratteristiche dell'appartamento?" rows="5" v-model="message" style="resize: vertical; min-height: 90px; max-height: 250px ; max-width: 100%;" required></textarea>
            </div>
          </form>
        </div>

        <div class="modal-body" v-show="response_message.show">
          <h2>{{ response_message.content }}</h2>  
        </div>

        <div class="modal-footer">
          <button type="button" class="btn close_btn" data-bs-dismiss="modal">Chiudi</button>
          <button type="button" class="btn send_btn" :disabled="email.length === 0 || message.length === 0 || sending_message"  @click="sendMessage()" v-show="!response_message.show">Invia Messaggio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.close_btn {
    background-color: grey;
    color: white;
    border: none;
    padding: 10px 20px;
}

.close_btn:hover {
    background-color: #ff5761;
}

.send_btn {
    background-color: #e91e63;
    color: white;
    border: none;
    padding: 10px 20px;
}

.send_btn:hover {
    background-color: #ff5761;
}

.modal-content{
    border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    box-shadow: 0 0 15px 10px rgba(214, 4, 67, 0.13);
}

</style>