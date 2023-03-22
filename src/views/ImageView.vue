<template>

<CenterToScreen class="image-container">
    <h1> {{ title }}</h1>
    <img :src="src"/>
</CenterToScreen>

</template>

<script>

import CenterToScreen from "@/components/CenterToScreen.vue";

export default {
    name: "ImageView",
    components: { CenterToScreen },
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

.image-container{
    h1 {
        text-align: center;
    }
    img {
        width: 100%;
    }
}

</style>