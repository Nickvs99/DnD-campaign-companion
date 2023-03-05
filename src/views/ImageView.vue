<template>

<div class="image-container">
    <img :src="src" class="image"/>
</div>

</template>

<script>

export default {
    name: "ImageView",
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
    width: 90%; 

    @include center-to-screen;
}

</style>