<template>
    <div class="TodoFilter">
        <p class="TodoFilter__description">Show: </p>
        <button v-for="buttonName in buttonNames" 
            :key="buttonName"
            :name="buttonName"
            @click="clickHandler(buttonName)"
            class="TodoFilter__button"
            :class="attachClasses(buttonName)">{{ buttonName }}</button>
    </div>
</template>

<script>
export default {
    inject: ['setFilterBy'],
    data() {
        return {
            buttonNames: ['all', 'done', 'undone'],
            activeButton: 'all'
        }
    },
    methods: {
        clickHandler(buttonName) {
            this.activeButton = buttonName;
            this.setFilterBy(buttonName);
        },
        attachClasses(buttonName) {
            return buttonName === this.activeButton ? 'TodoFilter__button--active' : '';
        }
    }
}
</script>

<style scoped>
.TodoFilter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 20px;
    padding: 10px 0;

    background: rgba(0,0,0, 0.2);

    border-radius: 5px;
}

.TodoFilter__description {
    flex-grow: 1;

    padding: 0 10px;

    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: lighter;
    color: white;
}

.TodoFilter__button {
    padding: 5px 10px;
    margin: 0 5px;

    font-family: 'Roboto', sans-serif;
    font-size: .8rem;
    font-weight: lighter;
    text-transform: capitalize;

    background: rgba(0,0,0, 0.5);
    color: white;

    border: none;
    border-radius: 5px;

    outline: none;

    transition: .3s all ease-in-out;
}

.TodoFilter__button:hover {
    box-shadow: 0 0 3px 0px white;
}

.TodoFilter__button--active {
    font-weight: bold;
    background: #43cea2;
    color: black;
}

/* Media Queries */

@media (min-width: 640px) {
    .TodoFilter__description {
        font-size: 1.5rem;
    }
    .TodoFilter__button {
        font-size: 1.1rem;
    }
}

@media (min-width: 992px) {
    .TodoFilter__button {
        font-size: 1.3rem;
    }
}

@media (min-width: 1200px) {
    .TodoFilter__button {
        font-size: 1.1rem;
    }
}
</style>