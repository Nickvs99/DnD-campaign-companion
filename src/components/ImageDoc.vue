<template>

<div>
    <ExpandableImage :src="imgSrc"/>
    <GoogleDoc :src="docSrc"/>
</div>

</template>

<script>

import ExpandableImage from "@/components/ExpandableImage.vue";
import GoogleDoc from "@/components/GoogleDoc.vue";

export default {
    name: "ImageDoc",
    components:{GoogleDoc, ExpandableImage},
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