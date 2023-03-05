<template>

<div class="image-container">
    <h1> {{ title }}</h1>
    <img :src="src"/>
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
    },
    data() {
        return {
            title: "", 
        };
    },
    mounted() {
        let routeSplit = this.$route.fullPath.split("/");
        this.title = routeSplit[routeSplit.length - 1];
    }

};

</script>

<style lang="scss" scoped>

@import "@/styles/mixins.scss";


.image-container{
    width: 90%; 

    @include center-to-screen;

    h1 {
        text-align: center;
    }

    img {
        width: 100%;
    }
}

</style>