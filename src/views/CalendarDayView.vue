<template>

<div>
    Day - {{ $route.params.day }} - {{ calendar.dayNames }}
</div>

</template>

<script>

export default {
    name: "CalendarDayView",
    props: {
        calendar: {
            type: Object,
            required: true,
        }
    }
};

</script>