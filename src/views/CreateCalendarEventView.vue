<template>
    
<form v-on:submit="onSubmit" class="new-event-form">
    
    <fieldset class="form-row">
        <legend>Date</legend>
        <div class="day-input-container">
            <label for="day-input">Day</label>
            <input v-model="day" type="number" id="day-input" required>
        </div>
        <div class="month-input-container">
            <label for="month-input">Month</label>            
            <select v-model="month" id="month-input">
                <option v-for="monthName in calendar.monthNames" :value="monthName" :key="monthName">{{ monthName }}</option>
            </select>
        </div>
        <div class="year-input-container">
            <label for="year-input">Year</label>
            <input v-model="year" type="number" id="year-input" required>
        </div>
    </fieldset>

    <fieldset class="time-input form-row">
        <legend>Time</legend>
        <div>
            <label for="start-time-hour-input">Start time</label>
            <div class="form-row">
                <input v-model="startTimeHour" type="number" id="start-time-hour-input">
                :
                <input v-model="startTimeMinute" type="number">
            </div>
        </div>
        <div>
            <label for="end-time-hour-input">End time</label>

            <div class="form-row">
                <input v-model="endTimeHour" type="number" id="end-time-hour-input">
                :
                <input v-model="endTimeMinute" type="number">
            </div>
        </div>
    </fieldset>

    <div class="description-input-container">
        <label for="description-input">Description</label>
        <input v-model="description" type="text" id="description-input" required>
    </div>

    <button type="submit">Add event</button>

    <p>
        Custom events are not available on other devices. Safari users should add this site to their homescreen, 
        otherwise the events are automatically deleted after 7 days.
    </p>
</form>

</template>

<script>

import { prepareEventsObject, sortEvents } from "@/router/calendarUtil.js";
import { Component } from "@/router/lazyLoadComponents.js";
import { prefetchComponents } from "@/router/util.js";

export default {
    name: "CreateCalendarEventView",
    props: {
        calendar: {
            required: true,
            type: Object,
        }
    },
    data() {
        return {
            day: this.$route.query.day,
            month: this.$route.query.month,
            year: this.$route.query.year,
            startTimeHour: null,
            startTimeMinute: null,
            endTimeHour: null,
            endTimeMinute: null,
            description: null,
        };
    },
    mounted() {
        prefetchComponents(Component.CalendarDayView);
    },
    methods: {
        onSubmit(event) {
            
            event.preventDefault();
            event.stopPropagation();

            let timeString = this.getTimeString();

            let evt;
            if(timeString === ""){
                evt = [this.description];
            }
            else {
                evt = [timeString, this.description];
            }
            
            let customEvents = localStorage.getObject("events");
            if(customEvents == null) {
                customEvents = {};
            }

            prepareEventsObject(customEvents, this.day, this.month, this.year);
            
            customEvents[this.year][this.month][this.day].push(evt);
            
            sortEvents(customEvents);

            localStorage.setObject("events", customEvents);

            this.goToDayView();
        },
        getTimeString() {

            let timeString = "";
            if(this.startTimeHour) {
                timeString += this.startTimeHour + ":";

                if(this.startTimeMinute) {
                    timeString += this.startTimeMinute;
                }
                else {
                    timeString += "00";
                }
            }

            if(this.endTimeHour) {
                timeString += "-" + this.endTimeHour + ":";

                if(this.endTimeMinute) {
                    timeString += this.endTimeMinute;
                }
                else {
                    timeString += "00";
                }
            }

            return timeString;
        },
        goToDayView() {

            // Remove new part from url
            let calendarPath = this.$route.path.split("/").slice(0, -1).join("/");
            
            let targetPath = [calendarPath, this.year, this.month, this.day].join("/");
            this.$router.push(targetPath);
        }
    }
};

</script>

<style lang="scss" scoped>

.new-event-form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    margin-top: 1rem;

    label {
        margin: 0.25em 0;
    }
}

.form-row {
    display: flex;
    flex-direction: row;
    column-gap: 0.25em;
    align-items: center;

    input, select {
        box-sizing: border-box;
        width: 100%;
    }  
}

fieldset > legend {
    font-size: 1.5rem;
}
.day-input-container {
    width: 4em;
}

.month-input-container {
    flex-grow: 1;
}

.year-input-container {
    width: 6em;
}

.time-input {
    justify-content: space-between;

    input {
        width: 4em;
    }
}

.description-input-container {
    display: flex;
    flex-direction: column;
    column-gap: 5px;

    margin: 0 2px;
}

</style>