<template>
    <div class="SettingsForm">
        <Form ref="formRef" class="SettingsForm__Form" @submit="handleSubmit" :validation-schema="schema">
            <Input
                name="session"
                type="number"
                label="Session"
                :placeholder="timerSettings.session"/>
            <Input
                name="shortBreak"
                type="number"
                label="Short Break"
                :placeholder="timerSettings.shortBreak"/>
            <Input
                name="longBreak"
                type="number"
                label="Long Break"
                :placeholder="timerSettings.longBreak"/>
            <Input
                name="longBreakInterval"
                type="number"
                label="Long Break Interval"
                :placeholder="timerSettings.longBreakInterval"/>
            <div class="SettingsForm__ButtonWrapper">
                <Button type="button" @buttonClicked="handleCancelButton">CANCEL</Button>
                <Button type="submit">OK</Button>
            </div>
        </Form>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import { Form } from 'vee-validate';
import { object, number } from 'yup';

import Input from './Input/Input.vue';
import Button from './Button/Button.vue';


export default {
    components: {
        Form,
        Input,
        Button
    },
    emits: ['changeSettings', 'closeSettings'],
    setup(_, context){
        const store = useStore();
        const formRef = ref(null);

        const timerSettings = computed(() => store.getters['pomodoro/timerSettings']);

        const schema = object().shape({
            session: number().typeError('session must be a number').required().min(0.1).max(120),
            shortBreak: number().typeError('short break must be a number').required().min(0.1).max(30),
            longBreak: number().typeError('long break must be a number').required().min(0.1).max(120),
            longBreakInterval: number().typeError('long break interval must be a number').required().min(2).max(10)
        })

        const handleSubmit = (settingsData, { resetForm }) => {
            resetForm();
            context.emit('changeSettings', settingsData);
            context.emit('closeSettings'); 
        }

        const handleCancelButton = () => {
            formRef.value.resetForm(); 
            context.emit('closeSettings');
        }

        return {formRef, handleSubmit, handleCancelButton, schema, timerSettings}
    }
}
</script>

<style scoped>
.SettingsForm {
    max-width: 400px;
    padding: 10px 0;
}
.SettingsForm__ButtonWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>