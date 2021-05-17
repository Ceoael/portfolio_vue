<template>
    <settings-form 
        @changeSettings="editSettings"
        @closeSettings="closeSettingsModal"/>
</template>

<script>
    // VALIDATION is in SettingsForm  
    import SettingsForm from '../../components/SettingsForm/SettingsForm.vue';

    import { useStore } from 'vuex';

    export default {
        components: {
            SettingsForm
        },
        emits: ['modalOff'],
        setup(_, context) {
            const store = useStore();

            const closeSettingsModal = () => {
                context.emit('modalOff');
            }

            const editSettings = (settingsData) => {
                const newSettings = objectValuesToNumber(settingsData);
                store.dispatch('pomodoro/timerSettings', {value: newSettings})
                closeSettingsModal();   
            }
            
            function objectValuesToNumber (settingsData) {
                const formattedObject = {};
                for ( const[key, value] of Object.entries(settingsData)) {
                    formattedObject[key] = +value;
                }
                return formattedObject;
            }

            return { closeSettingsModal, editSettings }
        }
    }
</script>
