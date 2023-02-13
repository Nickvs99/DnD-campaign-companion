<template>
    <img :src="src" class="image"/>
</template>

<script>

export default {
    name: "ExpandableImage",
    props: {
        "src": {
            type: String,
            required: true,
        }
    }
};

</script>

<style lang="scss" scoped>

.image {
    width: 100%;
}

</style>