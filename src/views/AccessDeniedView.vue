<template>

<div class="denied-container">
    <LockIcon />
    <h1>Access denied</h1>
</div>
    
</template>

<script>

import LockIcon from "@/assets/icons/LockIcon.vue";

export default {
    name: "AccessDeniedView",
    components: { LockIcon },
};

</script>

<style lang="scss">

@import "@/styles/mixins.scss";

.denied-container {
    @include center-to-screen;

    width: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.denied-container h1 {
    margin-block-start: 0;
}

.denied-container svg{
    aspect-ratio: 1/1;
    width: 10rem;
}

</style>