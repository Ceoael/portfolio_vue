export default {
    setTimerSettings(state, payload) {
        state.timerSettings = payload.value;
    },
    setSessionTimeLeft(state, payload) {
        state.sessionTimeLeft =  payload.value * 60;
    },
    setBreakTimeLeft(state, payload) {
        state.breakTimeLeft = payload.value * 60;
    },
    setSessionsToLongBreak(state, payload) {
        state.sessionsToLongBreak = payload.value;
    },
    decrementSessionTimeLeft(state) {
        state.sessionTimeLeft -=  1;
    },
    decrementBreakTimeLeft(state) {
        state.breakTimeLeft -=  1;
    },
    decrementBreakInterval(state) {
        state.sessionsToLongBreak -= 1;
    }
}
