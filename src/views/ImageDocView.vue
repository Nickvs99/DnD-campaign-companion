<template>

<div class="image-doc-container">
    <img :src="imgSrc"/>
    <GoogleDoc :src="docSrc" :centerLoadIcon="false"/>
</div>

</template>

<script>

import GoogleDoc from "@/views/GoogleDocView.vue";

export default {
    name: "ImageDocView",
    components: { GoogleDoc },
    props: {
        "docSrc": {
            type: String,
            required: true,
        },
        "imgSrc": {
            type: String,
            required: true,
        }
    }
};

</script>

<style>

.image-doc-container img {
    margin: 1rem 0;
    width: 100%;
}


</style>