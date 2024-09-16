<script>
        export default {
            name: "Message Modal",
    data() {
        return {
        };
    },
    methods: {
    },
    };
</script>

<template>
    <div class="modal fade" id="MessageModal" tabindex="-1" aria-labelledby="MessageModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="fs-5 m-auto" id="exampleModalLabel">Contatta l'host per avere più informazioni</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
              <label for="email" class="form-label">* La tua email:</label>
              <input type="email" class="form-control" id="email" v-model="email" required />
            </div>
            <div class="mb-3">
              <label for="messageText" class="form-label">* Il tuo messaggio:</label>
              <textarea class="form-control" id="messageText" placeholder="Ciao, sono interessato a questo appartamento. Puoi fornirmi ulteriori dettagli sulle condizioni della prenotazione e su eventuali caratteristiche dell'appartamento?" rows="5" v-model="message" style="resize: vertical; min-height: 90px; max-height: 250px ; max-width: 100%;" required></textarea>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn close_btn" data-bs-dismiss="modal">Chiudi</button>
        <button type="button" class="btn send_btn ">Invia Messaggio</button>
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
    box-shadow: rgba(233, 30, 99, 0.8) 0px 0px 30px;
}

</style>