<template>

<div :class="[isActive ? 'center-to-screen' : 'static-class']">
      <slot />
</div>

</template>

<script>

export default {
    name: "CenterToScreen",
    data() {
        return {
            isActive: false,
        };
    },
    mounted() {
        this.setState();

        ["load", "resize"].forEach( (evt) => {
            window.addEventListener(evt,this.setState);
        });
    },
    unmounted() {
        ["load", "resize"].forEach( (evt) => {
            window.removeEventListener(evt, this.setState);
        });
    },
    methods: {
        setState() { 
            // Only set the element to the center of the screen if there is enough margin
            // Threshold has been eyeballed, and should be computed through some method.
            let threshold = 1.6;
            this.isActive = this.$el.offsetHeight * threshold < document.documentElement.clientHeight;
        }
    }
};

</script>

<style lang="scss">

.static-class {
    position: static;
    margin: 0 auto;
}

.center-to-screen{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 90%; // Same width as other content
}

</style>