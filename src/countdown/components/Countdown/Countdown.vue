<template>
    <transition name="smooth" >
        <div class="Countdown"
            v-show="visibleEvent === index"
            :key="id"
        >   <div class="Countdown__Header">
                <h2 class="Countdown__Title">
                    {{title}}
                </h2> 
                <!-- <span class="material-icons"  :class="'Countdown__Delete'" @click="clickHandler">delete</span> -->
                <span class="material-icons" :class="'Countdown__Delete'" @click="clickHandler">delete_outline</span>
            </div>
            <div class="Countdown__TimeLeft">
                <CountdownPart :expired="expired" unit="days" :value="endTime.days"/>
                <CountdownPart :expired="expired" unit="hrs" :value="endTime.hours"/>
                <CountdownPart :expired="expired" unit="min" :value="endTime.minutes"/>
                <CountdownPart :expired="expired" unit="sec" :value="endTime.seconds"/>
            </div>
        </div>
    </transition>
</template>

<script>
import CountdownPart from './CountdownPart/CountdownPart.vue';

export default {
    components: {
        CountdownPart
    },
    emits:['deleteEvent'],
    props: {
        index: {
            type: Number,
            required: true
        },
        visibleEvent : {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        endTime: {
            default: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        },
        expired: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickHandler() {
            this.$emit('deleteEvent', {id: this.id, title: this.title});
        }
    }
}
</script>

<style scoped>

    /* Animation doesn't work when using scoped (why?), moved keyframes to global styles */
    /* @keyframes smoothInSwitch {
        0% { opacity: 0; }
        80% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    @keyframes smoothOutSwitch {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 0; }
    } */

    .smooth-enter-active {
        animation: smoothInSwitch 2s ease-in-out;
    }
    .smooth-leave-active {
        animation: smoothOutSwitch 2s ease-in-out;
    }

    .Countdown {
        display: block;

        margin: 0 auto;
        margin-top: 60px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
        width: 100%;
        padding: 0 10px;

        position: absolute;
        left:0;
        right: 0;
    }

    .Countdown__Header {
        display: flex;
        justify-content: center;
        
    }

    .Countdown__Title {
        flex-grow: 1;

        padding: 10px 10px;
        
        font-family: 'Roboto', sans-serif;
        font-weight: lighter;
        font-size: 2rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
    }

    .Countdown__Delete {
        padding: 0 10px;
        font-size:  32px;
        align-self: center;
        
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: .3s all ease;

        overflow: hidden;
    }

    .Countdown__Delete:hover {
        color: #ec4646;
    }


    .Countdown__TimeLeft {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 568px) {
        .Countdown__TimeLeft {
            flex-direction: row;
            flex-wrap: nowrap
        }
        .Countdown__Delete {
            font-size: 2rem;
        }
    }

    @media (min-width: 1024px) {
        .Countdown {
            width: 70%;
        }
    }

    @media (min-width: 1200px) {
        .Countdown {
            width: 50%;
        }
    }
</style>
