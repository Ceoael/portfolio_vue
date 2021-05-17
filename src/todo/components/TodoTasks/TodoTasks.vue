<template>
    <div class="TodoTasks">
        <todo-filter></todo-filter>
        
        <transition-group 
            name="TodoTasks__Task">
            
            <todo-task v-for="task in taskList"
                :key="task.id" 
                :id="task.id" 
                :status="task.status" 
                :taskDescription="task.description"
                :addedDate="task.addedDate"
                :finishedDate="task.finishedDate"></todo-task>
            
        </transition-group>
                    
    </div>
</template>

<script>
import TodoFilter from './TodoFilter/TodoFilter.vue';
import TodoTask from './TodoTask/TodoTask.vue';

export default {
    props: ['taskList'],
    components: {
        TodoFilter,
        TodoTask
    }, 
}
</script>

<style scoped>
.TodoTasks {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
}

.TodoTasks__Task-enter-active,
.TodoTasks__Task-leave-active {
    opacity: 1;
    transition: opacity .5s ease;
  
}

.TodoTasks__Task-leave-active{
    position: absolute;
    width: 100%;
} 

.TodoTasks__Task-enter-from,
.TodoTasks__Task-leave-to {
    opacity: 0;
} 

.TodoTasks__Task-move {
    transition: transform .5s ease;
}
</style>
