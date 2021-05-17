<template>
    <div>
        <div class="DeleteDescription">
            Are you sure to delete '{{ eventTitle }}' countdown ?
        </div>
        <div class="ButtonsContainer">
            <Button @buttonClicked="modalOff">CANCEL</button>
            <Button @buttonClicked="confirmDeleteEvent">YES</button></div>
    </div>
</template>

<script>
    import Button from './../Button/Button.vue';

    export default {
        components: {
            Button
        },
        props: {
            eventTitle: {
                type: String,
                defalut: 'this'
            }
        },
        emits: ['modalOff', 'confirmDeleteEvent'],
        methods: {
            modalOff(){
                this.$emit('modalOff');
            },
            confirmDeleteEvent(){
                this.$emit('confirmDeleteEvent');
            }
        }
    }
</script>

<style scoped>
.DeleteDescription {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    text-align: center;
}
.ButtonsContainer {
    width: 100%;
    text-align: center;
    padding: 10px 5px 15px 5px;
}
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
