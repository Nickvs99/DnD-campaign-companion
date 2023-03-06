<template>

<div class="character-page-container">

    {{ character_id }}

</div>

</template>

<script>

import data from "@/assets/character.json";

export default {
    name: "CharacterView",
    props: {
        "character_id": {
            required: true,
            type: String,
        }
    },
    data() {
        return {
            data: data,
        };
    },
    mounted() {
        this.parseJsonResponse(this.data);
    },
    methods: {
        parseJsonResponse(json) {
            console.log(json["data"]["id"]);

        }
    }
};

</script>

