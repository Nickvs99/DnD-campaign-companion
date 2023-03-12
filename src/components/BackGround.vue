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
        this.sim = new Simulator(8, 10, 7, this.dt);
        setInterval(() => {
            this.sim.update();
        }, this.dt * 1000);

        window.addEventListener("click", (evt) => this.onClick(evt));
    },
    methods: {
        onClick(evt) {

            let elements = document.elementsFromPoint(evt.clientX, evt.clientY);

            if(this.checkSpawnCondition(elements)) {
                this.spawnParticles();
            }
        },

        /**
         * Not all clicks should spawn particles. Only a location outside the content wrapper is clicked,
         * or if the click-through menu is clicked within the content wrapper, or an empty space within
         * the content wrapper is clicked
         */
        checkSpawnCondition(elements) {
            
            if(!this.containsQuerySelector(elements, ".content-wrapper") ||
                this.containsQuerySelector(elements, ".menu-wrapper") ||
                elements[0].matches(".content-wrapper")) {

                return true;
            }

            return false;
        },

        containsQuerySelector(elements, selector) {
            for(let element of elements) {
                if (element.matches(selector)){
                    return true;
                }
            }

            return false;
        },

        spawnParticles() {
            console.log("SPAWN");
        }
    }
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