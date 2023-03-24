<template>

<div class="stat-block">
    <div class="stat-block-name">{{ abbreviation }}</div>
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
    },
    computed: {
        abbreviation() {
            // Add a space between each character, such that each 'word' can be on a newline
            return this.name.slice(0, 3).toUpperCase().split("").join(" ");
        }
    }
};

</script>

<style lang="scss" scoped>

.stat-block {
    aspect-ratio: 1/1;

    background-color: var(--secondary-color);
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 0.2rem;
}

.stat-block-name {
    font-size: 1.5rem;
    word-break: break-all;
    text-align: center;
    margin: auto;

    word-spacing: 100vw;
}

.stat-block-value {
    font-size: 4rem;
    margin: auto;
}

</style>