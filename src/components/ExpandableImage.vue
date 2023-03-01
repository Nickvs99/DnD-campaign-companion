<template>

<div class="image-container">
    <img :src="src" class="image"/>
</div>

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

@import "@/styles/mixins.scss";

.image {
    width: 100%;
}

.image-container{
    margin: 1rem 0;

    &:only-child {
        // Should be 100% of parent, but due to fixed position the width is
        // relative to the body
        width: 90%; 

        @include center-to-screen;
    }
}

</style>