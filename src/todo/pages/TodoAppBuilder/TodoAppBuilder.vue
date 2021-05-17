<template>
  <todo-app-wrapper>
    <edit-task
      :taskDescription="getTaskDescription(taskIdForEditModal)"
      :showEditModal="showEditModal"
      :taskId="taskIdForEditModal"
      ></edit-task>
    <todo-input @addNewTaskToList="addNewTaskToList"></todo-input>
    <todo-tasks 
      :taskList="filterListHandler()"></todo-tasks>
  </todo-app-wrapper>
</template>

<script>
  import TodoAppWrapper from '../../components/TodoAppWrapper/TodoAppWrapper.vue';
  import TodoInput from '../../components/TodoInput/TodoInput.vue';
  import TodoTasks from '../../components/TodoTasks/TodoTasks.vue';
  import EditTask from '../../components/EditTask/EditTask.vue';

  import uuid4 from 'uuid';

  export default {
    components: {
      TodoInput,
      TodoAppWrapper,
      TodoTasks,
      EditTask
    },
    provide() {
      return {
        setFilterBy: this.setFilterBy,
        taskListDoneHandler: this.taskListDoneHandler,
        taskListDeleteHandler: this.taskListDeleteHandler,
        turnOnModalHandler: this.turnOnModalHandler,
        turnOffModalHandler: this.turnOffModalHandler,
        changeTaskDescription: this.changeTaskDescription
      }
    },
    data(){
      return{
        taskList: [],
        filterBy: 'all',
        showEditModal: false,
        taskIdForEditModal: null
      }
    },
    methods: {
      getCurrentTime() {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${date.toLocaleDateString()} ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`
      },
      addNewTaskToList(description) {
        const newTask = {
            description,
            id: uuid4(), 
            // id: new Date().getTime(),
            status: 'undone',
            addedDate: this.getCurrentTime(),
            finishedDate: ''
        }
        this.taskList = [...this.taskList, newTask];
      },
      filterListHandler() {
        return this.taskList.filter((task) => {
            if (this.filterBy === 'all') {
              return true;
            }
            return task.status === this.filterBy;
        })
      },
      setFilterBy(value) {
        this.filterBy = value;
      },
      taskListDoneHandler(id) {
        const updatedTaskList = this.taskList.map((task) => {
            if ( task.id === id) {
                if (task.status === 'done') return {...task, status: 'undone', finishedDate: ''}
                return {...task, status: 'done', finishedDate: this.getCurrentTime()}
            }
            return task;
        });
        this.taskList = updatedTaskList;
      },
      taskListDeleteHandler(id) {
        const updatedTaskList = this.taskList.filter((task) => task.id !== id);
        this.taskList = updatedTaskList;
      },
      turnOnModalHandler(id){
        this.taskIdForEditModal = id;
        this.showEditModal = true;
      },
      turnOffModalHandler() {
        this.taskIdForEditModal = null;
        this.showEditModal = false;
      },
      getTaskDescription(id) {
        if (id === null) return;
        const searchedTask = this.taskList.filter( task => task.id === id )[0];
        return searchedTask.description;
      },
      changeTaskDescription(id, newDescription) {
          this.taskList.map( task => {
          if (task.id === id) {
            task.description = newDescription;
            task.addedDate = this.getCurrentTime();
          }
          this.taskIdForEditModal = null;
          this.showEditModal = false;
        })
      }
    },
    watch: {
      taskList(newTaskList) {
        localStorage.setItem('taskList', JSON.stringify(newTaskList));
      }
    },
    mounted() {
      this.taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    }
  }

</script>
