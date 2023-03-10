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
        }
    },
    computed: {
        cssProps() {
            return {
                "--x": this.x * document.documentElement.clientWidth + "px",
                "--y": this.y * document.documentElement.clientHeight + "px",
                "--lifeSpan": this.lifeSpan + "s",
            };
        }
    }
};

</script>

<style lang="scss">

@keyframes particle-fade{
    from {opacity: 1 }
    to {opacity: 0}  
}

.particle {
    background: radial-gradient(var(--font-color), transparent);

    position: fixed;
    width: 10px;
    height: 10px;
    
    left: var(--x);
    bottom: var(--y);

    // Set origin to center of particle
    transform: translate(50%, 50%);

    animation: particle-fade;
    animation-duration: var(--lifeSpan);
    animation-delay: 0.1s; // Prevents flickering
}

</style>

