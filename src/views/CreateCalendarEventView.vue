<template>
    <div>
        {{ calendar.monthNames }}
    </div>
</template>

<script>

export default {
    name: "CreateCalendarEventView",
    props: {
        calendar: {
            required: true,
            type: Object,
        }
    }
};

</script>