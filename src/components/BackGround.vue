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
import { containsQuerySelector } from "@/util.js";

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

            let elements = document.elementsFromPoint(evt.clientX, evt.clientY);

            if(this.checkSpawnCondition(elements)) {
                
                // Map mouse coordinates to a 1x1 cell, with the origin at the bottom left
                let position = new Vector(
                    evt.clientX / document.documentElement.clientWidth, 
                    1 - evt.clientY / document.documentElement.clientHeight
                );

                this.sim.spawnIsotropicParticles(position, 5);
            }
        },

        /**
         * Not all clicks should spawn particles. Only a location outside the content wrapper is clicked,
         * or if the click-through menu is clicked within the content wrapper, or an empty space within
         * the content wrapper is clicked
         */
        checkSpawnCondition(elements) {
            
            if(!containsQuerySelector(elements, ".content-wrapper") ||
                containsQuerySelector(elements, ".menu-wrapper") ||
                elements[0].matches(".content-wrapper")) {

                return true;
            }

            return false;
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