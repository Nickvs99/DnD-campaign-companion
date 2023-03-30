<template>

<div class="alert-message-container">
    <slot/>
    <CloseIcon @click="destroyElement"/>
</div>

</template>

<script>

import CloseIcon from "@/assets/icons/CloseIcon.vue";

export default {
    name: "AlertMessage",
    components: { CloseIcon },
    methods: {
        destroyElement() {
            this.$el.remove();
        }
    }
};

</script>

<style lang="scss" scoped>

.alert-message-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    padding: 0.5em;
    column-gap: 0.5em;
    
    background-color: var(--secondary-color);
}

svg {
    width: 1.25em;
}

</style>
