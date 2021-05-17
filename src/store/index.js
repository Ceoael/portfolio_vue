import { createStore } from 'vuex';

import pomodoroStore from './pomodoro/index';

const store = createStore({
    modules: {
        pomodoro: pomodoroStore
    }
});

export default store;
