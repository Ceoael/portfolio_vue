<template>
    <div class="projectsPresentation">
        <project 
            title="Countdown Timer"
            to="/countdown"
            githubLink="https://github.com/Ceoael/countdown_vue"
            projectImageMobile="img/countdown_timer.png"
            >
            Simple countdown timer. User can add countdown by clicking on + button. Input is validated with 'vee-validate' and 'yup' libraries. Background color and animation duration also can be changed. Used Options API.
        </project>
        <project 
            title="Todo App"
            to="/todo"
            githubLink="https://github.com/Ceoael/todo_vue"
            projectImageMobile="img/todoapp.png"
            >
            Todo application. User can add new task, mark it as done, update or delete it. There is also ability to filter tasks by 'all', 'done' and 'undone'. Used Options API.
        </project>
        <project 
            title="Pomodoro"
            to="/pomodoro"
            githubLink="https://github.com/Ceoael/pomodoro_vue"
            projectImageMobile="img/pomodoro.png"
            >
            Pomodoro Timer. User can change settings( session, short break and long break duration and also interval between long break ). Form is validated by 'vee-validate' and 'yup' packages. Used Composition API and Vuex for state management.
        </project>
        <project 
            title="Weather App"
            :outside="true"
            to="https://ceoael-weather-app-challenge.herokuapp.com/"
            githubLink="https://github.com/Ceoael/weather-app-vue"
            projectImageMobile="img/weather-app-challenge.png"
            :scrollable="true"
            >
            Weather App created as a submission to a <CustomLink linkTo="https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv">DevChallenges</CustomLink> challenge. User can see weather forecast for current day (incl. temperature, humidity, wind speed, wind direction, visibility, air pressure) and weather of the next 5 days. Image change according to each type of weather. User can search weather for specific place (supports only english place names) or use geolocation to search for nearest available location. Using free API: <CustomLink linkTo="https://www.metaweather.com/api/">metaweather</CustomLink>. Used Options API and Vuex for state management.
        </project>
    </div>
</template>

<script>
import Project from './Project/Project.vue';
import CustomLink from './CustomLink/CustomLink.vue';

export default {
    name: "ProjectsPresentation",
    components: {
        Project,
        CustomLink
    }
}
</script>

<style scoped>
.projectsPresentation {
    margin: 0 auto;
    max-width: 800px;
    min-height: 100vh;
    padding: 25px;
    padding-top: 75px;
}
</style>
