<template>
    <div class="TodoTask">
        <div class="TodoTask__Content">
            <p 
                class="TodoTask__description"
                :class="attachClassesToDescription"
                @click="editTask(id)">{{ taskDescription }}</p>
            <button 
                :class="['TodoTask__Button', 'TodoTask__Button--done']"
                @click="taskListDoneHandler(id)">✓</button>
            <button 
                :class="['TodoTask__Button', 'TodoTask__Button--delete']"
                @click="taskListDeleteHandler(id)">X</button>
        </div>
        <div class="TodoTask__Date">
            <p>{{ addedDate }}</p>
            <p>{{ finishedDate }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'taskDescription',
        'status',
        'id',
        'addedDate',
        'finishedDate',
    ],
    inject: [
        'taskListDoneHandler',
        'taskListDeleteHandler',
        'turnOnModalHandler',
    ],
    computed: {
        attachClassesToDescription() {
            return this.status === 'done' ? 'TodoTask__description--done' : '';
        }
    },
    methods: {
        editTask(id){
            if(this.status !== 'done') {
                this.turnOnModalHandler(id)
            }
        }
    }
}
</script>

<style scoped>
.TodoTask {
    display: flex;
    flex-direction: column;

    background: linear-gradient(to right, #185a9d, #43cea2);
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
}

.TodoTask__Content {
    display: flex;
    align-items: center;

    
    /* margin-bottom: 10px; */
    padding: 10px;
}

.TodoTask__description {
    font-family: 'Roboto', sans-serif;
    font-size: 1.25rem;
    font-weight: lighter;
    color: rgba(255, 255, 255, 1);

    flex-grow: 1;

    overflow-wrap: anywhere;

    /* letter-spacing: 1px; */
    transition: all .3s ease-in-out;
}

.TodoTask__Date {
    display: flex;
    justify-content: space-between;

    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding-top: 5px;

    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
    color: rgba(255, 255, 255, 1);
}

.TodoTask__description--done {
    text-decoration: line-through rgba(255,255,255, .5);
    text-decoration-color: white;
    color: rgba(255, 255, 255, .6);
}

.TodoTask__Button {
    flex-shrink: 0;

    background: rgba(0,0,0, 0.6);

    margin: 0 5px;

    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: bolder;
    color: white;

    height: 35px;
    width: 35px;

    border: none;
    border-radius: 5px;

    outline: none;

    transition: .3s all ease-in-out;
}

.TodoTask__Button:hover {
    box-shadow: 0 0 5px 2px white;
}

.TodoTask__Button--done {
    background: rgb(0, 117, 0, 0.6);
}

.TodoTask__Button--delete {
    background: rgba(255,0,0, 0.6);
}

.TodoTask__Button--done:active {
    background: rgb(0, 117, 0, 1);
}

.TodoTask__Button--delete:active {
    background: rgba(255,0,0, 1);
}

/* Media Queries */

@media (min-width: 640px) {
    .TodoTask__description {
        font-size: 1.75rem;
    }

    .TodoTask__Button {
        font-size: 1.5rem;
        height: 40px;
        width: 40px;
    }
    
    .TodoTask__Date {
        font-size: 1rem;
    }
}

@media (min-width: 992px) {
    .TodoTask__description {
        font-size: 2rem;
    }

    .TodoTask__Button {
        font-size: 1.75rem;
        height: 50px;
        width: 50px;
    }

    .TodoTask__Date {
        font-size: 1.3rem;
    }
}

@media (min-width: 1200px) {
    .TodoTask__description {
        font-size: 1.75rem;
    }

    .TodoTask__Button {
        font-size: 1.5rem;
        height: 40px;
        width: 40px;
    }
    /* .TodoTask__Date {
        font-size: 1.4rem;
    } */
}

</style>
