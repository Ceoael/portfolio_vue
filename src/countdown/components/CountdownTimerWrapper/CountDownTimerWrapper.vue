<template>
    <div class="CountdownTimerWrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
    .CountdownTimerWrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        
        width: 100%;
        min-height: 100vh;

        padding-top: 60px;
        overflow: hidden;
    }
</style>