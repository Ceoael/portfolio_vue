<template>
    <form @submit.prevent="onSubmitHandler" class="TodoInput">
        <input 
            type="text"
            class="TodoInput__input"
            v-model="inputValue"
            placeholder="I have to do...">
        <button 
            type="submit"
            class="TodoInput__button"
            :class="buttonAttachedClasses">Add</button>
    </form>
</template>

<script>
export default {
    emits: ['addNewTaskToList'],
    data(){
        return {
            inputValue: ''
        }
    },
    methods: {
        onSubmitHandler(){
            if (this.inputValue.trim()) {
                this.$emit('addNewTaskToList', this.inputValue);
            }
            this.inputValue = '';
        }
    },
    computed: {
        buttonAttachedClasses(){
            return this.inputValue.length ? '' : 'TodoInput__button--disable';
        }
    }

}
</script>

<style scoped>
.TodoInput {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 10px 15px;
    margin: 60px 0 20px 0;
}


.TodoInput__input {
    width: 75%;

    background-color: transparent;
    border: none;
    
    margin-right: 20px; 

    outline: none;

    color: rgba(255,255,255, 0.8);

    font-family: 'Roboto', sans-serif;
    font-size: 1.25rem;
    font-weight: lighter;

    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, #185a9d, #43cea2);
    border-image-slice: 1;
}

.TodoInput__input::placeholder {
    color: rgba(255,255,255, 0.6);
}

.TodoInput__button {
    width: 25%;

    padding: 10px 0;

    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;

    background: #43cea2;

    border: none;
    border-radius: 5px;

    outline: none;
    cursor: pointer;

    transition: .3s all ease-in-out;
}

.TodoInput__button:active,
.TodoInput__button:hover {
    background: #185a9d;
    color: rgba(255,255,255, .8);
}

.TodoInput__button--disable {
    background: #43cea265;
    cursor: not-allowed;
}

.TodoInput__button--disable:active,
.TodoInput__button--disable:hover {
    background: #43cea265;
    color: black;
}

/* Media Queries */

@media (min-width: 640px) {
    .TodoInput__input {
        font-size: 1.75rem;
    }

    .TodoInput__button {
        font-size: 1.5rem;
    }
}

@media (min-width: 768px) {
    
}

@media (min-width: 992px) {
    .TodoInput__input {
        font-size: 2rem;
    }

    .TodoInput__button {
        font-size: 1.75rem;
    }
}

@media (min-width: 1200px) {
    
}
</style>