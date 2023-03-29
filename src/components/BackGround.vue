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

import { Simulator } from "@/simulator/simulator.js";
import { Vector } from "@/simulator/vector.js";

import BackgroundParticle from "./BackgroundParticle.vue";

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
        
        this.sim = new Simulator(8, 10, 7, this.dt);
        
        setInterval(() => {
            this.sim.update();
        }, this.dt * 1000);

        setInterval(() => {
            this.sim.setForceField();
        }, 2000);

        window.addEventListener("click", (evt) => this.onClick(evt));
    },
    methods: {
        onClick(evt) {

            let xCoor, yCoor;
            
            // Check if event is triggered by the enter key
            if (evt.pointerType === "") {
                
                // Set coordinates to center of element
                let el = evt.srcElement;
                let rect = el.getBoundingClientRect();
                
                xCoor = (rect.left + rect.right) / 2;
                yCoor = (rect.top + rect.bottom) / 2;
            }
            else {
                [xCoor, yCoor] = [evt.clientX, evt.clientY];
            }
                
            // Map mouse coordinates to a 1x1 cell, with the origin at the bottom left
            let position = new Vector(
                xCoor / document.documentElement.clientWidth, 
                1 - yCoor / document.documentElement.clientHeight
            );

            this.sim.spawnIsotropicParticles(position, 5);
        },
    }
};
</script>

<style scoped>

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