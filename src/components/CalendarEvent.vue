<template>
    
<div class="calendar-event"> {{ event[event.length - 1] }} </div>

</template>

<script>

export default {
    name: "CalendarEvent",
    props: {
        "event": {
            type: Object, 
            required: true,
        }
    }
};

</script>

<style lang="scss" scoped>

.calendar-event {
    background-color: rgba(0, 0, 0, 0.15);
    font-size: 0.75rem;

    // font-size + padding
    min-height: calc(1em + 2px);

    overflow-x: scroll;

    border-radius: 2px;
    padding: 1px;

    white-space: nowrap;
}

</style>