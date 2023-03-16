<template>

<div>
    Month - {{ $route.params.month }} - {{ calendar.dayNames }}
</div>

</template>

<script>

export default {
    name: "CalendarMonthView",
    props: {
        calendar: {
            type: Object,
            required: true,
        }
    }
};

</script>