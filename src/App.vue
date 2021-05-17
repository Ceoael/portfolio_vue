<template>
    <div>
        <toolbar :showSideDrawer="showSideDrawer" @openSideDrawer="openSideDrawer"/>
        <side-drawer :show="showSideDrawer" @closeSideDrawer="closeSideDrawer"/>
        <router-view v-slot="{ Component }" >
            <transition name="moveUp" mode="out-in">
                <component :is="Component" :key="$route.path"/>
            </transition>
        </router-view>
        <!-- <transition name="moveUp" mode="out-in">
            <router-view :key="$route.path"/>
        </transition> -->
    </div>
</template>

<script>
    import SideDrawer from './components/SideDrawer/SideDrawer.vue';
    import Toolbar from './components/Toolbar/Toolbar.vue';

    export default {
        name: "App",
        components: {
            Toolbar,
            SideDrawer,
        },
        data() {
            return {
                showSideDrawer: false,
            }
        },
        methods: {
            openSideDrawer() {
                this.showSideDrawer = true;
            },
            closeSideDrawer() {
                this.showSideDrawer = false;
            }
        }
    }
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body {
    background: #100E1D;
}
@keyframes smoothInSwitch {
    0% { opacity: 0; }
    80% { opacity: 0; }
    100% { opacity: 1; }
}
@keyframes smoothOutSwitch {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
}

.moveUp-enter-active {
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}

@keyframes breathEffect {
    100% {
        background-color: rgba(0,0,0,0.5);
        border-color: rgba(255,255,255, 0.6);
    }
}
</style>
