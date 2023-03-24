<template>

<div class="particle" :style="cssProps"></div>

</template>

<script>

export default {
    name: "BackgroundParticle",   
    props: {
        "x": {
            required: true,
            type: Number,
        },
        "y": {
            required: true,
            type: Number,
        },
        "lifeSpan": {
            required: true,
            type: Number,
        },
        "mass": {
            required: true,
            type: Number,
        },
        "dt": {
            required: true,
            type: Number,
        }
    },
    computed: {
        cssProps() {
            return {
                "--x": this.x * document.documentElement.clientWidth + "px",
                "--y": this.y * document.documentElement.clientHeight + "px",
                "--lifeSpan": this.lifeSpan + "s",
                "--initScale": this.mass,
                "--dt": this.dt + "s",
            };
        }
    }
};

</script>

<style lang="scss" scoped>

@keyframes particle-fade {
    from {opacity: 0.75; scale: var(--initScale); }
    to {opacity: 0; scale: 0; }  
}

.particle {
    background: radial-gradient(var(--primary-color), transparent 75%);

    border-radius: 50%;

    position: fixed;
    width: 10px;
    height: 10px;
    
    left: var(--x);
    bottom: var(--y);

    // Smooth the transition, allows for an increased dt
    transition: all var(--dt) ease-in-out;
    transition-property: left, bottom;

    // Set origin to center of particle
    translate: 50% 50%;

    animation: particle-fade;
    animation-duration: var(--lifeSpan);
    animation-delay: calc(var(--dt) + 0.1s); // Prevents flickering
    animation-timing-function: ease-in;
}

</style>

