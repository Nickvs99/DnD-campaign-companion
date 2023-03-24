<template>

<div>
    <div class="title-container">
        <ChevronLeft @click="goToPreviousDay"/>
        <div class="day-title"> {{ day }} - {{month }} - {{ year }} </div>
        <ChevronRight @click="goToNextDay"/>
    </div>

    <div v-if="events && events.length != 0" class="event-container">
        <div v-for="(evt, i) in events" class="event" :key="i">
            {{ evt.join(" ") }}
            <CloseIcon v-if="this.customEvents && this.customEvents.includes(evt)" @click="removeEvent(evt)" class="delete-icon" />
        </div>
        <button @click="goToCreateEvent" class="event">
            Add event
        </button>
    </div>

    <div v-else>
        <IconWithHeader header="No events planned for today">
            <CalendarIcon />
        </IconWithHeader>

        <button @click="goToCreateEvent" class="create-event-button"><AddIcon /></button>
    </div>
</div>

</template>

<script>

import AddIcon from "@/assets/icons/AddIcon.vue";
import CalendarIcon from "@/assets/icons/CalendarIcon.vue";
import ChevronLeft from "@/assets/icons/ChevronLeft.vue";
import ChevronRight from "@/assets/icons/ChevronRight.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import IconWithHeader from "@/components/IconWithHeader.vue";

import { objectContainsKeys } from "@/util.js";
import { getNextDay, getPreviousDay, sortEventFn } from "@/router/calendarUtil.js";
import { Component } from "@/router/lazyLoadComponents.js";
import { prefetchComponents } from "@/router/util.js";

export default {
    name: "CalendarDayView",
    components: { AddIcon, CalendarIcon, ChevronLeft, ChevronRight, CloseIcon, IconWithHeader },
    props: {
        calendar: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            year: parseInt(this.$route.params.year),
            month: this.$route.params.month,
            day: parseInt(this.$route.params.day),
            events: [],
            customEvents: null,
        };
    },
    mounted() {

        prefetchComponents(Component.CreateCalendarEventView);
        
        let customEvents = localStorage.getObject(this.calendar.localStorageKey);

        let keys = [this.year, this.month, this.day];
        if(customEvents && objectContainsKeys(customEvents, keys)) {
            this.events = customEvents[this.year][this.month][this.day].slice();
            this.customEvents = customEvents[this.year][this.month][this.day];
        }

        if(objectContainsKeys(this.calendar.events, keys)) {
            let dayEvents = this.calendar.events[this.year][this.month][this.day];
      
            if(this.events) {
                this.events.push(...dayEvents);
            }
            else {
                this.events = dayEvents;
            }
        }

        this.events.sort(sortEventFn);
    },

    methods: {
        getCalendarPath() {
            // Remove day, month, and year parts from the url
            return this.$route.path.split("/").slice(0, -3).join("/");
        },
        goToDate(day, monthName, year) {

            let calendarPath = this.getCalendarPath();
            let targetPath = [calendarPath, year, monthName, day].join("/");

            this.$router.push(targetPath);
        },
        goToPreviousDay() {

            let monthIndex = this.calendar.monthNames.indexOf(this.month) + 1;
            let [day, month, year] = getPreviousDay(this.day, monthIndex, this.year, this.calendar);
            let monthName = this.calendar.monthNames[month - 1];

            this.goToDate(day, monthName, year); 
        },
        goToNextDay() {
            
            let monthIndex = this.calendar.monthNames.indexOf(this.month) + 1;
            let [day, month, year] = getNextDay(this.day, monthIndex, this.year, this.calendar);
            let monthName = this.calendar.monthNames[month - 1];

            this.goToDate(day, monthName, year);
        },
        goToCreateEvent() {
            let calendarPath = this.getCalendarPath();
            let targetPath = calendarPath + "/new";
            this.$router.push({path: targetPath, query: { day: this.day, month: this.month, year: this.year }});
        },
        removeEvent(evt) {
            // Remove event from the current shown events
            this.events = this.events.filter(item => !this.areArraysEqual(item, evt));
            
            // Remove event from localstorage
            let customEvents = localStorage.getObject(this.calendar.localStorageKey);
            customEvents[this.year][this.month][this.day] = customEvents[this.year][this.month][this.day].filter(item => !this.areArraysEqual(item, evt));
            localStorage.setObject(this.calendar.localStorageKey, customEvents);
        },
        areArraysEqual(arr1, arr2) {
            if (arr1 === arr2) return true;
            if (arr1 == null || arr2 == null) return false;
            if (arr1.length !== arr2.length) return false;

            for (var i = 0; i < arr1.length; ++i) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        }
    }
};

</script>

<style lang="scss" scoped>

.title-container { 
    display: flex;
    justify-content: space-around;
    
    margin: 0.75rem 0;

    svg {
        width: 1.5rem;
    }
}

.day-title {
    font-size: 1.5rem;
}

.event-container {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
}

.event {
    background-color:  var(--secondary-color);
    font-size: 1rem;

    border-radius: 4px;
    padding: 0.5rem;
}

.create-event-button {
    position: fixed;
    bottom: 5vw;
    right: 5vw;

    width: 5rem;
    padding: 0.5em;

    border-radius: 1rem;
}

.delete-icon {
    width: 1em;
    float: right;
}

</style>