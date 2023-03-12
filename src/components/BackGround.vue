<template>
    
<div class="background">

    <div v-if="sim != null" >
        <BackgroundParticle v-for="particle in sim.particles" :key="particle.id" 
            :x="particle.position[0]" 
            :y="particle.position[1]"
            :lifeSpan="particle.maxLifeSpan"
            :mass="particle.mass"
            :dt="sim.dt"
        />
    </div>


</div>

</template>

<script>

import BackgroundParticle from "@/components/BackgroundParticle.vue";
import { Simulator } from "@/simulator/simulator.js";

export default {
    name: "BackGround",
    components: { BackgroundParticle },
    data() {
        return {
            dt: 0.05,
            sim: null,
        };
    },
    mounted() {
        this.sim = new Simulator(4, 5, 5, this.dt);
        setInterval(() => {
            this.sim.update();
        }, this.dt * 1000);
    },
};
</script>

<style>

.background {
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: 100vh;
    background: radial-gradient(ellipse at right bottom, var(--gradient-color-primary), var(--gradient-color-secondary));

    z-index: -1;
}

</style>