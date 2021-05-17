<template>
    <button :class="['RestartButton', {'RestartButton--block' : timerIsRunning}]"
            @click="clickHandler">
        <span :class="['material-icons', 'RestartButton__icon']">restart_alt</span>
    </button>
</template>

<script>

export default {
    name: "ResetButton",
    props: {
        timerIsRunning: {
            type: Boolean,
            required: true
        }
    },
    emits: ['resetButton'],
    setup(props, context) {
        return {
            clickHandler: () => {if(!props.timerIsRunning)context.emit('resetButton')},
        }
    }
}
</script>

<style scoped>
    * {
        --darkPastelRed: #ff443a;
        --pastelRed: #ff6961;
        --textColor: #E7E7EB;
    }

    .RestartButton {
        display: flex;
        justify-content: center;
        align-items: center;

        background: var(--darkPastelRed);
        width: 60px;
        height: 100%;

        border: none;
        border-radius: 5px;

        color: var(--textColor);
        font-size: 1.1rem;
        outline: none;

        cursor: pointer;
        transition: all .3s ease-in-out;
    }

    .RestartButton--block {
        background-color: var(--pastelRed);
        cursor: not-allowed;
    }

    .RestartButton__icon {
        font-size: 30px;
        overflow: hidden;
    }

</style>
