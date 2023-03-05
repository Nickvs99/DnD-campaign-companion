<template>

<div class="menu-wrapper">
    <template v-for="(item, index) in items" :key="item">
        <router-link class="menu-item"  :to="getTo(item)"> {{ item }} </router-link>
        <HorizontalBar v-if="index != items.length - 1"/>
    </template>
</div>

</template>

<script>

import HorizontalBar from "@/components/HorizontalBar.vue";

export default {
    name: "ClickThroughView",
    components: { HorizontalBar },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {

        /**
         * Compute the target slug based on the current path and the target
         */
        getTo(target){
            
            target = target.replace(" ", "%20");            
            if(this.$route.path === "/"){
                return this.$route.path + target;
            }
            else {
                return this.$route.path + "/" + target;
            }
        },
    }
};
</script>

<style lang="scss">

.menu-wrapper {
    min-height: inherit;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.menu-item {
    position: relative;
    display: flex;
    align-items: center;

    font-size: 3rem;
    text-decoration: none;

    margin: 0.33em;

    -webkit-tap-highlight-color: transparent;
}

</style>