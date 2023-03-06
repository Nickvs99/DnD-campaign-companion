<template>

<div class="stat-block">
    <div class="stat-block-name">{{ name }}</div>
    <div class="stat-block-value">{{ value }}</div>
</div>

</template>

<script>

export default {
    name: "StatBlock",
    props: {
        "name": {
            required: true,
            type: String,
        },
        "value": {
            required: true,
            type: Number,
        }
    }
};

</script>

<style lang="scss">

.stat-block {
    aspect-ratio: 1/1;
    width: 40px;

    background-color: darkblue;
}

.stat-block-name {
    margin: 1em;

    background-color: darkcyan;
}

.stat-block-value {
    margin: 1em;

    background-color: chocolate;
}

</style>