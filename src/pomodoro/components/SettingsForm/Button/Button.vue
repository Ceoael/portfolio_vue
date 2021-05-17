<template>
     <button 
        class="Button" 
        @click="clickHandler" 
        :type="type"><slot></slot></button>
</template>

<script>
    export default {
        emits: ['buttonClicked'],
        props: {
            type: {
                type: String,
                required: false
            }
        },
        methods: {
            clickHandler() {
                this.$emit('buttonClicked')
            }
        }
    }
</script>

<style scoped>
    .Button {
        height: 40px;
        padding: 0 15px;
        margin: 10px 5px 15px 5px;

        font-family: 'Roboto', sans-serif;
        font-size: 20px;

        border-radius: 5px;
        border: none;
        box-shadow: 0 3px 0px 0px black;
        color: black;

        cursor: pointer;
        user-select: none;
        outline: none;

        transition: background-color .3s ease-in-out;
    }

    .Button:hover {
        background-color: rgba(255,255,255, 0.3);
    }

    .Button:active {
        box-shadow: none;
        transform: translateY(3px);
    }
</style>
