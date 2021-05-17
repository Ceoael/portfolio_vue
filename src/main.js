import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import store from './store';
import App from './App.vue'
import ProjectsPresentation from './components/ProjectsPresentation/ProjectsPresentation.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/countdown', component: () => import(/* webpackChunkName: "countdown" */ "./countdown/pages/CountdownTimerBuilder.vue")},
        { path: '/pomodoro', component: () => import(/* webpackChunkName: "pomodoro" */ "./pomodoro/containers/PomodoroBuilder/PomodoroBuilder.vue")},
        { path: '/todo', component: () => import(/* webpackChunkName: "todo" */ "./todo/pages/TodoAppBuilder/TodoAppBuilder.vue")},
        { path: '/', component: ProjectsPresentation },
        { path: '/:notFound(.*)', redirect: '/'}
    ]
})

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
