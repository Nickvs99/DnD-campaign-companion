<template>

<CenterToScreen class="denied-container">
    <LockIcon />
    <h1>Access denied</h1>
</CenterToScreen>
    
</template>

<script>

import CenterToScreen from "@/components/CenterToScreen.vue";
import LockIcon from "@/assets/icons/LockIcon.vue";

export default {
    name: "AccessDeniedView",
    components: { CenterToScreen, LockIcon },
};

</script>

<style lang="scss">

.denied-container {
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