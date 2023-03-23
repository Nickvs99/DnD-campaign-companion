
import CenterToScreen from './CenterToScreen.vue';

<template>

<CenterToScreen class="container">
    <slot />
    <h1>{{ header }}</h1>
</CenterToScreen>

</template>

<script>

import CenterToScreen from "./CenterToScreen.vue";

export default {
    name: "IconWithHeader",
    components: { CenterToScreen },
    props: {
        "header" : {
            type: String,
        }
    }
};

</script>

<style lang="scss" scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    :slotted(svg) {
        width: 10rem;
    }

    h1 {
        margin-block-start: 0;
        text-align: center;
    }
}

</style>