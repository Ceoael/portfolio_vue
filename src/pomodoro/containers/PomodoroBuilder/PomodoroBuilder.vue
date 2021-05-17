<template>
    <pomodoro-builder-wrapper>

        <backdrop :show="showSettings" @closeBackdrop="closeSettings"/>
        <modal :modalOpen="showSettings" @modalOff="closeSettings" modalName="Settings" >
            <settings-builder @modalOff="closeSettings"/>
        </modal>
        
        <navigation 
            :longBreakIsActive="longBreakIsActive"
            :timerIsRunning="countdownIsRunning"
            :breakIsActive="breakIsActive"
            @settingsOn="openSettings"
            @turnOnBreakTab="turnOnBreakTab"/>
        <display 
            :breakIsActive="breakIsActive"
            :currentBreakTime="currentBreakTime"
            :currentSessionTime="currentSessionTime"/>

        <ButtonWrapper >
        <ResetButton :timerIsRunning="countdownIsRunning" @resetButton="resetCurrentTabTime"/>
        <Button 
            :startButton="countdownIsRunning"
            @startButton="startButtonHandler"
            />
        </ButtonWrapper>

        <audio ref="alarmSound" >
            <!-- <source src="/sounds/mixkit-alarm-tone-996.wav" /> -->
            <source src="/sounds/mixkit-unlock-game-notification-253.wav" />
        </audio>
    </pomodoro-builder-wrapper>
</template>

<script>
import PomodoroBuilderWrapper from './../../components/PomodoroBuilderWrapper/PomodoroBuilderWrapper.vue';
import Navigation from './../../components/Navigation/Navigation.vue';
import Display from './../../components/Display/Display.vue';
import Button from './../../components/Button/Button.vue';
import Modal from './../../components/Modal/Modal.vue';
import Backdrop from './../../components/Backdrop/Backdrop.vue';
import SettingsBuilder from './../SettingsBuilder/SettingsBuilder.vue';
import ResetButton from './../../components/ResetButton/ResetButton.vue';
import ButtonWrapper from './../../components/ButtonsWrapper/ButtonsWrapper.vue';

import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteLeave } from 'vue-router';

export default {
    name: 'PomodoroBuilder',
    components: {
        PomodoroBuilderWrapper,
        Navigation,
        Display,
        Button,
        SettingsBuilder,
        Modal,
        Backdrop,
        ResetButton,
        ButtonWrapper
    },
    setup() {
        const store = useStore();
        let timer = null;
        const alarmSound = ref(null);

        const breakIsActive = ref(false);
        const showSettings = ref(false);
        const countdownIsRunning = ref(false);
        const longBreakIsActive = ref(false);

        const timerSettings = computed(() => store.getters['pomodoro/timerSettings']);
        watch(timerSettings, (currentVal)=> {
            const {session, shortBreak, longBreakInterval} = currentVal;
            store.dispatch('pomodoro/sessionTimeLeft', {value: session});
            store.dispatch('pomodoro/breakTimeLeft', {value: shortBreak});
            store.dispatch('pomodoro/sessionsToLongBreak', {value: longBreakInterval});
            breakIsActive.value = false;
            longBreakIsActive.value = false;
        })

        const currentBreakTime = computed(() => timeFormattedForDisplay(store.getters['pomodoro/breakTimeLeft']));
        const currentSessionTime = computed(() => timeFormattedForDisplay(store.getters['pomodoro/sessionTimeLeft']));
        const interval = computed(() => store.getters['pomodoro/sessionsToLongBreak']);

        const turnOnBreakTab = (isTrue) => breakIsActive.value = isTrue;
        const openSettings = () => {
            showSettings.value = true;
        }
        const closeSettings = () => {
            showSettings.value = false;
        }

        const resetCurrentTabTime = () => {
            if (breakIsActive.value) {
                if (interval.value === 1) {
                    store.dispatch('pomodoro/breakTimeLeft', {value: timerSettings.value.longBreak})
                } else {
                    store.dispatch('pomodoro/breakTimeLeft', {value: timerSettings.value.shortBreak})
                }
            } else {
                store.dispatch('pomodoro/sessionTimeLeft', {value: timerSettings.value.session});
            }
        }

        const startButtonHandler = () => {
            if ( countdownIsRunning.value ) {
                clearInterval(timer);
                countdownIsRunning.value = false;
            } else {
                countdown();
                countdownIsRunning.value = true;
            }
        }

        //Logic responsible for switching between tabs and stopping timer...

        watch(currentSessionTime, (val)=>{
            if (val === '00:00') {
                playSound();
                store.dispatch('pomodoro/decrementBreakInterval');
                countdownIsRunning.value = false;
                clearInterval(timer);
                breakIsActive.value = true;
                store.dispatch('pomodoro/sessionTimeLeft', {value: timerSettings.value.session});
            }
        })
        watch(currentBreakTime, (val)=> {
            if (val === '00:00') {
                playSound();
                countdownIsRunning.value = false;
                clearInterval(timer);
                

                if (interval.value > 1) {
                    longBreakIsActive.value = false;
                    store.dispatch('pomodoro/breakTimeLeft', {value: timerSettings.value.shortBreak})
                } else if (interval.value === 1) {
                    longBreakIsActive.value = true;
                    store.dispatch('pomodoro/breakTimeLeft', {value: timerSettings.value.longBreak})
                } else if (interval.value <= 0) {
                    longBreakIsActive.value = false;
                    store.dispatch('pomodoro/sessionsToLongBreak', {value: timerSettings.value.longBreakInterval})
                    store.dispatch('pomodoro/breakTimeLeft', {value: timerSettings.value.shortBreak})
                } 
                breakIsActive.value = false;
            }
        })

        function playSound() {
            alarmSound.value.play();
        }

        function countdown () {
            timer = setInterval(() => {
                if (breakIsActive.value) {
                    store.dispatch('pomodoro/decrementBreakTimeLeft');
                } else {
                    store.dispatch('pomodoro/decrementSessionTimeLeft');
                }
            }, 1000);
        }

        function timeFormattedForDisplay (inSeconds) {
            const formatted = (time) => time < 10 ? `0${time}` : `${time}`;
            const min = Math.floor( inSeconds / 60 );
            const sec = inSeconds % 60;

            return `${formatted(min)}:${formatted(sec)}`;
        }

        onBeforeRouteLeave(() => {
            let answear = true;

            if (countdownIsRunning.value)
            { 
               answear = window.confirm(
                'Do you really want to leave? Pomodoro clock will be stopped.'
                );
            }

            if (!answear) return false;
            
            clearInterval(timer);
        })

        return {
            alarmSound,
            breakIsActive, 
            showSettings, 
            closeSettings, 
            openSettings, 
            currentBreakTime, 
            currentSessionTime,
            turnOnBreakTab,
            countdownIsRunning,
            startButtonHandler,
            longBreakIsActive,
            resetCurrentTabTime
        }
    }
}
</script>
