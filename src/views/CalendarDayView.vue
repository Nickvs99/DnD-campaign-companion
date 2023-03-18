<template>

<div>
    <div class="day-title"> {{ day }} - {{month }} - {{ year }} </div>

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
export default {
    name: "CalendarDayView",
    components: { CalendarIcon, CenterToScreen },
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
            day: this.$route.params.day,
            events: null,
        };
    },
    mounted() {
        this.events = this.calendar.events[this.year][this.month][this.day];
    },
};

</script>

<style lang="scss">

.day-title {
    text-align: center;
    font-size: 1.5rem;
    margin: 0.5em 0;
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