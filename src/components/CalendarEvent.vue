<template>
    
<div class="event"> {{ event }} </div>

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

<style>

.event {
    background-color: red;
    font-size: 2rem;
}

</style>