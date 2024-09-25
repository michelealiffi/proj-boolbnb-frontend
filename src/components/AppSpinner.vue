<script>
export default{
    name: "spinner"
}
</script>

<template>
<div class="spinner"></div>
</template>


<style lang="scss" scoped>
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #ff5761;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 30vh auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>