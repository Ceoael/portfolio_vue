<template>
    <event-form 
        @addNewEvent="addNewEventHandler"/>
</template>

<script>
    // VALIDATION is in EventForm  
    import EventForm from './../../components/EventForm/EventForm.vue';

    export default {
        components: {
            EventForm
        },
        emits: ['saveSettings', 'modalOff'],
        methods: {
            cancelCreatingNewEvent() {
                this.$emit('modalOff');
            },
            createDateInMiliseconds(eventData) {
                return new Date(
                    +eventData.year,
                    +eventData.month - 1,
                    +eventData.day,
                    +eventData.hour,
                    +eventData.minute).getTime()
            },
            addNewEventHandler(eventData) {
                const newEventDate = this.createDateInMiliseconds(eventData);
                this.$emit('saveSettings', {eventDescription: eventData.eventDescription, date: newEventDate});
                this.cancelCreatingNewEvent();   
            }
        }
    }
</script>

<style scoped>

</style>
