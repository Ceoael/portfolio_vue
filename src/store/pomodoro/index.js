import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const pomodoroStore = {
    namespaced: true,
    state() {
        return {
            timerSettings: {
                session: 25,
                shortBreak: 5,
                longBreak: 15,
                longBreakInterval: 2
            },
            sessionTimeLeft: 25*60,
            breakTimeLeft: 5*60,
            sessionsToLongBreak: 2
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
};

export default pomodoroStore;
