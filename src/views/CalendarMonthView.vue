<template>

<div class="calendar-container">
    <div class="calendar-title">{{ month }} - {{ year }}</div>
    <div ref="monthContainer" class="month-container">
        <div v-for="day in nDays" class="day-container" :key="day">
            
            <div class="day-count">{{ day }}</div>
            <div class="event-container">
                <CalendarEvent v-for="evt in events[day]" :event="evt" :key="evt" />
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
        };
    },
    mounted() {
        
        this.events = this.calendar.events[this.year][this.month];
        this.nWeeks = this.calendar.weeksPerMonth;
        this.nDays = this.nWeeks * this.calendar.dayNames.length;

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

.content-wrapper:has(.calendar-container) {
    // Show overflow since the month container should span the entire width of the screen
    overflow:visible;
}

.calendar-title {
    font-size: 3rem;
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

    // Fill entire width, since each px is valuable
    margin: 0 -5%;
}

.day-container {    
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    padding: 5px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);

    overflow: hidden;
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