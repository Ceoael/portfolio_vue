<template>
    <button class="Button" @click="startButtonHandler">
        {{ buttonTitle }}
    </button>
</template>

<script>
import {computed} from 'vue';

export default {
    name: "Button",
    emits: ['startButton'],
    props: {
        startButton: {
            type: Boolean,
            required: true
        }
    },
    setup(props, context){
        const buttonTitle = computed(function(){
            return props.startButton ? 'Stop' : 'Start';
        })

        const startButtonHandler = () => {
            context.emit('startButton');
        }

        return {buttonTitle, startButtonHandler};
    }
}
</script>

<style scoped>
* {
    --settingsButtonBGC: #3C47E9;
    --settingsButtonHover: #2b5bfa;
    --textColor: #E7E7EB;
}

.Button {
    /* margin-top: 10px; */
    font-size: 2rem;
    padding: 10px 40px;
    border-radius: 5px;
    border: none;
    background-color: var(--settingsButtonBGC);
    color: var(--textColor);
    outline: none;
}

.Button:hover,
.Button:active {
    background-color: var(--settingsButtonHover);
}

</style>
