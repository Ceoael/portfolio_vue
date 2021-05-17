export default {
    timerSettings(context, payload) {
        context.commit('setTimerSettings', {value: payload.value});
    },
    sessionTimeLeft(context, payload) {
        context.commit('setSessionTimeLeft', {value: payload.value});
    },
    breakTimeLeft(context, payload) {
        context.commit('setBreakTimeLeft', {value: payload.value});
    },
    sessionsToLongBreak(context, payload) {
        context.commit('setSessionsToLongBreak', {value: payload.value});
    },
    decrementSessionTimeLeft(context) {
        context.commit('decrementSessionTimeLeft');
    },
    decrementBreakTimeLeft(context) {
        context.commit('decrementBreakTimeLeft');
    },
    decrementBreakInterval(context) {
        context.commit('decrementBreakInterval');
    }
}
