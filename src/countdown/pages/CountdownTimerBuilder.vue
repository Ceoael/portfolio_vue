<template>
    <background :customStyles="theme">
        <countdown-timer-wrapper v-if="loaded">
            <toolbar @openEditModal="openEditModal" 
            :eventLength="myEventListLength"
            v-model="rotationTime"/>

            <countdown
                v-for="(event, index) in myEventList"
                :key="event.id"

                :index = "index"
                :visibleEvent = "visibleEvent"
                :title="event.title"
                :id="event.id" 
                :endTime="endTime(event.id)" 
                :expired="event.expired" 

                @deleteEvent = "deleteEventInitialize"
                />
        </countdown-timer-wrapper>
        
        <spinner v-else/>
        <backdrop :show="show" @closeBackdrop="closeShow"/>
        <modal :modalOpen="show" @modalOff="closeShow" :modalName="modalTitle" :showCloseX="wrappedByModal !== 'add'">
            <delete v-if="wrappedByModal === 'delete'"
                :eventTitle="eventToDelete.title"
                @modalOff="closeShow"
                @confirmDeleteEvent="deleteEventHandler"/>
            <event-builder v-else 
                @modalOff="closeShow"
                @saveSettings="addNewEvent"/>
        </modal>
    </background>
</template>

<script>
import {v4 as uuidv4 } from 'uuid';

import Background from './../components/Background/Background.vue';
import CountdownTimerWrapper from './../components/CountdownTimerWrapper/CountDownTimerWrapper.vue';
import Countdown from './../components/Countdown/Countdown.vue';
import Modal from './../shared/Modal/Modal.vue';
import Backdrop from './../shared/Backdrop/Backdrop.vue';
import Delete from './../components/Delete/Delete.vue';
import Toolbar from './../components/Toolbar/Toolbar.vue';
import EventBuilder from './EventBuilder/EventBuilder.vue';
import Spinner from './../components/Spinner/Spinner.vue';

export default {
    components: {
        Background,
        CountdownTimerWrapper,
        Countdown,
        Modal,
        Backdrop,
        Delete,
        Toolbar,
        EventBuilder,
        Spinner
    },
    provide() {
        return {
            closeShow: this.closeShow,
            selectedThemeHandler: this.selectedThemeHandler
        }
    },
    data () {
        return {
            theme: null,
            rotationTime: 5,
            timer: null,
            wrappedByModal: 'add',
            show: false,
            myEventList: [
                {
                    title: 'New Year\'s Eve 2022',
                    date: new Date (2022,0,1,0,0).getTime(),
                    id: 'testId#0002aaaa',
                    expired: false
                },
                {
                    title: 'Random date',
                    date: new Date (2021,4,4,10,10).getTime(),
                    id: 'testId#0001aaaa',
                    expired: false
                }
            ],
            timeLeft: [
                {
                    id: 'testId#0002aaaa',
                    distance: null
                },
                {
                    id: 'testId#0001aaaa',
                    distance: null
                }
            ],
            eventToDelete: {
                id: null,
                title: null
            },
            visibleEvent: 0,
            switchTimeLeft: 0,
            loaded: false
        }
    },
    computed: {
        _switchTime() { 
            return this.rotationTime * 1000;
        },
        _seconds() {
            return 1000;
        },
        _minutes() {
            return this._seconds * 60;
        },
        _hours() {
            return this._minutes * 60;
        },
        _days() {
            return this._hours * 24;
        },
        modalTitle() {
            const capitalize = function ([firstLetter, ...restOfWord]) {
                return firstLetter.toUpperCase() + restOfWord.join('');
            }

            return `${capitalize(this.wrappedByModal)} event`;
        },
        myEventListLength() {
            return this.myEventList.length;
        }
    },
    watch: {
        myEventList(value) {
            localStorage.setItem('myEventList', JSON.stringify(value));
        },
        theme(value) {
            localStorage.setItem('countdownTimerTheme', JSON.stringify(value));
        },
        rotationTime() {
            this.switchTimeLeft = 0;
        }
    },
    methods: {
        selectedThemeHandler(value) {
            this.theme = value;
        },
        closeShow() {
            this.show = false;
        },
        endTime(id) {
            const findDistance = this.timeLeft.find((event)=>{
                return event.id === id;
            });

            if (findDistance.distance === null) return;

            return findDistance.distance
        },
        addNewEvent(data) {
            const newEvent = {
                title: data.eventDescription,
                date: data.date,
                id: uuidv4(),
                expired: false
            }

            this.timeLeft = [...this.timeLeft, {id: newEvent.id, distance: null}];
            this.myEventList = [...this.myEventList, newEvent];
        },
        deleteEventInitialize({id, title}) {
            this.wrappedByModal = 'delete';

            this.eventToDelete = {
                id,
                title
            }

            this.show = true;
        },
        deleteEventHandler() {
            const filteredMyEventList = this.myEventList.filter((event) => {
                return event.id !== this.eventToDelete.id
            }) 
            
            this.myEventList = filteredMyEventList;
            this.eventToDelete = {
                id: null,
                title: null
            }

            // If deleted element is last then change visibleElement to 0
            if (this.visibleEvent > (this.myEventListLength - 1)) {
                this.visibleEvent= 0;
            }

            this.switchTimeLeft= this._switchTime;
            //
            this.show = false;
        },
        rotateVisibleEvent(){
            if (!this.switchTimeLeft) {
                    this.visibleEvent++;
                    if (this.visibleEvent >= this.myEventListLength) this.visibleEvent = 0;

                    this.switchTimeLeft = this._switchTime;
                }
            this.switchTimeLeft -= 1000;
        },
        remainingTime() {
            this.timer = setInterval(() => {

                this.rotateVisibleEvent();

                const now = new Date().getTime();

                const temp_timeLeft = this.myEventList.map((event, index) => {
                    const end = event.date;
                    let distance = end - now;

                    if (distance <= 0) {
                        this.myEventList[index].expired = true;
                        distance = 0
                    }

                    return {
                        id: event.id,
                        distance: this.transformDistance(distance)
                    }
                })

                this.loaded = true;
                this.timeLeft = temp_timeLeft;
            }, 1000)
        },
        initializeTimeLeftArray() {
            return this.myEventList.map((event) => {
                return {
                    id: event.id,
                    distance: null
                }
            })
        },
        transformDistance(distance) {
            const days = Math.floor(distance / this._days);
            const hours = Math.floor((distance % this._days) / this._hours);
            const minutes = Math.floor((distance % this._hours) / this._minutes);
            const seconds = Math.floor((distance % this._minutes) / this._seconds);
               
            return {
                days,
                hours,
                minutes,
                seconds
            }
        },
        openEditModal() {
            this.wrappedByModal = 'add';
            this.show = true;
        }
    },
    mounted() {
        this.myEventList = JSON.parse(localStorage.getItem('myEventList')) || this.myEventList || [];
        this.theme = JSON.parse(localStorage.getItem('countdownTimerTheme')) || this.theme;
        this.switchTimeLeft = this._switchTime;
        this.timeLeft = this.initializeTimeLeftArray();
        this.remainingTime();
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
}
</script>
