<script>
export default {
    name: "footer"
}
</script>

<template>
<footer>
    <div class="container-lg text-center">
        <div class="row">
            <div class="col">
                colonna di sinistra
            </div>
            <div class="col">
                colonna centrale
            </div>
            <div class="col">
                colonna di destra
            </div>
            <div class="col-12">
                colonna inferiore
            </div>
        </div>
        
    </div>
</footer>

</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/_variables.scss' as *;

footer{
    background-color: lightgray;
    color: $brand-color-boolbnb;
}

</style>