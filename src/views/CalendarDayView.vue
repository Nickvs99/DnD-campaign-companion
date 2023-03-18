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
        </div>
    </div>

    <div v-else>
        <CenterToScreen class="no-events-container">
            <CalendarIcon />
            <h1>Nog geen plannen voor vandaag</h1>
        </CenterToScreen>
    </div>

</div>

</template>

<script>

import CalendarIcon from "@/assets/icons/CalendarIcon.vue";
import CenterToScreen from "@/components/CenterToScreen.vue";
import ChevronLeft from "@/assets/icons/ChevronLeft.vue";
import ChevronRight from "@/assets/icons/ChevronRight.vue";

import { getNextDay, getPreviousDay } from "@/router/calendarUtil.js";

export default {
    name: "CalendarDayView",
    components: { CalendarIcon, CenterToScreen, ChevronLeft, ChevronRight },
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
            events: null,
        };
    },
    mounted() {
        this.events = this.calendar.events[this.year][this.month][this.day];
    },

    methods: {
        goToDate(day, monthName, year) {

            // Remove year and month parts from the url
            let calendarPath = this.$route.path.split("/").slice(0, -3).join("/");
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
        }
    }
};

</script>

<style lang="scss">

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
    background-color: rgba(0, 0, 0, 0.15);
    font-size: 1rem;

    border-radius: 4px;
    padding: 0.5rem;
}

.no-events-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.no-events-container h1 {
    margin-block-start: 0;
    text-align: center;
}

.no-events-container svg{
    aspect-ratio: 1/1;
    width: 10rem;
}

</style>