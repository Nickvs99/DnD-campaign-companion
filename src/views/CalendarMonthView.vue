<template>

<div class="calendar-view-container">
    <div class="title-container">
        <ChevronLeft @click="goToPreviousMonth"/>
        <div class="calendar-title">{{ month }} - {{ year }}</div>
        <ChevronRight @click="goToNextMonth"/>
    </div>

    <div class="calendar-container">

        <div class="day-name-container">
            <div v-for="dayName in dayNames" :key="dayName" class="day-name calendar-item">{{dayName.slice(0,3) }}</div>
        </div>

        <div ref="monthContainer" class="month-container">
            <div v-for="day in nDays" class="day-container calendar-item" :key="day" @click="goToDayView(day)">
                <div class="day-count">{{ day }}</div>
                <div v-if="events != null"  class="event-container">
                    <CalendarEvent v-for="evt in events[day]" :event="evt" :key="evt" />
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import CalendarEvent from "@/components/CalendarEvent.vue";
import ChevronLeft from "@/assets/icons/ChevronLeft.vue";
import ChevronRight from "@/assets/icons/ChevronRight.vue";

import { objectContainsKeys } from "@/util.js";
import { getNextMonth, getPreviousMonth, sortEvents } from "@/router/calendarUtil.js";

export default {
    name: "CalendarMonthView",
    components: { CalendarEvent, ChevronLeft, ChevronRight },
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
            events: {},
            nDays: null,
            nWeeks: null,
            dayNames: null,
        };
    },
    mounted() {

        let customEvents = localStorage.getObject("events");

        let keys = [this.year, this.month];
        if(customEvents && objectContainsKeys(customEvents, keys)) {
            this.events = customEvents[this.year][this.month];
        }

        if(objectContainsKeys(this.calendar.events, keys)) {

            for(let day in this.calendar.events[this.year][this.month]) {
                let dayEvents = this.calendar.events[this.year][this.month][day];

                // If there are already events at this date, then add them to the
                // existing
                if(objectContainsKeys(this.events, [day])) {
                    this.events[day].push(...dayEvents);
                }
                else {
                    this.events[day] = dayEvents;
                }
            }
        }

        sortEvents(this.events);

        this.nWeeks = this.calendar.weeksPerMonth;
        this.nDays = this.nWeeks * this.calendar.dayNames.length;
        this.dayNames = this.calendar.dayNames;

        window.addEventListener("resize", this.setCalendarHeight);
        this.setCalendarHeight();

        // Firefox does not support the :has selector, therefore the styles are manually added
        let el = document.getElementById("content-wrapper");
        let style = window.getComputedStyle(el);
        if(style.overflow != "visible") {
            el.classList.add("content-wrapper-firefox");
        }

    },
    unmounted() {
        window.removeEventListener("resize", this.setCalendarHeight);
        document.getElementById("content-wrapper").classList.remove("content-wrapper-firefox");
    },
    methods: {
        
        /**
         * Sets height such that it fills remaining height to the bottom
         */
        setCalendarHeight() {
            let el = this.$refs.monthContainer;
            el.style.height = (document.documentElement.clientHeight - el.getBoundingClientRect().top) - 1 + "px";
        },
        goToDayView(day) {
            let targetPath = this.$route.path + "/" + day;
            this.$router.push(targetPath);
        },
        goToDate(monthName, year) {

            // Remove year and month parts from the url
            let calendarPath = this.$route.path.split("/").slice(0, -2).join("/");
            let targetPath = [calendarPath, year, monthName].join("/");

            this.$router.push(targetPath);
        },
        goToPreviousMonth() {

            let monthIndex = this.calendar.monthNames.indexOf(this.month) + 1;
            let [month, year] = getPreviousMonth(monthIndex, this.year, this.calendar);
            let monthName = this.calendar.monthNames[month - 1];

            this.goToDate(monthName, year); 
        },
        goToNextMonth() {
            
            let monthIndex = this.calendar.monthNames.indexOf(this.month) + 1;
            let [month, year] = getNextMonth(monthIndex, this.year, this.calendar);
            let monthName = this.calendar.monthNames[month - 1];

            this.goToDate(monthName, year);
        }
    },
};

</script>

<style lang="scss">

@import "@/styles/_mixins.scss";

@mixin content-wrapper-override {
    // Show overflow since the month container should span the entire width of the screen
    overflow: visible !important;

    // This still creates a new Block formatting context
    float: left;
}

.content-wrapper-firefox {    
    @include content-wrapper-override;
}

#content-wrapper:has(.calendar-view-container) {    
    @include content-wrapper-override;
}

</style>

<style lang="scss" scoped>

@import "@/styles/_mixins.scss";

.title-container { 
    display: flex;
    justify-content: space-around;
    
    margin: 0.75rem 0;

    svg {
        width: 1.5rem;
    }
}

.calendar-title {
    font-size: 1.5rem;
}

.calendar-container {
    // Fill entire width, since each px is valuable
    margin: 0 -5%;
}

.calendar-item {
    overflow: hidden;
}

.day-name-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: calc(1rem + 4px);
    margin: 2px 0;
}

.day-name {
    text-align: center;
    font-style: italic;
}

.month-container {
    @include hide-scrollbar;

    * {
        @include hide-scrollbar;
    }

    display: grid;
    grid-template: repeat(4, 1fr) / repeat(7, 1fr);

    // Removes double borders
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-left: 1px solid rgba(0, 0, 0, 0.15);
}

.day-container {    
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    padding: 5px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
}

.day-count {    
    width: 100%;

    text-align: center;
    font-weight: bold;;
}

.event-container {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    
    overflow: scroll;
}

</style>