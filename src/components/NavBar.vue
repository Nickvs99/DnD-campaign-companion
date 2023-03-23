<template>

<nav class="navbar">
    <router-link class="navbar-item" to="/"><HomeIcon class="navbar-svg"/></router-link>

    <TransitionGroup name="slide">
        <template v-for="item in navBarItems" :key="item">
            <DotSeperator class="navbar-seperator"/>
            <router-link class="navbar-item" :to="item.to"> {{ item.text }} </router-link>
        </template>
</TransitionGroup>
</nav>

</template>

<script>

import HomeIcon from "@/assets/icons/HomeIcon.vue";
import DotSeperator from "./DotSeperator.vue";

import { prefetchComponentsFromRoutes } from "@/router/util.js";

export default {
    name: "NavBar",
    components: { DotSeperator, HomeIcon },
    data() {
        return {
            navBarItems: [],
        };
    },
    watch: {
        $route(to) {
            this.setNavBarItems(to.fullPath);

            let homeRoute = "";
            prefetchComponentsFromRoutes(homeRoute, ...this.navBarItems.map(item => item.to));
        }
    },
    methods: {
        setNavBarItems(toPath) {
            this.navBarItems = [];

            let path = "";
            let pathSplit = toPath.split("/").filter(item => item !== "");

            // Remove last item, since current page does not need to be in the navbar
            for(let item of pathSplit.slice(0, -1)){

                path += `/${item}`;
                this.navBarItems.push({to: path, text: item.replace("%20", " ")});
            }
        }
    }
};

</script>

<style lang="scss" scoped>

.navbar { 
    overflow:scroll;
    white-space: nowrap;

    -webkit-tap-highlight-color: transparent;

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
}

.navbar-item {
    display: inline-block;
    font-size: 2rem;

    text-decoration: none;
}

.navbar-seperator {
    vertical-align: super;
}

.slide-enter-active, .slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from, .slide-leave-to {
    opacity: 0;
    transform: translateX(300px);
}

.navbar-svg {
    width: 2rem;
    height: 2rem;
}

</style>