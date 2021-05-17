<template>
    <div class="Navigation">
        <button :class="['Navigation__Button', { 'Navigation__Button--active': !breakIsActive }, {'Navigation__Button--block' : timerIsRunning}]"
            @click="turnOnBreakTab(false)">Session</button>
        <button :class="['Navigation__Button', { 'Navigation__Button--active': breakIsActive }, {'Navigation__Button--block' : timerIsRunning}]"
            @click="turnOnBreakTab(true)">{{ breakType }}</button>

        <button :class="['Navigation__Button', 
                        'Navigation__Button--settings',
                        {'Navigation__Button--block' : timerIsRunning}]"
                @click="settingsOn">
            <span :class="['material-icons', 'Navigation__icon']">settings</span>
        </button>
    </div>
</template>

<script>
import {computed} from 'vue';

export default {
    name: "Navigation",
    emits: ['settingsOn', 'turnOnBreakTab'],
    props: {
        breakIsActive: {
            type: Boolean,
            required: true
        },
        longBreakIsActive: {
            type: Boolean,
            required: true
        },
        timerIsRunning: {
            type: Boolean,
            required: true
        },
    },
    setup(props, context) {

        const breakType = computed(function(){
            return props.longBreakIsActive ? 'Long Break' : 'Short Break';
        })

        const settingsOn = () => {
            if (props.timerIsRunning) return;
            context.emit('settingsOn');
        }

        const turnOnBreakTab = (value) => {
            if (props.timerIsRunning) return;
            context.emit('turnOnBreakTab', value);
        }

        return {breakType, settingsOn, turnOnBreakTab};
    }
}
</script>

<style scoped>
* {
    --settingsButtonBGC: #3C47E9;
    --textColor: #E7E7EB;
    --deactiveTabColor: #100E1D;
    --activeTabColor: #1E213A;
}

.Navigation {
    display: flex;
    justify-content: space-between;
    width: 100%;

    /* background-color: rgba(0,0,0, 0.5); */
    background-color: #1E213A;
    border-radius: 5px 5px 0 0;
    
    overflow: hidden;
}

.Navigation__Button {
    height: 48px;
    width: 50%;
    border: none;
    /* background-color: rgba(0,0,0, 0.3); */
    background-color: var(--deactiveTabColor);
    color: var(--textColor);
    font-size: 1.1rem;
    outline: none;

    cursor: pointer;
    transition: all .3s ease-in-out;
}

.Navigation__Button--active {
    background-color:var(--activeTabColor);
}

.Navigation__Button--settings {
    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--settingsButtonBGC);

    width: 60px;
}

.Navigation__Button--block {
    color: rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
}

.Navigation__icon {
    font-size: 22px;
    overflow: hidden;
}

@media (min-width: 768px) {
    .Navigation {
        width: 90%;
    }

    .Navigation__Button {
        height: 64px;

        font-size: 2rem;
    }
}

@media (min-width: 1000px) {
    .Navigation {
        width: 800px;
    }
}
</style>
