<template>
    <backdrop 
        :show="showEditModal" 
        @closeBackdrop="turnOffModalHandler"></backdrop>
    <modal
        backgroundColor="linear-gradient(to right, #185a9d, #43cea2)"
        modalName="Edit task"
        :modalOpen="showEditModal" 
        @modalOff="turnOffModalHandler">
        <form class="EditTask" @submit.prevent="changeTask">
            <textarea 
                class="EditTask__textarea"
                v-model="inputValue"/>
            <submit-button :isFormValid="isFormValid"></submit-button>
        </form>
    </modal>
</template>

<script>
import Backdrop from '../../shared/Backdrop/Backdrop.vue';
import Modal from '../../shared/Modal/Modal.vue';
import SubmitButton from '../../shared/FormElements/SubmitButton/SubmitButton.vue';

export default {
    props: {
        showEditModal: { 
            type: Boolean,
            required: true 
        },
        taskDescription: {
            required: true
        },
        taskId: {
            required: true
        }
    },
    inject: ['turnOffModalHandler', 'changeTaskDescription'],
    components: {
        SubmitButton,
        Backdrop,
        Modal
   },
   data(){
       return {
           inputValue: '',
           isFormValid: false
       }
   },
   watch: {
        inputValue(value) {
            if (value !== undefined && (value.trim() === '' || value === '\n' || value === '\r')) {
                this.isFormValid = false;
            } 
            else {
                this.isFormValid = true;
            }
       },
       taskDescription(value) {
           this.inputValue = value;
       }
   },
   methods: {
       changeTask(){
           this.changeTaskDescription(this.taskId, this.inputValue);
           this.isFormValid = false;
       }
   }
   
}
</script>

<style scoped>
.EditTask {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.EditTask__textarea {
    width: 90%;
    /* height: 150px; */
    flex-grow: 1;
    /* flex-basis: 100%; */

    border-radius: 5px;
    padding: 10px;

    resize: none;

    font-family: 'Roboto', sans-serif;
    font-weight: bolder;
    font-size: 1rem;
    color: rgba(255,255,255, 0.8);

    background-color: rgba(0, 0, 0, 0.1);

    outline: none;
    border: none;
}

@media (min-width: 640px) {
    .EditTask__textarea {
        font-size: 1.4rem;
    }
}

@media (min-width: 992px) {
    .EditTask__textarea {
        font-size: 1.6rem;
    }
}

@media (min-width: 1200px) {
    .EditTask__textarea {
        font-size: 1.8rem;
    }
}
</style>
