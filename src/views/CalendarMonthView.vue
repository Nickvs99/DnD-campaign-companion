<template>

<div class="calendar-view-container">
    <div class="calendar-title">{{ month }} - {{ year }}</div>
    <div class="calendar-container">

        <div class="day-name-container">
            <div v-for="dayName in dayNames" :key="dayName" class="day-name calendar-item">{{dayName.slice(0,3) }}</div>
        </div>

        <div ref="monthContainer" class="month-container">
            <div v-for="day in nDays" class="day-container calendar-item" :key="day">
                <div class="day-count">{{ day }}</div>
                <div class="event-container">
                    <CalendarEvent v-for="evt in events[day]" :event="evt" :key="evt" />
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>

import CalendarEvent from "@/components/CalendarEvent.vue";

export default {
    name: "CalendarMonthView",
    components: { CalendarEvent },
    props: {
        calendar: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            year: this.$route.params.year,
            month: this.$route.params.month,
            events: null,
            nDays: null,
            nWeeks: null,
            dayNames: null,
        };
    },
    mounted() {
        
        this.events = this.calendar.events[this.year][this.month];
        this.nWeeks = this.calendar.weeksPerMonth;
        this.nDays = this.nWeeks * this.calendar.dayNames.length;
        this.dayNames = this.calendar.dayNames;

        window.addEventListener("resize", this.setCalendarHeight);
        this.setCalendarHeight();
    },
    unmounted() {
        window.removeEventListener("resize", this.setCalendarHeight);
    },
    methods: {
        
        /**
         * Sets height such that it fills remaining height to the bottom
         */
        setCalendarHeight() {
            let el = this.$refs.monthContainer;
            el.style.height = (document.documentElement.clientHeight - el.getBoundingClientRect().top) - 1 + "px";
        },
    },
};

</script>

<style lang="scss">

@import "@/styles/_mixins.scss";

.content-wrapper:has(.calendar-view-container) {
    // Show overflow since the month container should span the entire width of the screen
    overflow: visible;

    // This still creates a new Block formatting context
    float: left;
}

.calendar-title {
    text-align: center;
    font-size: 1.5rem;
    margin: 0.5em 0;
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