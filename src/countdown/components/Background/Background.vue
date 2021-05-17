<template>
    <div class="Background" :style="customStyles">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['customStyles']
}
</script>

<style scoped>
    .Background {
        width: 100%;
        min-height: 100vh;

        background: #D38312;  
        background: -webkit-linear-gradient(to right, #A83279, #D38312); 
        background: linear-gradient(to right, #A83279, #D38312); 
    }
</style>
